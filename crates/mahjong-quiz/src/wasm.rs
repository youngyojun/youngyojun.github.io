use wasm_bindgen::prelude::*;

#[wasm_bindgen(typescript_custom_section)]
const TYPES: &str = r#"
export interface Puzzle { hand: number[]; suit: 'Man' | 'Pin' | 'Sou' }
export interface Shape { kind: 'standard' | 'seven_pairs'; groups: number[][] }
export interface Completion { tile: number; shapes: Shape[] }
export interface Analysis { waits: number[]; wins: Completion[] }
export interface Grade { correct: boolean; missed: number[]; extra: number[]; analysis: Analysis }
"#;

#[wasm_bindgen(js_name = generatePuzzle, unchecked_return_type = "Puzzle")]
pub fn generate_puzzle(seed: u32) -> Result<JsValue, JsError> {
    serde_wasm_bindgen::to_value(&super::generate_puzzle(seed))
        .map_err(|error| JsError::new(&error.to_string()))
}

#[wasm_bindgen(js_name = checkAnswer, unchecked_return_type = "Grade")]
pub fn check_answer(hand: &[u8], selected: &[u8]) -> Result<JsValue, JsError> {
    let grade = super::check_answer(hand, selected).map_err(JsError::new)?;
    serde_wasm_bindgen::to_value(&grade).map_err(|error| JsError::new(&error.to_string()))
}
