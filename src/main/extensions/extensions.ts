/**
 * For development only. Sets up chrome browser extensions for debugging the renderer
 */
import path from "path"
import os from "os"

import { session } from "electron"
import { promises as fs } from "graceful-fs"

export const REDUX = "lmhkpmbekcpmknklioeibfkpmmfibljd"
export const REACT = "fmkadmapgofadopljbjfkapdkoienihi"

export const getOSExtensionDir = (): string => {
    if (process.platform === "darwin") {
        return path.join(
            "Library",
            "Application Support",
            "Google",
            "Chrome",
            "Default",
            "Extensions",
        )
    }

    throw new Error("Extension loading only supported on MacOS")
}

export const getExtensionDir = async (
    extension: string,
): Promise<string | undefined> => {
    const extBaseDir = path.join(os.homedir(), getOSExtensionDir(), extension)
    const versions = (await fs.readdir(extBaseDir)).sort()
    if (versions.length > 0) {
        return path.join(extBaseDir, versions[versions.length - 1])
    }

    return
}

export const loadExtensions = async (extensions: string[]): Promise<void[]> =>
    Promise.all(
        extensions.map(async ext => {
            const extDir = await getExtensionDir(ext)
            if (extDir) {
                await session.defaultSession.loadExtension(extDir, {
                    allowFileAccess: true,
                })
            }
        }),
    )
