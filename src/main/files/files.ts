/**
 * General helper functions for files
 */
import { app } from "electron"
import { promises as fs } from "graceful-fs"
import path from "path"

export const fileExists = async (filename: string): Promise<boolean> => {
    try {
        await fs.access(filename)
        return true
    } catch (error) {
        return false
    }
}

/**
 * Asynchronously checks a list of files to see if they exist.
 * Returns a subset of the list that contains files that still exist.
 */
export const existingFiles = async (filepaths: string[]): Promise<string[]> => {
    const fail = Symbol()
    return (
        await Promise.all(
            filepaths.map(async filepath => {
                const exists = await fileExists(filepath)
                if (exists) {
                    return filepath
                } else {
                    return fail
                }
            }),
        )
    ).filter(result => result !== fail) as string[]
}

export const getAppPath = (filename: string): string =>
    path.join(app.getPath("userData"), filename)

export const appFileExists = async (filename: string): Promise<boolean> =>
    fileExists(getAppPath(filename))
