import { ALERTS_CHANNEL } from "./alerts"
import { ERRORS_CHANNEL } from "./errors"
import { GET_TRANSLATION_CHANNEL } from "./i18n"
import { LOGS_CHANNEL } from "./logging"
import { MENU_REDO, MENU_UNDO } from "./menu"
import { NAV_ROUTE_CHANNEL } from "./routes"
import {
    GET_SETTINGS_CHANNEL,
    RESET_SETTINGS_CHANNEL,
    SET_SETTINGS_CHANNEL,
} from "./settings"
import {
    GET_SUBTITLES_CHANNEL,
    NEW_SUBTITLES_CHANNEL,
    OPEN_SUBTITLES_CHANNEL,
    SAVE_SUBTITLES_CHANNEL,
    SAVE_AS_SUBTITLES_CHANNEL,
    SET_SUBTITLES_CHANNEL,
} from "./subtitles"

// This defines the set of channels that allow
// communication over IPC
export const allowedChannels: string[] = [
    ALERTS_CHANNEL,
    ERRORS_CHANNEL,
    LOGS_CHANNEL,
    MENU_REDO,
    MENU_UNDO,
    GET_TRANSLATION_CHANNEL,
    GET_SETTINGS_CHANNEL,
    RESET_SETTINGS_CHANNEL,
    SET_SETTINGS_CHANNEL,
    GET_SUBTITLES_CHANNEL,
    NEW_SUBTITLES_CHANNEL,
    OPEN_SUBTITLES_CHANNEL,
    SAVE_SUBTITLES_CHANNEL,
    SAVE_AS_SUBTITLES_CHANNEL,
    SET_SUBTITLES_CHANNEL,
    NAV_ROUTE_CHANNEL,
]
