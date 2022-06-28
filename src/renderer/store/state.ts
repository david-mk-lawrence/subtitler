import { Action } from "redux"
import {
    ThunkAction as ReduxThunkAction,
    ThunkDispatch as ReduxThunkDispatch,
} from "redux-thunk"
import { IpcAction } from "@/renderer/lib/ipc"

import { AlertState } from "./alerts"
import { KeyboardState } from "./keyboard"
import { NavigationState } from "./navigation"
import { SettingsState } from "./settings"
import { SubtitlesState } from "./subtitles"

export interface RootState {
    alert: AlertState
    navigation: NavigationState
    setting: SettingsState
    subtitles: SubtitlesState
    keyboard: KeyboardState
}

export interface Selector<T> {
    (state: RootState): T
}

export type ThunkAction<R = void> = ReduxThunkAction<R, RootState, unknown, Action>
export type IpcThunkAction<R = void> = ReduxThunkAction<
    R,
    RootState,
    unknown,
    IpcAction
>
export type StateGetter = () => RootState
export type ThunkDispatch = ReduxThunkDispatch<RootState, unknown, Action>

export const NOOP = "NOOP"
export type Noop = Action<typeof NOOP>
