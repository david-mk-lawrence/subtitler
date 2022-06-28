import { NAV_ROUTE_CHANNEL, ROUTES } from "@/common"
import { sendToRenderer } from "@/main/ipc"

import { getCurrentWindow } from "./window"

/**
 * Sends a route to navigate to in the renderer
 */
export const sendNav = (routeName: string) => {
    const window = getCurrentWindow()
    if (!window) {
        return
    }

    sendToRenderer(window, NAV_ROUTE_CHANNEL, routeName)
}

export const sendNavBack = () => sendNav("@back")
export const sendNavForward = () => sendNav("@forward")
export const sendNavEditor = () => sendNav(ROUTES.home.name)
export const sendNavSettings = () => sendNav(ROUTES.settings.name)
