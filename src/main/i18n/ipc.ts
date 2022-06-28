import { BrowserWindow, IpcMainEvent } from "electron"

import { IpcListener, GET_TRANSLATION_CHANNEL } from "@/common"
import { sendToRenderer } from "@/main/ipc"
import { log } from "@/main/logs"

import { getTranslation } from "./files"

/**
 * Handle a request from the renderer to get
 * a translation file. The renderer uses "send" and
 * "recieve" instead of "invoke", so the response needs
 * to be manually sent back on the channel.
 */
export const handleRendererLocale: IpcListener = async (
    event: IpcMainEvent,
    key: string,
    lang: string,
    ns: string,
): Promise<void> => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) {
        const translation = await getTranslation(lang, ns)
        if (translation) {
            log.debug(
                `[${event.sender.id}] Sending translation for [${key}]: ${lang}/${ns}`,
            )

            sendToRenderer(win, GET_TRANSLATION_CHANNEL, key, translation)
        }
    } else {
        log.debug(`[${event.sender.id}] No window or session to send response to.`)
    }

    return
}
