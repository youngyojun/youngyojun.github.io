import { copyFileSync, existsSync, lstatSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { appPaths } from '../site.config.ts';

interface AppBuild { directory: string; mount: string }

/**
 * Mount prebuilt app directories into a clean deployment directory.
 * This only assembles files; it does not compile apps or publish the site.
 * Inputs and path collisions are checked before the previous output is removed.
 * Returns the number of input files copied into the output.
 */
export function assembleSite(sources: readonly AppBuild[], destination: string): number {
  const output = resolve(destination);
  if (basename(output) !== 'dist') throw new Error('The output directory must be named dist');
  if (existsSync(output) && lstatSync(output).isSymbolicLink()) throw new Error('Output must not be a symlink');
  const mounts: string[] = [];
  for (const { mount } of sources) {
    if (!/^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*\/)*$/.test(mount)) throw new Error(`Invalid app mount: ${mount}`);
    if (mounts.some(other => other === mount || (other !== '/' && mount !== '/' && (mount.startsWith(other) || other.startsWith(mount))))) throw new Error(`Overlapping app mounts: ${mount}`);
    mounts.push(mount);
  }
  const reserved = mounts.filter(mount => mount !== '/').map(mount => mount.slice(1));
  // Build the complete file list before making any changes to the output.
  const files = new Map<string, string>();
  for (const { directory, mount } of sources) {
    const root = resolve(directory);
    if (root === output || root.startsWith(output + sep) || output.startsWith(root + sep)) throw new Error('Source and output directories must not overlap');
    if (!lstatSync(root).isDirectory()) throw new Error(`Missing build directory: ${root}`);
    for (const entry of readdirSync(root, { recursive: true, withFileTypes: true })) {
      const file = join(entry.parentPath, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Build contains a symlink: ${file}`);
      if (!entry.isFile()) continue;
      const local = relative(root, file);
      if (mount === '/' && reserved.some(prefix => local === prefix.slice(0, -1) || local.startsWith(prefix))) throw new Error(`Root app writes into a reserved namespace: ${local}`);
      const name = join(mount.slice(1), local);
      if (name === '.nojekyll') throw new Error('The assembler owns .nojekyll');
      if (files.has(name)) throw new Error(`Output path collision: ${name}`);
      files.set(name, file);
    }
  }
  for (const name of files.keys()) {
    let parent = dirname(name);
    while (parent !== '.') {
      if (files.has(parent)) throw new Error(`File/directory collision: ${parent}`);
      parent = dirname(parent);
    }
  }
  // Recreate the output so removed app files cannot survive in a later deployment.
  rmSync(output, { recursive: true, force: true });
  mkdirSync(output, { recursive: true });
  for (const [name, source] of files) {
    const target = join(output, name);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(source, target);
  }
  writeFileSync(join(output, '.nojekyll'), '');
  return files.size;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const sources = Object.entries(appPaths).map(([name, mount]) => ({
    directory: fileURLToPath(new URL(`../apps/${name}/dist/`, import.meta.url)),
    mount,
  }));
  const count = assembleSite(sources, fileURLToPath(new URL('../dist/', import.meta.url)));
  console.log(`Assembled ${count} files into dist/`);
}
