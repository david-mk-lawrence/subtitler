import { useDispatch } from "react-redux"

import { JsonValue, SettingsKey } from "@/common"
import { setSetting } from "@/renderer/store/settings"

// Returns a function that will dispatch the new setting to be sent to the main process
export function useSetSetting(): (setting: SettingsKey, newValue: JsonValue) => void {
    const dispatch = useDispatch()

    return (setting: SettingsKey, newValue: JsonValue): void => {
        dispatch(setSetting(setting, newValue))
    }
}
