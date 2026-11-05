import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = readFileSync(new URL('../crates/mahjong-quiz/Cargo.toml', import.meta.url), 'utf8');
const version = /^wasm-bindgen = "=(.+)"$/m.exec(manifest)?.[1];
const bindgen = process.env.WASM_BINDGEN ?? 'wasm-bindgen';
const installed = spawnSync(bindgen, ['--version'], { encoding: 'utf8' });
if (!version || installed.status !== 0 || installed.stdout.trim() !== `wasm-bindgen ${version}`) {
  throw new Error(`Install the matching WASM tool: cargo install wasm-bindgen-cli --version ${version} --locked`);
}
function run(command: string, args: string[]) {
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
run('cargo', ['build', '--locked', '--release', '--target-dir', 'target', '--target', 'wasm32-unknown-unknown', '-p', 'mahjong-quiz']);
run(bindgen, ['target/wasm32-unknown-unknown/release/mahjong_quiz.wasm', '--target', 'web', '--out-dir', 'apps/mahjong/generated', '--out-name', 'mahjong_quiz']);
