import { KeyboardState } from "./state"
import { KEYBOARD_DOWN, KeyboardActions, KEYBOARD_UP } from "./types"

const initState: KeyboardState = {
    keys: [],
}

export const keyboardReducer = (
    state: KeyboardState = initState,
    action: KeyboardActions,
): KeyboardState => {
    switch (action.type) {
        case KEYBOARD_DOWN:
            return {
                ...state,
                keys: [...new Set([...state.keys, ...action.payload])],
            }
        case KEYBOARD_UP:
            const remove = new Set(action.payload)
            return {
                ...state,
                keys: [...state.keys.filter(k => !remove.has(k))],
            }
        default:
            return state
    }
}
