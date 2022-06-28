import {
    Settings,
    SettingsKey,
    JsonValue,
    GET_SETTINGS_CHANNEL,
    SET_SETTINGS_CHANNEL,
    RESET_SETTINGS_CHANNEL,
} from "@/common"
import { createIpcInvokeAction, IpcAction } from "@/renderer/lib/ipc"
import { IpcListener, IpcErrorHandler, ThunkAction } from "@/renderer/store"
import {
    ReceiveSettingsAction,
    SettingsErrorAction,
    RECEIVE_SETTINGS,
    SETTINGS_ERROR,
    CLEAR_SETTINGS_ERROR,
} from "./types"

export const receiveSettings: IpcListener<ReceiveSettingsAction> =
    (settings: Settings) => dispatch =>
        dispatch({ type: RECEIVE_SETTINGS, payload: settings })

export const getSettings = (): IpcAction => createIpcInvokeAction(GET_SETTINGS_CHANNEL)

export const setSetting = (setting: SettingsKey, newValue: JsonValue): IpcAction =>
    createIpcInvokeAction(SET_SETTINGS_CHANNEL, [setting, newValue])

export const resetSettings = (): IpcAction =>
    createIpcInvokeAction(RESET_SETTINGS_CHANNEL)

export const createSettingsError = (error: Error): SettingsErrorAction => ({
    type: SETTINGS_ERROR,
    payload: error.message,
})

export const clearSettingsError = (): ThunkAction => dispatch =>
    dispatch({ type: CLEAR_SETTINGS_ERROR })

export const handleSettingsError: IpcErrorHandler<SettingsErrorAction> =
    (error: Error) => dispatch =>
        dispatch(createSettingsError(error))
