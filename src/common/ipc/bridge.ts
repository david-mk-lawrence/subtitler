import { IpcMainEvent, IpcMainInvokeEvent } from "electron"

import { SerializedError } from "@/common"

// Function signature for sending a message to the main process from the renderer
export interface IpcSend {
    (channel: string, ...args: any[]): void
}

// Function signature for receiving a message from the main process in the renderer
export interface IpcReceive {
    (channel: string, listener: (...args: any[]) => void): void
}

// Response object that will be returned to the renderer when calling invoke
export interface IpcInvokeResponse {
    result: any | SerializedError
    error: boolean
}

// Function signature for the renderer to call invoke on the main process
export interface IpcInvoke {
    (channel: string, ...args: any[]): Promise<IpcInvokeResponse>
}

// Function signature for a function in the main process that receives
// a message from the renderer, but does not respond immediately (if at all).
export interface IpcListener {
    (event: IpcMainEvent, ...args: any[]): Promise<void> | any
}

// Function signature for a function in the main process that can respond to
// "send" or "invoke" from the renderer
export interface IpcHandler {
    (event: IpcMainInvokeEvent, ...args: any[]): Promise<void> | any
}
