import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { Button } from '@youngyojun/ui';
import { MahjongTile, type Tile } from './MahjongTile';
import { loadQuizEngine, newQuizPuzzle, type QuizEngine } from '../lib/quiz-engine';
import type { Grade, Puzzle } from '../generated/mahjong_quiz.js';

const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const suits = { Man: { name: '만수', suffix: '만' }, Pin: { name: '통수', suffix: '통' }, Sou: { name: '삭수', suffix: '삭' } };
const tileFor = (suit: Puzzle['suit'], rank: number | '5-Dora') => `${suit}${rank}` as Tile;

function tilesFor(suit: Puzzle['suit'], groups: number[][]): Tile[][] {
  let fives = 0;
  // Count across meld boundaries so a completed hand has at most one red five.
  return groups.map(group => group.map(rank => tileFor(suit, rank === 5 && ++fives === 4 ? '5-Dora' : rank)));
}

export default function WaitQuiz() {
  const [engine, setEngine] = useState<QuizEngine | null>(null);
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [waitIndex, setWaitIndex] = useState(0);
  const [shapeIndex, setShapeIndex] = useState(0);
  const [score, setScore] = useState({ attempts: 0, correct: 0, streak: 0 });
  const firstChoice = useRef<HTMLButtonElement>(null);

  const boot = useCallback(async () => {
    setError(false);
    try {
      const api = await loadQuizEngine();
      setPuzzle(newQuizPuzzle(api));
      setEngine(api);
      setGrade(null);
      setSelected([]);
      setWaitIndex(0);
      setShapeIndex(0);
    } catch { setError(true); }
  }, []);
  useEffect(() => { void boot(); }, [boot]);

  function submit() {
    if (!engine || !puzzle || grade || selected.length === 0) return;
    try {
      const result = engine.checkAnswer(new Uint8Array(puzzle.hand), new Uint8Array(selected));
      setGrade(result);
      setScore(value => ({ attempts: value.attempts + 1, correct: value.correct + Number(result.correct), streak: result.correct ? value.streak + 1 : 0 }));
    } catch { setError(true); }
  }

  function next(event: MouseEvent<HTMLButtonElement>) {
    if (!engine) return;
    try {
      setPuzzle(newQuizPuzzle(engine));
      setSelected([]);
      setGrade(null);
      setWaitIndex(0);
      setShapeIndex(0);
      if (event.detail === 0) requestAnimationFrame(() => firstChoice.current?.focus());
    } catch { setError(true); }
  }

  if (error) return <div className="quiz-message" role="alert"><h2>문제를 준비하지 못했어요.</h2><p>잠시 후 다시 시도해주세요.</p><Button onClick={() => void boot()}>다시 시도</Button></div>;
  if (!puzzle || !engine) return <div className="quiz-message" role="status"><div className="loading-tiles" aria-hidden="true"><MahjongTile tile="Back" alt="" /><MahjongTile tile="Back" alt="" /><MahjongTile tile="Back" alt="" /></div><p>패를 섞고 있습니다…</p></div>;

  const suit = suits[puzzle.suit];
  const completion = grade?.analysis.wins[waitIndex];
  const shape = completion?.shapes[shapeIndex];
  return <section className="wait-quiz" aria-label="대기패 퀴즈">
    <div className="quiz-score" aria-label="이번 도전 기록"><span>정답 <strong>{score.correct}</strong> / {score.attempts}</span><span className="quiz-streak">연속 성공 <strong>{score.streak}</strong></span></div>
    <div className="hand-card">
      <div className="hand-heading"><span className="eyebrow">YOUR HAND</span><span>{suit.name} · 13장</span></div>
      <div className="hand-row" role="group" aria-label="문제 손패 13장">{tilesFor(puzzle.suit, [puzzle.hand])[0].map((tile, index) => <MahjongTile key={index} tile={tile} alt={`${tile.endsWith('-Dora') ? '적' : ''}${puzzle.hand[index]}${suit.suffix}`} />)}</div>
      <p className="hand-question">어떤 패가 들어오면 화료할까요?</p>
    </div>
    <fieldset className="quiz-options"><legend>대기패를 <strong>모두</strong> 골라주세요.</legend><div className="tile-choices">{ranks.map(rank => {
      const picked = selected.includes(rank);
      const state = grade ? grade.extra.includes(rank) ? 'wrong' : grade.missed.includes(rank) ? 'missed' : grade.analysis.waits.includes(rank) ? 'correct' : 'neutral' : picked ? 'picked' : 'neutral';
      return <Button key={rank} ref={rank === 1 ? firstChoice : undefined} className={`tile-choice choice-${state}`} aria-label={`${rank}${suit.suffix}`} aria-pressed={picked} disabled={Boolean(grade)} onClick={() => setSelected(value => picked ? value.filter(tile => tile !== rank) : [...value, rank])}>
        <MahjongTile tile={tileFor(puzzle.suit, rank)} alt="" /><span>{rank}{suit.suffix}</span>{state !== 'neutral' && <small>{state === 'wrong' ? '오답' : state === 'missed' ? '놓침' : state === 'correct' ? '정답' : '선택'}</small>}
      </Button>;
    })}</div></fieldset>
    <div className={`quiz-feedback${grade ? grade.correct ? ' is-correct' : ' is-incorrect' : ''}`} role="status" aria-live="polite" aria-atomic="true">{grade && <>
      <h2>{grade.correct ? grade.analysis.waits.length === 9 ? '아홉 개의 문, 전부 찾았습니다!' : '전부 찾았습니다!' : '아쉽지만, 다음엔 보일 거예요.'}</h2>
      <p>{grade.correct ? score.streak > 1 ? `${score.streak}연속 정답! 감을 잡으셨네요.` : '좋은 시작이에요. 다음 손패도 도전해보세요.' : `놓친 대기패 ${grade.missed.length}개 · 잘못 고른 패 ${grade.extra.length}개`}</p>
    </>}</div>
    <div className="quiz-actions"><Button className="quiz-submit" disabled={!grade && selected.length === 0} onClick={grade ? next : submit}>{grade ? '다음 문제' : '정답 확인'} <span aria-hidden="true">→</span></Button>{!grade && <span>{selected.length ? `${selected.length}개 선택` : '패를 터치해서 선택하세요'}</span>}</div>
    {grade && completion && shape && <section className="quiz-explanation" aria-labelledby="explanation-title">
      <div className="explanation-heading"><h2 id="explanation-title">이렇게 완성됩니다.</h2><span>{grade.analysis.waits.length}면 대기</span></div>
      <div className="wait-buttons" aria-label="대기패별 완성 보기">{grade.analysis.wins.map((win, index) => <Button key={win.tile} aria-label={`${win.tile}${suit.suffix}으로 완성 보기`} aria-pressed={waitIndex === index} onClick={() => { setWaitIndex(index); setShapeIndex(0); }}>{win.tile}{suit.suffix}</Button>)}</div>
      <div className="shape-caption"><strong>{completion.tile}{suit.suffix}이 들어오면</strong><span>{shape.kind === 'seven_pairs' ? '치또이츠 · 서로 다른 7쌍' : '몸통 4개 + 머리 1개'}</span></div>
      <div className="shape-groups" role="group" aria-label="완성된 손패">{tilesFor(puzzle.suit, shape.groups).map((group, index) => <div className="shape-group" key={index}><div>{group.map((tile, position) => <MahjongTile key={position} tile={tile} alt={`${tile.endsWith('-Dora') ? '적' : ''}${shape.groups[index][position]}${suit.suffix}`} />)}</div><small>{shape.kind === 'seven_pairs' ? '쌍' : index === 0 ? '머리' : '몸통'}</small></div>)}</div>
      {completion.shapes.length > 1 && <Button className="other-shape" onClick={() => setShapeIndex(value => (value + 1) % completion.shapes.length)}>다른 분해 보기 · {shapeIndex + 1}/{completion.shapes.length}</Button>}
    </section>}
  </section>;
}
