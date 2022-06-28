/**
 * This module defines the settings for the application that can
 * be read and written to by the user.
 *
 * The enum values for certain settings (like "theme" for example) are declared as
 * string values and checked with "typeof" instead of using proper Enums that
 * Typescript supports. This is because Typescript Enums are not easily
 * serializeable to JSON, which is very convenient to support here since this code
 * is used by both processes and is also stored as a JSON file. Though more
 * verbose, it tends to be easier to deal with than Enum types.
 */
import { JsonObject, JsonObjectReadOnly } from "@/common/json"

export const THEME_SYSTEM = "system"
export const THEME_LIGHT = "light"
export const THEME_DARK = "dark"
export type Theme = typeof THEME_SYSTEM | typeof THEME_LIGHT | typeof THEME_DARK
export type ActualTheme = typeof THEME_LIGHT | typeof THEME_DARK
export const themes: string[] = [THEME_SYSTEM, THEME_LIGHT, THEME_DARK]

export const LTR = "ltr"
export const RTL = "rtl"
export const i18nDirs = [LTR, RTL]

export const supportedLocales = ["en-US"]

export interface Settings extends JsonObjectReadOnly {
    readonly i18n: {
        readonly dir: "ltr" | "rtl"
        readonly locale: string
    }
    readonly appearance: {
        readonly theme: Theme
    }
    readonly advanced: {
        readonly logging: {
            readonly enabled: boolean
            readonly path: string
        }
    }
}

export const SETTINGS_KEY_THEME = "appearance.theme"
export const SETTINGS_KEY_LOG_ENABLED = "advanced.logging.enabled"
export const SETTINGS_KEY_I18N_DIR = "i18n.dir"
export const SETTINGS_KEY_I18N_LOCALE = "i18n.locale"

export type SettingsKey =
    | typeof SETTINGS_KEY_THEME
    | typeof SETTINGS_KEY_LOG_ENABLED
    | typeof SETTINGS_KEY_I18N_DIR
    | typeof SETTINGS_KEY_I18N_LOCALE

export const SETTINGS_SCHEMAS = new Map<SettingsKey, JsonObject>([
    [
        SETTINGS_KEY_THEME,
        {
            type: "string",
            enum: themes,
        },
    ],
    [
        SETTINGS_KEY_LOG_ENABLED,
        {
            type: "boolean",
        },
    ],
    [
        SETTINGS_KEY_I18N_DIR,
        {
            type: "string",
            enum: i18nDirs,
        },
    ],
    [
        SETTINGS_KEY_I18N_LOCALE,
        {
            type: "string",
            enum: supportedLocales,
        },
    ],
])

// UserSettings may contain an arbitrary subset of settings
export type UserSettings = Settings | JsonObjectReadOnly
