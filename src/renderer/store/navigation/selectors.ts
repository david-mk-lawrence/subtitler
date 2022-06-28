import { Route } from "@/common"
import { Selector } from "@/renderer/store/state"

export const selectPendingRoute: Selector<Route | undefined> = state =>
    state.navigation.route
