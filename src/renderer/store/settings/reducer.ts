import { SettingsState } from "./state"
import {
    SETTINGS_ERROR,
    RECEIVE_SETTINGS,
    CLEAR_SETTINGS_ERROR,
    SettingsActions,
} from "./types"

const initState: SettingsState = {
    settings: undefined,
    error: undefined,
}

export const settingsReducer = (
    state: SettingsState = initState,
    action: SettingsActions,
): SettingsState => {
    switch (action.type) {
        case RECEIVE_SETTINGS:
            return {
                ...state,
                settings: action.payload,
                error: undefined,
            }
        case SETTINGS_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case CLEAR_SETTINGS_ERROR:
            return {
                ...state,
                error: undefined,
            }
        default:
            return state
    }
}
