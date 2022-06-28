import { Action } from "redux"
import { ThunkAction, ThunkMiddleware } from "redux-thunk"

const CLEAR_ALERT = "@@CLEAR_ALERT"

export interface ClearAlertAction extends Action<string> {
    payload: string
}

export type AlertClearer<S> = () => ThunkAction<void, S, undefined, ClearAlertAction>
export type AlertClearListeners<S> = Map<string, AlertClearer<S>>

export const clearAlertsMiddleware =
    <S>(listeners: AlertClearListeners<S>): ThunkMiddleware<S, ClearAlertAction> =>
    ({ dispatch, getState }) =>
    next =>
    (action: ClearAlertAction) => {
        const result = next(action)

        if (action.type.startsWith(CLEAR_ALERT)) {
            const cb = listeners.get(action.payload)
            if (cb) {
                cb()(dispatch, getState, undefined)
            }
        }

        return result
    }

export const createClearAlertAction = (context: string): ClearAlertAction => ({
    type: `${CLEAR_ALERT}:${context}`,
    payload: context,
})
