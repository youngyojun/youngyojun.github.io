export const winds = ['east', 'south', 'west', 'north'] as const;
export type Wind = typeof winds[number];
export const positions = ['위쪽', '오른쪽', '아래쪽', '왼쪽'] as const;

export interface SeatPlan {
  current: Wind[];
  target: Wind[];
  moves: { wind: Wind; from: number; to: number }[];
}

export function drawWinds(): Wind[] {
  const result: Wind[] = [...winds];
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

export function planSeats(current: readonly Wind[]): SeatPlan {
  if (current.length !== 4 || new Set(current).size !== 4 || current.some(wind => !winds.includes(wind))) {
    throw new RangeError('Expected four distinct winds');
  }
  const candidates = [0, 1, 2, 3].map(east => {
    // Screen positions run clockwise; seat winds run counterclockwise.
    const target = positions.map((_, seat) => winds[(east - seat + 4) % 4]);
    const moves = current.flatMap((wind, from) => {
      const to = target.indexOf(wind);
      return from === to ? [] : [{ wind, from, to }];
    });
    return { current: [...current], target, moves };
  });
  return candidates.reduce((best, next) => next.moves.length < best.moves.length ? next : best);
}
