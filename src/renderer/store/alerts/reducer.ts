import { AlertActions, CREATE_ALERT, CLEAR_ALERTS } from "./types"
import { AlertState } from "./state"

const initState: AlertState = {
    alerts: {},
}

export const alertReducer = (
    state: AlertState = initState,
    action: AlertActions,
): AlertState => {
    switch (action.type) {
        case CREATE_ALERT:
            return {
                ...state,
                alerts: {
                    ...state.alerts,
                    [action.payload.key]: action.payload,
                },
            }
        case CLEAR_ALERTS:
            const alerts = { ...state.alerts }
            for (const key of action.payload) {
                delete alerts[key]
            }

            return {
                ...state,
                alerts,
            }
        default:
            return state
    }
}
