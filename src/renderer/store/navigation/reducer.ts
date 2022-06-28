import { NavigationState } from "./state"
import { NAV_COMPLETE, NAV_RECEIVED, NavigationActions } from "./types"

const initState: NavigationState = {
    route: undefined,
}

export const navigationReducer = (
    state: NavigationState = initState,
    action: NavigationActions,
): NavigationState => {
    switch (action.type) {
        case NAV_RECEIVED:
            return {
                ...state,
                route: action.payload,
            }
        case NAV_COMPLETE:
            return {
                ...state,
                route: undefined,
            }
        default:
            return state
    }
}
