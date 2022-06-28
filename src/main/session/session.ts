/**
 * Sessions are held in memory and correspond 1:1 with windows
 * of the application. i.e. each window has a "session"
 */
import lodashMerge from "lodash/fp/merge"
import lodashKeys from "lodash/fp/keys"

import { Session } from "@/common"
import { readJSON, writeJSONNonAtomic, existingFiles, getAppPath } from "@/main/files"

const defaultSession: Session = {
    subs: undefined,
    saved: true,
    filepath: undefined,
}

interface Sessions {
    [key: number]: Session
}

const SESSIONS: Sessions = {}

export const getSession = (id: number): Session => {
    if (SESSIONS[id]) {
        return lodashMerge(defaultSession, SESSIONS[id]) as Session
    }

    return defaultSession
}

export const setSession = (id: number, session: Session): Session => {
    SESSIONS[id] = session
    return session
}

export const deleteSession = (id: number): void => {
    delete SESSIONS[id]
}

export const SESSION_FILE = getAppPath("session.json")

/**
 * Saves the currently open filepaths to a file so that
 * when the application opens later, the windows can be
 * restored
 */
export const saveFilepaths = async (): Promise<void> => {
    try {
        const filepaths = lodashKeys(SESSIONS)
            .map((key: string) => SESSIONS[parseInt(key)].filepath)
            .filter(fp => fp) as string[]
        return writeJSONNonAtomic(SESSION_FILE, { filepaths })
    } catch (error: unknown) {
        // do nothing since this happened while quitting
        // and its better to not raise an during quit.
    }
}

export const getSessionFilepaths = async (): Promise<string[]> => {
    try {
        const filepaths = (await readJSON<{ filepaths: string[] }>(SESSION_FILE))
            .filepaths
        if (filepaths && filepaths.length) {
            return existingFiles(filepaths)
        }

        return []
    } catch (error) {
        return []
    }
}
