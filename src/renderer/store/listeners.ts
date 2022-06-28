import { Action } from "redux"

import {
    ALERTS_CHANNEL,
    SET_SUBTITLES_CHANNEL,
    GET_SETTINGS_CHANNEL,
    RESET_SETTINGS_CHANNEL,
    SET_SETTINGS_CHANNEL,
    GET_SUBTITLES_CHANNEL,
    OPEN_SUBTITLES_CHANNEL,
    NEW_SUBTITLES_CHANNEL,
    SAVE_SUBTITLES_CHANNEL,
    SAVE_AS_SUBTITLES_CHANNEL,
    MENU_REDO,
    MENU_UNDO,
    NAV_ROUTE_CHANNEL,
} from "@/common"

import {
    IpcListeners as LibIpcListeners,
    IpcListener as LibIpcListener,
    IpcErrorHandler as LibIpcErrorHandler,
} from "@/renderer/lib/ipc"
import { AlertClearListeners } from "@/renderer/lib/alerts"
import { receiveAlert } from "./alerts"
import { navigationReceived } from "./navigation"
import { receiveSettings, handleSettingsError, clearSettingsError } from "./settings"
import {
    receiveSubtitles,
    handleSubtitlesError,
    receieveSubtitleRedo,
    receieveSubtitleUndo,
    clearSubtitlesError,
} from "./subtitles"
import { RootState } from "./state"

import { Noop, NOOP } from "./state"
const receiveVoid: IpcListener<Noop> = () => dispatch => dispatch({ type: NOOP })

export type IpcListener<T extends Action = Action> = LibIpcListener<RootState, T>
export type IpcErrorHandler<T extends Action = Action> = LibIpcErrorHandler<
    RootState,
    T
>
export type IpcListeners<T extends Action = Action> = LibIpcListeners<RootState, T>

export const ipcInvokeListeners: IpcListeners = new Map([
    [GET_SETTINGS_CHANNEL, [receiveSettings, handleSettingsError]],
    [SET_SETTINGS_CHANNEL, [receiveSettings, handleSettingsError]],
    [RESET_SETTINGS_CHANNEL, [receiveSettings, handleSettingsError]],
    [GET_SUBTITLES_CHANNEL, [receiveSubtitles, handleSubtitlesError]],
    [SET_SUBTITLES_CHANNEL, [receiveVoid, handleSubtitlesError]],
    [OPEN_SUBTITLES_CHANNEL, [receiveSubtitles, handleSubtitlesError]],
    [NEW_SUBTITLES_CHANNEL, [receiveSubtitles, handleSubtitlesError]],
    [SAVE_SUBTITLES_CHANNEL, [receiveSubtitles, handleSubtitlesError]],
    [SAVE_AS_SUBTITLES_CHANNEL, [receiveSubtitles, handleSubtitlesError]],
])

export const ipcReceiveListeners = new Map([
    [ALERTS_CHANNEL, receiveAlert],
    [GET_SUBTITLES_CHANNEL, receiveSubtitles],
    [MENU_REDO, receieveSubtitleRedo],
    [MENU_UNDO, receieveSubtitleUndo],
    [NAV_ROUTE_CHANNEL, navigationReceived],
])

export const clearAlertListeners: AlertClearListeners<RootState> = new Map([
    ["settings", clearSettingsError],
    ["subtitles", clearSubtitlesError],
])
