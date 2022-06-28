import { ALERTS_CHANNEL } from "@/common"
import { getCurrentWindow } from "@/main/app"
import { sendToRenderer } from "@/main/ipc"

/**
 * Sends an alert to be shown in the renderer
 */
export const sendAlert = (key: string, type: string, message: string): void => {
    sendToRenderer(getCurrentWindow(), ALERTS_CHANNEL, key, type, message)
}
