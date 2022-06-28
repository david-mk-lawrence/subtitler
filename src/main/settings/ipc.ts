import { dialog } from "electron"

import { JsonValue, Settings, SettingsKey, IpcHandler } from "@/common"
import { init } from "@/main/app"
import { getSettings, setSetting, resetSettings } from "./settings"

/**
 * Handles retrieving settings and returns them to the renderer
 */
export const handleGetSettings: IpcHandler = async (..._): Promise<Settings> =>
    getSettings()

/**
 * Handles updating a setting value from the renderer. Reinitializes the
 * application for any change in settings to take effect.
 */
export const handleSetSetting: IpcHandler = async (
    _,
    setting: SettingsKey,
    value: JsonValue,
): Promise<Settings> => {
    await setSetting(setting, value)
    return init()
}

/**
 * Handles resetting the settings to their default values. Confirms
 * with user before resetting.
 */
export const handleResetSettings: IpcHandler = async (): Promise<Settings> => {
    const result = dialog.showMessageBoxSync({
        title: "Reset Settings",
        message: "Reset settings to their default values?",
        type: "question",
        buttons: ["Reset", "Cancel"],
        defaultId: 0,
    })

    if (result === 0) {
        await resetSettings()
        return init()
    }

    return getSettings()
}
