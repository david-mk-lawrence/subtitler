/**
 * This module handles opening and saving subtitiles files, including presenting
 * any dialogs to the user.
 */
import { app, BrowserWindow } from "electron"

import { Session, emptySubtitle } from "@/common"
import { confirmSave, openFileDialog, openSaveDialog } from "@/main/app"
import { getSession, setSession } from "@/main/session"

import { parseSRTFromPath, writeSubtitlesToSRT } from "./parse"

/**
 * Saves the current session to the filesystem.
 *
 * This will confirm the save with the user so that any unsaved work is not lost.
 * If the session has not been saved before (i.e. there is no filepath in the session),
 * then the user will be presented with a save dialog.
 */
export const saveCurrentSession = async (window: BrowserWindow): Promise<boolean> => {
    const sess = getSession(window.id)
    if (sess.saved || !sess.subs) {
        return true
    }

    const saveCurrent = confirmSave(sess.filepath)
    if (saveCurrent === undefined) {
        // User cancelled the dialog wihout choosing an option
        // so we shouldn't continue
        return false
    }

    // user selected "Don't Save", so we can exit now before writing anything
    // to the filesystem
    if (!saveCurrent) {
        return true
    }

    let filepath: string | undefined
    if (sess.filepath) {
        filepath = sess.filepath
    } else {
        filepath = await openSaveDialog()
        if (!filepath) {
            // User cancelled the dialog wihout choosing an option
            // so we shouldn't continue
            return false
        }
    }

    await writeSubtitlesToSRT(sess.subs, filepath)
    setSession(window.id, { ...sess, filepath, saved: true })

    return true
}

/**
 * Opens a subtitles file and loads it into the session.
 *
 * If no path is given, then a dialog will be presented to the user to
 * choose a file to open.
 */
export const openFile = async (
    window: BrowserWindow,
    openFilepath?: string,
): Promise<Session | undefined> => {
    const saved = await saveCurrentSession(window)
    if (!saved) {
        return
    }

    let filepath
    if (openFilepath) {
        filepath = openFilepath
    } else {
        filepath = await openFileDialog()
    }

    if (filepath) {
        const subs = await parseSRTFromPath(filepath)
        window.setRepresentedFilename(filepath)
        app.addRecentDocument(filepath)
        return setSession(window.id, { subs, filepath, saved })
    }

    return
}

/**
 * Closes the current session and loads the session with a new empty subtitles object
 */
export const newFile = async (window: BrowserWindow): Promise<Session | undefined> => {
    const saved = await saveCurrentSession(window)
    if (!saved) {
        return
    }

    window.setRepresentedFilename("")
    return setSession(window.id, { subs: [emptySubtitle()], saved: false })
}

/**
 * Save the session to a new filepath that is chosen by the user
 */
export const saveSubtitlesAs = async (window: BrowserWindow): Promise<Session> => {
    const sess = getSession(window.id)
    if (sess.saved || !sess.subs) {
        return sess
    }

    const filepath = await openSaveDialog()
    if (filepath) {
        await writeSubtitlesToSRT(sess.subs, filepath)
        window.setRepresentedFilename(filepath)
        app.addRecentDocument(filepath)
        return setSession(window.id, {
            subs: sess.subs,
            filepath: filepath,
            saved: true,
        })
    }

    return sess
}

/**
 * Save the session to the current filepath
 */
export const saveSubtitles = async (window: BrowserWindow): Promise<Session> => {
    const sess = getSession(window.id)
    if (sess.saved || !sess.subs) {
        return sess
    }

    if (!sess.filepath) {
        return saveSubtitlesAs(window)
    }

    await writeSubtitlesToSRT(sess.subs, sess.filepath)
    app.addRecentDocument(sess.filepath)
    return setSession(window.id, { ...sess, saved: true })
}
