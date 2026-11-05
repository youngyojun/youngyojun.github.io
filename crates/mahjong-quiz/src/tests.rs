use super::*;
use std::collections::BTreeSet;

fn hand(digits: &str) -> Vec<u8> {
    digits.bytes().map(|digit| digit - b'0').collect()
}

#[test]
fn pure_nine_gates_waits_on_all_nine_tiles() {
    let analysis = analyze(&hand("1112345678999")).unwrap();
    assert_eq!(analysis.waits, (1..=9).collect::<Vec<_>>());
    assert_eq!(analysis.wins.len(), 9);
}

#[test]
fn includes_seven_pairs_and_every_distinct_standard_decomposition() {
    let reordered = shapes(&counts(&hand("22233444456999"), 14).unwrap());
    assert_eq!(
        reordered.len(),
        1,
        "Reordering identical melds is not a new decomposition"
    );
    let result = shapes(&counts(&hand("11223344556677"), 14).unwrap());
    assert!(result.iter().any(|shape| shape.kind == Kind::SevenPairs));
    assert!(
        result
            .iter()
            .filter(|shape| shape.kind == Kind::Standard)
            .count()
            > 1
    );
    assert_eq!(result.len(), result.iter().collect::<BTreeSet<_>>().len());
    let quads = shapes(&counts(&hand("11112233445566"), 14).unwrap());
    assert!(quads.iter().all(|shape| shape.kind != Kind::SevenPairs));
}

#[test]
fn never_offers_a_fifth_copy_and_rejects_invalid_inputs() {
    assert!(!analyze(&hand("1111234567899")).unwrap().waits.contains(&1));
    for invalid in [
        hand("123"),
        hand("1111123456789"),
        hand("0123456789999"),
        vec![255; 13],
    ] {
        assert!(analyze(&invalid).is_err());
    }
    let puzzle = hand("1112345678999");
    assert!(check_answer(&puzzle, &[1, 1]).is_err());
    assert!(check_answer(&puzzle, &[0]).is_err());
    assert!(analyze(&hand("1111222255559")).unwrap().waits.is_empty());
    assert!(check_answer(&hand("1111222255559"), &[]).is_err());
}

#[test]
fn grades_exact_sets_and_reports_missing_and_extra_tiles() {
    let puzzle = hand("1111234567899");
    let waits = analyze(&puzzle).unwrap().waits;
    assert!(check_answer(&puzzle, &waits).unwrap().correct);
    let wrong = check_answer(&puzzle, &[1]).unwrap();
    assert!(!wrong.correct);
    assert_eq!(wrong.extra, vec![1]);
    assert_eq!(wrong.missed, waits);
    assert_eq!(wrong.analysis.waits, waits);
}

#[test]
fn generated_questions_are_reproducible_legal_multi_wait_hands() {
    assert_eq!(
        generate_puzzle(2026),
        Puzzle {
            hand: hand("2223344456999"),
            suit: "Sou"
        }
    );
    for seed in 0..1000 {
        let puzzle = generate_puzzle(seed);
        assert_eq!(puzzle, generate_puzzle(seed));
        assert_eq!(puzzle.hand.len(), 13);
        assert!(puzzle.hand.windows(2).all(|pair| pair[0] <= pair[1]));
        let analysis = analyze(&puzzle.hand).unwrap();
        assert!(analysis.waits.len() >= 2);
        assert!(check_answer(&puzzle.hand, &analysis.waits).unwrap().correct);
        for win in analysis.wins {
            let mut completed = puzzle.hand.clone();
            completed.push(win.tile);
            completed.sort();
            for shape in win.shapes {
                let mut rebuilt: Vec<u8> = shape.groups.iter().flatten().copied().collect();
                rebuilt.sort();
                assert_eq!(completed, rebuilt);
                assert!(shape.groups.iter().all(|group| match group.as_slice() {
                    [a, b] => a == b,
                    [a, b, c] => (a == b && b == c) || (*a + 1 == *b && *b + 1 == *c),
                    _ => false,
                }));
            }
        }
    }
}

#[test]
fn solver_matches_an_independent_constructive_oracle_for_every_legal_14_tile_hand() {
    fn build_sets(
        start: usize,
        left: usize,
        total: [u8; 9],
        melds: &[[u8; 9]],
        winning: &mut BTreeSet<[u8; 9]>,
    ) {
        if left == 0 {
            for pair in 0..9 {
                let mut candidate = total;
                candidate[pair] += 2;
                if candidate.iter().all(|count| *count <= 4) {
                    winning.insert(candidate);
                }
            }
            return;
        }
        for index in start..melds.len() {
            let candidate = std::array::from_fn(|tile| total[tile] + melds[index][tile]);
            if candidate.iter().all(|count| *count <= 4) {
                build_sets(index, left - 1, candidate, melds, winning);
            }
        }
    }
    fn check_all(tile: usize, remaining: u8, total: &mut [u8; 9], expected: &BTreeSet<[u8; 9]>) {
        if tile == 9 {
            if remaining == 0 {
                assert_eq!(
                    !shapes(total).is_empty(),
                    expected.contains(total),
                    "{total:?}"
                );
            }
            return;
        }
        for amount in 0..=remaining.min(4) {
            total[tile] = amount;
            check_all(tile + 1, remaining - amount, total, expected);
        }
        total[tile] = 0;
    }
    let mut melds = Vec::new();
    for tile in 0..9 {
        let mut meld = [0; 9];
        meld[tile] = 3;
        melds.push(meld);
    }
    for tile in 0..7 {
        let mut meld = [0; 9];
        meld[tile..tile + 3].fill(1);
        melds.push(meld);
    }
    let mut winning = BTreeSet::new();
    build_sets(0, 4, [0; 9], &melds, &mut winning);
    for missing_a in 0..9 {
        for missing_b in missing_a + 1..9 {
            let mut pairs = [2; 9];
            pairs[missing_a] = 0;
            pairs[missing_b] = 0;
            winning.insert(pairs);
        }
    }
    check_all(0, 14, &mut [0; 9], &winning);
}
