import { Action } from "redux"
import { Settings } from "@/common"

export const RECEIVE_SETTINGS = "RECEIVE_SETTINGS"
export const SETTINGS_ERROR = "SETTINGS_ERROR"
export const CLEAR_SETTINGS_ERROR = "CLEAR_SETTINGS_ERROR"

export interface ReceiveSettingsAction extends Action<typeof RECEIVE_SETTINGS> {
    payload: Settings
}

export interface SettingsErrorAction extends Action<typeof SETTINGS_ERROR> {
    payload: string
}

export type ClearSettingsErrorAction = Action<typeof CLEAR_SETTINGS_ERROR>

export type SettingsActions =
    | ReceiveSettingsAction
    | SettingsErrorAction
    | ClearSettingsErrorAction
