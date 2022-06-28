import { contextBridge, ipcRenderer } from "electron"

import {
    Channel,
    allowedChannels,
    IpcInvokeResponse,
    serialize,
    IpcReceive,
    IpcSend,
    IpcInvoke,
} from "@/common"

/**
 * Sends message to main process without waiting for a response.
 * The arguments must be JSON serializeable.
 */
const send: IpcSend = (channel: Channel, ...args: any[]): void => {
    if (allowedChannels.includes(channel)) {
        ipcRenderer.send(channel, ...args)
    }
}

/**
 * Calls the listener function when a message is received from
 * the main process. The `event` object from the main process
 * is stripped off before calling the listener.
 */
const receive: IpcReceive = (
    channel: Channel,
    listener: (...args: any[]) => void,
): void => {
    if (allowedChannels.includes(channel)) {
        // event is stripped off for renderer
        ipcRenderer.on(channel, (_, ...args) => listener(...args))
    }
}

/**
 * Invoke a function in the main process and wait for the response.
 * Returns an object containing the result and a flag indicating if
 * there was an error in the main process.
 */
const invoke: IpcInvoke = async (
    channel: Channel,
    ...args: any[]
): Promise<IpcInvokeResponse> => {
    if (allowedChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, ...args)
    }

    return Promise.resolve({
        error: true,
        result: serialize(new Error("Invalid Channel")),
    })
}

// binds the function to `window` in the renderer
contextBridge.exposeInMainWorld("api", {
    send,
    receive,
    invoke,
})
