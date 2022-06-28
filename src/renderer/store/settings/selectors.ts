import { Settings } from "@/common"
import { Selector } from "@/renderer/store/state"

export const selectSettings: Selector<Settings | undefined> = state =>
    state.setting.settings

export const selectSettingsError: Selector<string | undefined> = state =>
    state.setting.error
