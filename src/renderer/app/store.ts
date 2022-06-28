import { configureStore } from "@reduxjs/toolkit"

import { clearAlertsMiddleware } from "@/renderer/lib/alerts"
import {
    createIpcInvokeThunkMiddleware,
    createIpcReceiveThunkMiddleware,
} from "@/renderer/lib/ipc"

import {
    RootState,
    ipcInvokeListeners,
    ipcReceiveListeners,
    clearAlertListeners,
    rootReducer,
} from "@/renderer/store"

const ipcInvoke = createIpcInvokeThunkMiddleware<RootState>(ipcInvokeListeners)
const ipcReceieve = createIpcReceiveThunkMiddleware<RootState>(ipcReceiveListeners)
const clearAlerts = clearAlertsMiddleware<RootState>(clearAlertListeners)

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: {},
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat([ipcInvoke, ipcReceieve, clearAlerts]),
})

export type AppDispatch = typeof store.dispatch
