import { ROUTES } from "@/common"

import { NavigationCompleteAction, NAV_COMPLETE, NAV_RECEIVED } from "./types"
import { IpcListener } from "@/renderer/store"

export const navigationReceived: IpcListener = (routeName: string) => dispatch => {
    const route = ROUTES[routeName]
    if (route) {
        dispatch({ type: NAV_RECEIVED, payload: route })
    }
}

export const navigationComplete = (): NavigationCompleteAction => ({
    type: NAV_COMPLETE,
})
