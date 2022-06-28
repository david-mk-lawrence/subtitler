import { Action } from "redux"

import { Route } from "@/common"

export const NAV_RECEIVED = "NAV_RECEIVED"
export const NAV_COMPLETE = "NAV_COMPLETE"

export interface NavigationReceivedAction extends Action<typeof NAV_RECEIVED> {
    payload: Route
}

export type NavigationCompleteAction = Action<typeof NAV_COMPLETE>

export type NavigationActions = NavigationReceivedAction | NavigationCompleteAction
