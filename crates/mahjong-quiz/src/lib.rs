use serde::Serialize;

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum Kind {
    Standard,
    SevenPairs,
}

#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord, Serialize)]
pub struct Shape {
    pub kind: Kind,
    pub groups: Vec<Vec<u8>>,
}

#[derive(Debug, Serialize)]
pub struct Completion {
    pub tile: u8,
    pub shapes: Vec<Shape>,
}

#[derive(Debug, Serialize)]
pub struct Analysis {
    pub waits: Vec<u8>,
    pub wins: Vec<Completion>,
}

#[derive(Debug, Serialize)]
pub struct Grade {
    pub correct: bool,
    pub missed: Vec<u8>,
    pub extra: Vec<u8>,
    pub analysis: Analysis,
}

#[derive(Debug, PartialEq, Eq, Serialize)]
pub struct Puzzle {
    pub hand: Vec<u8>,
    pub suit: &'static str,
}

fn counts(hand: &[u8], length: usize) -> Result<[u8; 9], &'static str> {
    if hand.len() != length {
        return Err("Invalid hand length");
    }
    let mut result = [0; 9];
    for &tile in hand {
        if !(1..=9).contains(&tile) {
            return Err("Tile must be between 1 and 9");
        }
        let count = &mut result[(tile - 1) as usize];
        *count += 1;
        if *count > 4 {
            return Err("A tile cannot appear more than four times");
        }
    }
    Ok(result)
}

fn split_melds(counts: &mut [u8; 9], groups: &mut Vec<Vec<u8>>, result: &mut Vec<Shape>) {
    let Some(tile) = counts.iter().position(|count| *count > 0) else {
        let mut canonical = groups.clone();
        canonical[1..].sort();
        result.push(Shape {
            kind: Kind::Standard,
            groups: canonical,
        });
        return;
    };
    if counts[tile] >= 3 {
        counts[tile] -= 3;
        groups.push(vec![tile as u8 + 1; 3]);
        split_melds(counts, groups, result);
        groups.pop();
        counts[tile] += 3;
    }
    if tile <= 6 && counts[tile + 1] > 0 && counts[tile + 2] > 0 {
        for count in &mut counts[tile..tile + 3] {
            *count -= 1;
        }
        groups.push(vec![tile as u8 + 1, tile as u8 + 2, tile as u8 + 3]);
        split_melds(counts, groups, result);
        groups.pop();
        for count in &mut counts[tile..tile + 3] {
            *count += 1;
        }
    }
}

fn shapes(counts: &[u8; 9]) -> Vec<Shape> {
    let mut result = Vec::new();
    for pair in 0..9 {
        if counts[pair] < 2 {
            continue;
        }
        let mut remaining = *counts;
        remaining[pair] -= 2;
        split_melds(
            &mut remaining,
            &mut vec![vec![pair as u8 + 1; 2]],
            &mut result,
        );
    }
    if counts.iter().filter(|count| **count == 2).count() == 7 {
        let groups = counts
            .iter()
            .enumerate()
            .filter(|(_, count)| **count == 2)
            .map(|(tile, _)| vec![tile as u8 + 1; 2])
            .collect();
        result.push(Shape {
            kind: Kind::SevenPairs,
            groups,
        });
    }
    result.sort();
    result.dedup();
    result
}

pub fn analyze(hand: &[u8]) -> Result<Analysis, &'static str> {
    let hand = counts(hand, 13)?;
    let mut wins = Vec::new();
    for tile in 0..9 {
        if hand[tile] == 4 {
            continue;
        }
        let mut completed = hand;
        completed[tile] += 1;
        let shapes = shapes(&completed);
        if !shapes.is_empty() {
            wins.push(Completion {
                tile: tile as u8 + 1,
                shapes,
            });
        }
    }
    Ok(Analysis {
        waits: wins.iter().map(|win| win.tile).collect(),
        wins,
    })
}

pub fn check_answer(hand: &[u8], selected: &[u8]) -> Result<Grade, &'static str> {
    let mut seen = [false; 9];
    for &tile in selected {
        if !(1..=9).contains(&tile) || seen[(tile - 1) as usize] {
            return Err("Selections must be distinct tiles between 1 and 9");
        }
        seen[(tile - 1) as usize] = true;
    }
    let analysis = analyze(hand)?;
    if analysis.waits.is_empty() {
        return Err("The hand has no waits");
    }
    let missed: Vec<u8> = analysis
        .waits
        .iter()
        .copied()
        .filter(|tile| !selected.contains(tile))
        .collect();
    let extra: Vec<u8> = (1..=9)
        .filter(|tile| seen[(tile - 1) as usize] && !analysis.waits.contains(tile))
        .collect();
    Ok(Grade {
        correct: missed.is_empty() && extra.is_empty(),
        missed,
        extra,
        analysis,
    })
}

pub fn generate_puzzle(seed: u32) -> Puzzle {
    let mut rng = fastrand::Rng::with_seed(seed as u64);
    let suit = ["Man", "Pin", "Sou"][rng.u32(0..3) as usize];
    // Fixed-width draws keep seeded questions identical in native Rust and WASM.
    for _ in 0..512 {
        let mut hand = Vec::with_capacity(14);
        for _ in 0..4 {
            let meld = rng.u32(0..16) as u8;
            if meld < 9 {
                hand.extend([meld + 1; 3]);
            } else {
                hand.extend([meld - 8, meld - 7, meld - 6]);
            }
        }
        hand.extend([rng.u32(1..=9) as u8; 2]);
        if counts(&hand, 14).is_err() {
            continue;
        }
        hand.remove(rng.u32(0..14) as usize);
        hand.sort();
        if analyze(&hand).is_ok_and(|analysis| analysis.waits.len() >= 2) {
            return Puzzle { hand, suit };
        }
    }
    // Bound generation time on the UI thread with a verified multi-wait fallback.
    Puzzle {
        hand: vec![1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7],
        suit,
    }
}

#[cfg(target_arch = "wasm32")]
mod wasm;

#[cfg(test)]
mod tests;
