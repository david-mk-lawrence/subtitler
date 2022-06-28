import { Selector } from "@/renderer/store/state"
import { Alerts } from "./types"

export const selectAlerts: Selector<Alerts> = state => state.alert.alerts
