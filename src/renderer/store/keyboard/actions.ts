import {
    KEYBOARD_DOWN,
    KEYBOARD_UP,
    KeyboardDownAction,
    KeyboardUpAction,
} from "./types"

export const keysDown = (keys: string[]): KeyboardDownAction => ({
    type: KEYBOARD_DOWN,
    payload: keys,
})

export const keysUp = (keys: string[]): KeyboardUpAction => ({
    type: KEYBOARD_UP,
    payload: keys,
})
