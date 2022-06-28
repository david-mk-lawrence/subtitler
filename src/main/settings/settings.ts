import { app } from "electron"

import lodashSet from "lodash/fp/set"
import lodashMerge from "lodash/fp/merge"

import { readJSON, writeJSON, fileExists, getAppPath } from "@/main/files"

import {
    AppError,
    JsonValue,
    Settings,
    THEME_SYSTEM,
    UserSettings,
    SettingsKey,
    SETTINGS_SCHEMAS,
} from "@/common"
import { schemaValidate, ValidationErrors } from "@/main/validation"

const defaultSettings: Settings = {
    i18n: {
        dir: "ltr",
        locale: app.getLocale(),
    },
    appearance: {
        theme: THEME_SYSTEM,
    },
    advanced: {
        logging: {
            enabled: false,
            // Logging path cannot be changed by the user. This is only
            // set here to display where the log file is stored.
            path: app.getPath("logs"),
        },
    },
}

export const SETTINGS_FILE = getAppPath("settings.json")

/**
 * User settings are the settings that the user has explicitly
 * set. i.e. it does not include defaults.
 */
const getUserSettings = async (): Promise<UserSettings> => {
    const exists = await fileExists(SETTINGS_FILE)
    if (exists) {
        return readJSON<UserSettings>(SETTINGS_FILE)
    }

    return {}
}

/**
 * Writes the settings as JSON to the file system
 */
const writeSettings = async (settings: UserSettings): Promise<void> => {
    try {
        return writeJSON(SETTINGS_FILE, settings)
    } catch (error: unknown) {
        const err = error as Error
        throw new AppError(`Failed to write settings. ${err.toString()}`)
    }
}

/**
 * Gets the user settings and merges them on top of the defaults
 */
export const getSettings = async (): Promise<Settings> => {
    const userSettings = await getUserSettings()
    return lodashMerge(defaultSettings, userSettings) as Settings
}

/**
 * Writes a new setting. The setting key and value are both checked
 * and validated so that arbitrary keys/values cannot be added to settings.
 */
export const setSetting = async (
    setting: SettingsKey,
    value: JsonValue,
): Promise<void> => {
    const schema = SETTINGS_SCHEMAS.get(setting)
    if (!schema) {
        throw new AppError(`${setting} is not a valid setting`)
    }

    const errors = schemaValidate(schema, value)
    if (!(errors === null || errors === undefined)) {
        throw new ValidationErrors(`Unable to validate setting ${setting}`, errors)
    }

    const settings = await getUserSettings()
    const newSettings = lodashSet(setting, value, settings)

    return writeSettings(newSettings)
}

/**
 * Only need to write an empty object to settings since the defaults
 * are always merged in when retrieved
 */
export const resetSettings = async (): Promise<void> => writeSettings({})
