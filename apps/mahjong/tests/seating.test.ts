import assert from 'node:assert/strict';
import { test } from 'node:test';
import { drawWinds, planSeats, winds, type Wind } from '../lib/seating.ts';

function permutations(items: readonly Wind[]): Wind[][] {
  return items.length ? items.flatMap((item, index) => permutations(items.filter((_, other) => index !== other)).map(rest => [item, ...rest])) : [[]];
}

test('minimizes movement, then keeps East, South, West and North seated in priority order for all 24 draws', () => {
  const layouts = permutations(winds);
  // Seats are top, right, bottom, left. South is East’s right-hand neighbour.
  const valid = layouts.filter(layout => {
    const east = layout.indexOf('east');
    return layout[(east + 3) % 4] === 'south' && layout[(east + 2) % 4] === 'west' && layout[(east + 1) % 4] === 'north';
  });
  assert.equal(valid.length, 4);
  const counts = new Set<number>();
  for (const current of layouts) {
    const before = [...current];
    const plan = planSeats(current);
    const minimum = Math.min(...valid.map(target => current.filter((wind, seat) => wind !== target[seat]).length));
    assert.equal(plan.moves.length, minimum, current.join(','));
    let preferred = valid.filter(target => current.filter((wind, seat) => wind !== target[seat]).length === minimum);
    for (const wind of winds) {
      const keepingWind = preferred.filter(target => target[current.indexOf(wind)] === wind);
      if (keepingWind.length) preferred = keepingWind;
    }
    assert.equal(preferred.length, 1);
    assert.deepEqual(plan.target, preferred[0], current.join(','));
    assert.ok(valid.some(layout => layout.every((wind, seat) => plan.target[seat] === wind)));
    assert.deepEqual(current, before);
    const after = [...current];
    for (const move of plan.moves) {
      assert.equal(current[move.from], move.wind);
      assert.notEqual(move.from, move.to);
      after[move.to] = move.wind;
    }
    assert.deepEqual(after, plan.target);
    counts.add(minimum);
  }
  assert.deepEqual([...counts].sort(), [0, 2]);
});

test('rejects missing, duplicate and unknown winds', () => {
  for (const invalid of [[], ['east', 'south'], ['east', 'east', 'west', 'north'], ['east', 'south', 'west', 'invalid']]) {
    assert.throws(() => planSeats(invalid as Wind[]), /four distinct winds/i);
  }
});

test('the shuffle can deal every permutation without modifying the wind list', t => {
  const draws = new Set<string>();
  for (let last = 0; last < 4; last++) for (let middle = 0; middle < 3; middle++) for (let first = 0; first < 2; first++) {
    const values = [(last + .5) / 4, (middle + .5) / 3, (first + .5) / 2];
    t.mock.method(Math, 'random', () => values.shift()!);
    const draw = drawWinds();
    assert.equal(new Set(draw).size, 4);
    draws.add(draw.join(','));
    t.mock.restoreAll();
  }
  assert.equal(draws.size, 24);
  assert.deepEqual(winds, ['east', 'south', 'west', 'north']);
});
