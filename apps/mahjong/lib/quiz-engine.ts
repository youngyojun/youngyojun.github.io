import init, { generatePuzzle, checkAnswer, type Puzzle } from '../generated/mahjong_quiz.js';
import wasmUrl from '../generated/mahjong_quiz_bg.wasm?url&no-inline';

export type QuizEngine = { generatePuzzle: typeof generatePuzzle; checkAnswer: typeof checkAnswer };
let loading: Promise<QuizEngine> | undefined;

export function loadQuizEngine(): Promise<QuizEngine> {
  return loading ??= init({ module_or_path: wasmUrl }).then(() => ({ generatePuzzle, checkAnswer })).catch(error => {
    // A failed download must not poison later retries.
    loading = undefined;
    throw error;
  });
}

export function newQuizPuzzle(engine: QuizEngine): Puzzle {
  const seed = crypto.getRandomValues(new Uint32Array(1))[0];
  return engine.generatePuzzle(seed);
}
