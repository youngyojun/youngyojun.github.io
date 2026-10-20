import { copyFileSync, existsSync, lstatSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export function assembleSite(sources, destination) {
  const output = resolve(destination);
  if (basename(output) !== 'dist') throw new Error('The output directory must be named dist');
  if (existsSync(output) && lstatSync(output).isSymbolicLink()) throw new Error('Output must not be a symlink');
  const files = new Map();
  for (const source of sources) {
    const root = resolve(source);
    if (root === output || root.startsWith(output + sep) || output.startsWith(root + sep)) throw new Error('Source and output directories must not overlap');
    if (!lstatSync(root).isDirectory()) throw new Error(`Missing build directory: ${root}`);
    for (const entry of readdirSync(root, { recursive: true, withFileTypes: true })) {
      const file = join(entry.parentPath, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Build contains a symlink: ${file}`);
      if (!entry.isFile()) continue;
      const name = relative(root, file);
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
  const count = assembleSite([fileURLToPath(new URL('../apps/blog/dist/', import.meta.url))], fileURLToPath(new URL('../dist/', import.meta.url)));
  console.log(`Assembled ${count} files into dist/`);
}
