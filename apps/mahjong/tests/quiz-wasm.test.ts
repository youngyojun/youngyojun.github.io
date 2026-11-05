import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import init, { generatePuzzle, checkAnswer } from '../generated/mahjong_quiz.js';

await init({ module_or_path: readFileSync(new URL('../generated/mahjong_quiz_bg.wasm', import.meta.url)) });

test('the compiled Rust engine returns typed legal questions and complete answers', () => {
  const puzzle = generatePuzzle(2026);
  assert.deepEqual(puzzle, { hand: [2, 2, 2, 3, 3, 4, 4, 4, 5, 6, 9, 9, 9], suit: 'Sou' });
  const answer = checkAnswer(new Uint8Array(puzzle.hand), new Uint8Array());
  assert.deepEqual(answer.analysis.waits, [2, 3, 4, 5, 7]);
  assert.equal(answer.correct, false);
  const correct = checkAnswer(new Uint8Array(puzzle.hand), new Uint8Array(answer.analysis.waits));
  assert.equal(correct.correct, true);
  assert.deepEqual(correct.extra, []);
  assert.deepEqual(correct.missed, []);
});

test('WASM preserves nine-sided waits, seven pairs and validation errors', () => {
  const pairs = checkAnswer(new Uint8Array([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7]), new Uint8Array());
  assert.ok(pairs.analysis.wins.find(win => win.tile === 7)?.shapes.some(shape => shape.kind === 'seven_pairs'));
  const gates = checkAnswer(new Uint8Array([1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9]), new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]));
  assert.equal(gates.correct, true);
  assert.throws(() => checkAnswer(new Uint8Array([1]), new Uint8Array([1])), /Invalid hand length/);
});
