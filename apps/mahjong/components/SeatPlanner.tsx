import { useState } from 'react';
import { Button } from '@youngyojun/ui';
import { drawWinds, planSeats, positions, type SeatPlan, type Wind } from '../lib/seating';
import { MahjongTile, type Tile } from './MahjongTile';

const labels: Record<Wind, { name: string; tile: Tile }> = {
  east: { name: '동', tile: 'Ton' },
  south: { name: '남', tile: 'Nan' },
  west: { name: '서', tile: 'Shaa' },
  north: { name: '북', tile: 'Pei' },
};

function SeatTable({ title, layout, moving = [] }: { title: string; layout?: Wind[]; moving?: number[] }) {
  return <figure className="table-panel">
    <figcaption>{title}</figcaption>
    <div className="seat-table" role="group" aria-label={title}>
      <span className="table-center" aria-hidden="true">四人<br /><small>MAHJONG</small></span>
      {positions.map((position, seat) => {
        const wind = layout?.[seat];
        const label = wind ? labels[wind] : null;
        return <div className={`seat seat-${seat}`} key={position} data-position={seat} data-wind={wind ?? ''}>
          <span className="seat-position">{position}</span>
          <MahjongTile tile={label?.tile ?? 'Back'} alt={label ? `${label.name}패` : '배정 전 뒷면'} />
          <span className={`seat-name${moving.includes(seat) ? ' is-moving' : ''}`}>{label?.name ?? '—'}{moving.includes(seat) && <small>이동</small>}</span>
        </div>;
      })}
    </div>
  </figure>;
}

export default function SeatPlanner() {
  const [plan, setPlan] = useState<SeatPlan | null>(null);
  return <div className="seat-planner">
    <div className="draw-action">
      <Button className="draw-button" onClick={() => setPlan(planSeats(drawWinds()))}>{plan ? '다시 뽑기' : '자리 뽑기'}<span aria-hidden="true">↗</span></Button>
      <p>화면의 위쪽을 탁자의 한쪽에 맞추고 뽑아주세요.</p>
    </div>
    <div className="move-result" role="status" aria-live="polite" aria-atomic="true">
      {plan && (plan.moves.length === 0 ? <><h2>그대로 앉으면 됩니다.</h2><p>이미 올바른 순서입니다. 아무도 움직일 필요가 없어요.</p></> : <>
        <h2><strong>2명</strong>만 서로 바꾸세요.</h2>
        <p>나머지 두 분은 그대로 앉으면 됩니다.</p>
        <ul>{plan.moves.map(move => <li key={move.wind}><strong>{labels[move.wind].name}</strong><span>{positions[move.from]} <span aria-hidden="true">→</span><span className="sr-only">에서</span> {positions[move.to]}<span className="sr-only">으로 이동</span></span></li>)}</ul>
      </>)}
    </div>
    <div className="seat-tables">
      <SeatTable title="추첨 결과" layout={plan?.current} moving={plan?.moves.map(move => move.from)} />
      {plan && <SeatTable title="이렇게 앉으세요" layout={plan.target} />}
    </div>
  </div>;
}
