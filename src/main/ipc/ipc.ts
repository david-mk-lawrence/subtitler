/**
 * Defines the IPC layer that hooks up functions in the main proces
 * that handle messages from the renderer
 */
import { ipcMain, BrowserWindow } from "electron"
import {
    Channel,
    allowedChannels,
    IpcHandler,
    IpcInvokeResponse,
    IpcListener,
    serialize,
} from "@/common"
import { log } from "@/main/logs"

/**
 * Binds the list of listener functions to ipcMain.on so that the listener
 * will be called when a message is sent over the channel.
 */
export const registerIpcListeners = (listeners: Map<Channel, IpcListener>): void => {
    listeners.forEach((listener, channel) => {
        if (allowedChannels.includes(channel)) {
            ipcMain.on(channel, async (...args) => {
                log.debug(`Received send from renderer on channel [${channel}]`)
                await listener(...args)
                log.debug(`Finished with send from renderer on channel [${channel}]`)
            })
        }
    })
}

/**
 * Binds the handlers to ipcMain.handle so that the handler will be called when
 * a message is sent on the channel. Unlike listeners, the handlers can return
 * a value that will be sent back to the renderer, which should be awaiting the
 * response.
 */
export const registerIpcHandlers = (handlers: Map<Channel, IpcHandler>): void => {
    handlers.forEach((handler, channel) => {
        if (allowedChannels.includes(channel)) {
            ipcMain.handle(channel, async (...args): Promise<IpcInvokeResponse> => {
                log.debug(`Received invoke on channel [${channel}]`)
                try {
                    const data = {
                        result: await Promise.resolve(handler(...args)),
                        error: false,
                    }
                    log.debug(`Sending invoke response on channel [${channel}]`)
                    return data
                } catch (error: unknown) {
                    const err = error as Error
                    log.error(
                        `Error while handling invoke on channel [${channel}]: ${err.message}`,
                    )

                    return { result: serialize(err), error: true }
                }
            })
        }
    })
}

/**
 * Sends a message to the renderer
 */
export const sendToRenderer = (
    window: BrowserWindow | null,
    channel: Channel,
    ...args: any[]
): void => {
    if (window && allowedChannels.includes(channel)) {
        log.debug(`Sending data on channel [${channel}]`)
        window.webContents.send(channel, ...args)
    }
}
