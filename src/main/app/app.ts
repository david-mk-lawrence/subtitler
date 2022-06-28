import { nativeTheme } from "electron"
import electronIsDev from "electron-is-dev"

import { Settings } from "@/common"
import { setDefaultLogger } from "@/main/logs"
import { getSettings } from "@/main/settings"
import { setLocale } from "@/main/i18n"

export const isDev = electronIsDev

/**
 * Resets the application by retrieving the settings and
 * setting up any base configuration that may depend on the settings
 */
export const init = async (): Promise<Settings> => {
    const settings = await getSettings()

    // Appearance
    nativeTheme.themeSource = settings.appearance.theme

    // Logger
    const logDriver = isDev ? "console" : "file"
    setDefaultLogger(logDriver, { enabled: settings.advanced.logging.enabled, trace: false })

    // i18n
    setLocale(settings.i18n.locale)

    return settings
}
