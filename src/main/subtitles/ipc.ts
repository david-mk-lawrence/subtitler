import { BrowserWindow, IpcMainInvokeEvent } from "electron"

import { IpcHandler, Subtitles, Subtitle, GET_SUBTITLES_CHANNEL } from "@/common"
import { sendAlert } from "@/main/alerts"
import { getCurrentWindow, createWindow } from "@/main/app"
import { sendToRenderer } from "@/main/ipc"
import { log } from "@/main/logs"
import { getSession, setSession } from "@/main/session"

import { saveSubtitles, saveSubtitlesAs, openFile, newFile } from "./files"

/**
 * Gets the subtitiles in the session and returns them to the renderer
 */
export const handleGetSubtitles: IpcHandler = async (
    event: IpcMainInvokeEvent,
): Promise<Subtitles | undefined> => {
    const sess = getSession(event.sender.id)
    if (sess.subs) {
        log.debug(`[${event.sender.id}] Got subs from session. Sending subs.`)
        return { subs: sess.subs, filepath: sess.filepath }
    }

    log.debug(`[${event.sender.id}] No subs in session`)
    return
}

/**
 * Syncs the subtitiles in the session with the subtitiles in the renderer
 */
export const handleSetSubtitles: IpcHandler = async (
    event: IpcMainInvokeEvent,
    subs: Subtitle[],
): Promise<void> => {
    const sess = getSession(event.sender.id)
    log.debug(`[${event.sender.id}] Syncing subs.`)
    setSession(event.sender.id, { ...sess, subs, saved: false })
}

/**
 * The user requested the subtitiles to be saved
 */
export const handleSaveSubtitles: IpcHandler = async (
    event: IpcMainInvokeEvent,
): Promise<Subtitles | undefined> => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) {
        const sess = await saveSubtitles(win)
        if (sess.subs) {
            log.debug(`[${event.sender.id}] Saved subs. Sending subs.`)
            return { subs: sess.subs, filepath: sess.filepath }
        }
    } else {
        log.debug(`[${event.sender.id}] No window or session to save.`)
    }

    return
}

/**
 * The user requested the subtitiles to be saved as a new file
 */
export const handleSaveAsSubtitles: IpcHandler = async (
    event: IpcMainInvokeEvent,
): Promise<Subtitles | undefined> => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) {
        const sess = await saveSubtitlesAs(win)
        if (sess.subs) {
            return { subs: sess.subs, filepath: sess.filepath }
        }
    } else {
        log.debug(`[${event.sender.id}] No window or session to save.`)
    }

    return
}

/**
 * The user requested to open a new file
 */
export const handleOpenSubtitles: IpcHandler = async (
    event: IpcMainInvokeEvent,
    filepath?: string,
): Promise<Subtitles | undefined> => {
    log.debug(`[${event.sender.id}] Attempting to open file ${filepath}.`)
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) {
        const sess = await openFile(win, filepath)
        if (sess && sess.subs) {
            log.debug(
                `[${event.sender.id}] Opened and parsed file ${filepath}. Sending subs.`,
            )

            return { subs: sess.subs, filepath: sess.filepath }
        } else {
            log.debug(
                `[${event.sender.id}] No session or dialog was canceled for ${filepath}.`,
            )
        }
    } else {
        log.debug(`[${event.sender.id}] No window to open file ${filepath}.`)
    }

    return
}

/**
 * The user requested a new file
 */
export const handleNewSubtitles: IpcHandler = async (
    event: IpcMainInvokeEvent,
): Promise<Subtitles | undefined> => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win) {
        const sess = await newFile(win)
        if (sess && sess.subs) {
            log.debug(`[${event.sender.id}] Created new subs. Sending subs.`)
            return { subs: sess.subs, filepath: sess.filepath }
        } else {
            log.debug(`[${event.sender.id}] No session or dialog was canceled.`)
        }
    } else {
        log.debug(`[${event.sender.id}] No window to create new file.`)
    }

    return
}

/**
 * Sends the subtitiles to the renderer. Used when
 * loading a new window, or when an Menu item was
 * selected.
 */
export const sendSubtitlesToRenderer = async (
    window: BrowserWindow,
    subs: Subtitle[],
    filepath?: string,
) => sendToRenderer(window, GET_SUBTITLES_CHANNEL, { subs, filepath })

const openFileSender =
    (): ((window: BrowserWindow) => Promise<void>) => async (window: BrowserWindow) => {
        try {
            const sess = await openFile(window)
            if (sess && sess.subs) {
                sendSubtitlesToRenderer(window, sess.subs, sess.filepath)
            }
        } catch (error) {
            const err = error as Error
            sendAlert("open-file-error", "error", err.message)
        }
    }

export const onFileOpen = async () => {
    const send = openFileSender()

    let window = getCurrentWindow()
    if (!window) {
        window = createWindow(send)
    } else {
        send(window)
    }
}

const openFileByPathSender =
    (filepath: string): ((window: BrowserWindow) => Promise<void>) =>
    async (window: BrowserWindow) => {
        try {
            const sess = await openFile(window, filepath)
            if (sess && sess.subs) {
                sendSubtitlesToRenderer(window, sess.subs, sess.filepath)
            }
        } catch (error) {
            const err = error as Error
            sendAlert("open-file-error", "error", err.message)
        }
    }

export const onFileOpenByPath = async (filepath: string, win?: BrowserWindow) => {
    const send = openFileByPathSender(filepath)

    if (win) {
        send(win)
        return
    }

    let window = getCurrentWindow()
    if (!window) {
        window = createWindow(send)
    } else {
        send(window)
    }
}

const newFileSender =
    (): ((window: BrowserWindow) => Promise<void>) => async (window: BrowserWindow) => {
        try {
            const sess = await newFile(window)
            if (sess && sess.subs) {
                sendSubtitlesToRenderer(window, sess.subs, sess.filepath)
            }
        } catch (error) {
            const err = error as Error
            sendAlert("new-file-error", "error", err.message)
        }
    }

export const onNewFile = async () => {
    const send = newFileSender()

    let window = getCurrentWindow()
    if (!window) {
        window = createWindow(send)
    } else {
        send(window)
    }
}

export const onSave = async () => {
    const window = getCurrentWindow()
    if (!window) {
        return
    }

    try {
        const sess = await saveSubtitles(window)
        if (sess.subs) {
            sendSubtitlesToRenderer(window, sess.subs, sess.filepath)
        }
    } catch (error) {
        const err = error as Error
        sendAlert("save-file-error", "error", err.message)
    }
}

export const onSaveAs = async () => {
    const window = getCurrentWindow()
    if (!window) {
        return
    }

    try {
        const sess = await saveSubtitlesAs(window)
        if (sess.subs) {
            sendSubtitlesToRenderer(window, sess.subs, sess.filepath)
        }
    } catch (error) {
        const err = error as Error
        sendAlert("save-file-error", "error", err.message)
    }
}
