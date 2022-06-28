import { IpcInvoke, IpcReceive, IpcSend } from "@/common/ipc"

export {}

// typings on window object for IPC functions
declare global {
    interface Window {
        api: {
            invoke: IpcInvoke
            send: IpcSend
            receive: IpcReceive
        }
    }
}
