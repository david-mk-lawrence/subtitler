import { Action } from "redux"

export type AlertType = "info" | "success" | "error" | "warning"

export interface Alert {
    key: string
    type: AlertType
    message: string
    context?: string
}

export interface Alerts {
    [key: string]: Alert
}

export const CREATE_ALERT = "CREATE_ALERT"
export const CLEAR_ALERTS = "CLEAR_ALERTS"

export interface CreateAlertAction extends Action<typeof CREATE_ALERT> {
    payload: Alert
}

export interface ClearAlertsAction extends Action<typeof CLEAR_ALERTS> {
    payload: string[]
}

export type AlertActions = CreateAlertAction | ClearAlertsAction
