import { Action } from "redux"

export const KEYBOARD_DOWN = "KEYBOARD_DOWN"
export const KEYBOARD_UP = "KEYBOARD_UP"

export interface KeyboardDownAction extends Action<typeof KEYBOARD_DOWN> {
    payload: string[]
}

export interface KeyboardUpAction extends Action<typeof KEYBOARD_UP> {
    payload: string[]
}

export type KeyboardActions = KeyboardDownAction | KeyboardUpAction
