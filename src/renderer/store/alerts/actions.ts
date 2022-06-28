import {
    Alert,
    AlertType,
    CreateAlertAction,
    ClearAlertsAction,
    CLEAR_ALERTS,
    CREATE_ALERT,
} from "./types"
import { IpcListener } from "@/renderer/store"

export const createAlert = (alert: Alert): CreateAlertAction => ({
    type: CREATE_ALERT,
    payload: alert,
})

export const clearAlert = (alert: Alert): ClearAlertsAction => ({
    type: CLEAR_ALERTS,
    payload: [alert.key],
})

export const clearAlertsByKeys = (keys: string[]): ClearAlertsAction => ({
    type: CLEAR_ALERTS,
    payload: keys,
})

export const receiveAlert: IpcListener<CreateAlertAction> =
    (key: string, type: AlertType, message: string) => dispatch =>
        dispatch({
            type: CREATE_ALERT,
            payload: {
                key,
                type,
                message,
                tags: [],
            },
        })
