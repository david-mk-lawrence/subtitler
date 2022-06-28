/**
 * Wires up IPC functions to their channels
 */
import {
    Channel,
    ERRORS_CHANNEL,
    LOGS_CHANNEL,
    GET_SETTINGS_CHANNEL,
    SET_SETTINGS_CHANNEL,
    RESET_SETTINGS_CHANNEL,
    SET_SUBTITLES_CHANNEL,
    GET_SUBTITLES_CHANNEL,
    OPEN_SUBTITLES_CHANNEL,
    NEW_SUBTITLES_CHANNEL,
    SAVE_SUBTITLES_CHANNEL,
    SAVE_AS_SUBTITLES_CHANNEL,
    GET_TRANSLATION_CHANNEL,
    IpcHandler,
    IpcListener,
} from "@/common"
import { handleRendererError } from "@/main/errors"
import { handleRendererLog } from "@/main/logs"
import { handleRendererLocale } from "@/main/i18n"
import {
    handleGetSettings,
    handleSetSetting,
    handleResetSettings,
} from "@/main/settings"
import {
    handleGetSubtitles,
    handleSetSubtitles,
    handleOpenSubtitles,
    handleNewSubtitles,
    handleSaveSubtitles,
    handleSaveAsSubtitles,
} from "@/main/subtitles"

export const ipcListeners: Map<Channel, IpcListener> = new Map([
    [LOGS_CHANNEL, handleRendererLog],
    [GET_TRANSLATION_CHANNEL, handleRendererLocale],
])

export const ipcHandlers: Map<Channel, IpcHandler> = new Map([
    [ERRORS_CHANNEL, handleRendererError],
    [GET_SETTINGS_CHANNEL, handleGetSettings],
    [SET_SETTINGS_CHANNEL, handleSetSetting],
    [RESET_SETTINGS_CHANNEL, handleResetSettings],
    [SET_SUBTITLES_CHANNEL, handleSetSubtitles],
    [GET_SUBTITLES_CHANNEL, handleGetSubtitles],
    [OPEN_SUBTITLES_CHANNEL, handleOpenSubtitles],
    [NEW_SUBTITLES_CHANNEL, handleNewSubtitles],
    [SAVE_SUBTITLES_CHANNEL, handleSaveSubtitles],
    [SAVE_AS_SUBTITLES_CHANNEL, handleSaveAsSubtitles],
])
