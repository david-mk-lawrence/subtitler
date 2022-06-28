import { Action } from "redux"
import { ThunkAction, ThunkMiddleware } from "redux-thunk"

import { deserialize } from "@/common"

const IPC_SEND = "@@IPC_SEND"
const IPC_INVOKE = "@@IPC_INVOKE"

export interface IpcAction extends Action<string> {
    payload: any
    channel: string
}

export interface IpcListener<S, T extends Action = Action, R = void> {
    (...args: any[]): ThunkAction<R, S, undefined, T>
}

export interface IpcErrorHandler<S, T extends Action = Action, R = void> {
    (error: Error): ThunkAction<R, S, undefined, T>
}

export type IpcListeners<S, T extends Action = Action, R = void> = Map<
    string,
    [IpcListener<S, T, R>, IpcErrorHandler<S, T, R>]
>

export const createIpcReceiveThunkMiddleware =
    <S, T extends Action = Action>(
        listeners: Map<string, IpcListener<S, T>>,
    ): ThunkMiddleware<S, T> =>
    ({ dispatch, getState }) => {
        listeners.forEach((listener, channel) => {
            window.api.receive(channel, (...args) => {
                listener(...args)(dispatch, getState, undefined)
            })
        })

        return next => action => next(action)
    }

export const createIpcInvokeThunkMiddleware =
    <S, T extends Action = Action>(
        listeners: IpcListeners<S, T>,
    ): ThunkMiddleware<S, T> =>
    ({ dispatch, getState }) =>
    next =>
    async (action: IpcAction) => {
        if (action.type.startsWith(IPC_INVOKE)) {
            const result = next(action)

            const ipcFuncs = listeners.get(action.channel)
            if (ipcFuncs) {
                const [listener, errorHandler] = ipcFuncs

                try {
                    const { result, error } = await window.api.invoke(
                        action.channel,
                        ...(action.payload || []),
                    )
                    if (error) {
                        throw deserialize(result)
                    }

                    listener(result)(dispatch, getState, undefined)
                } catch (error: unknown) {
                    const err = error as Error
                    errorHandler(err)(dispatch, getState, undefined)
                }
            }

            return result
        }

        return next(action)
    }

export const createIpcSendAction = <T>(channel: string, payload?: T): IpcAction => ({
    type: `${IPC_SEND}:${channel}`,
    channel,
    payload,
})

export const createIpcInvokeAction = <T>(channel: string, payload?: T): IpcAction => ({
    type: `${IPC_INVOKE}:${channel}`,
    channel,
    payload,
})
