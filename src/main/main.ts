import { app, BrowserWindow } from "electron"

import {
    init,
    ipcHandlers,
    ipcListeners,
    isDev,
    createMenu,
    createWindow,
    macOSDockMenu,
} from "@/main/app"
import { configureCrashReporter, handleError } from "@/main/errors"
import { loadExtensions, REACT, REDUX } from "@/main/extensions"
import { registerIpcHandlers, registerIpcListeners } from "@/main/ipc"
import { log } from "@/main/logs"
import {
    onFileOpen,
    onFileOpenByPath,
    onSave,
    onSaveAs,
    onNewFile,
} from "@/main/subtitles"
import { getSessionFilepaths, saveFilepaths } from "@/main/session"

process.on("uncaughtException", handleError)
process.on("unhandledRejection", handleError)

configureCrashReporter(!isDev)

app.whenReady()
    .then(async () => {
        await init()
        registerIpcHandlers(ipcHandlers)
        registerIpcListeners(ipcListeners)

        createMenu(
            app.name,
            () => createWindow(),
            onFileOpen,
            onNewFile,
            onSave,
            onSaveAs,
        )

        if (process.platform === "darwin") {
            app.dock.setMenu(macOSDockMenu(() => createWindow(), onFileOpen))
        }

        // When the app is closed, the currently opened files are cached.
        // This retrieves that file and re-opens the windows. If there is no
        // session, then a default empty window is created.
        const filepaths = await getSessionFilepaths()
        if (filepaths.length > 0) {
            for (const fp of filepaths) {
                createWindow(async win => onFileOpenByPath(fp, win))
            }
        } else {
            createWindow()
        }

        app.on("activate", () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow()
            }
        })

        if (isDev) {
            try {
                await loadExtensions([REACT, REDUX])
            } catch (error) {
                log.error(`Unable to load extensions: ${error}`)
            }
        }
    })
    .catch(err => handleError(err))

app.on("open-file", async (event, filepath: string) => {
    // Called when a file is dragged onto the icon in macOS or when
    // a file is selected from "Open Recent" in the menu
    event.preventDefault()
    await app.whenReady()
    await onFileOpenByPath(filepath)
})

app.on("web-contents-created", (_, contents) => {
    contents.setWindowOpenHandler(() => ({ action: "deny" }))

    contents.on("will-navigate", (event, _) => {
        event.preventDefault()
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("before-quit", async () => {
    // Before the app exits, save the currently opened files so that they
    // can be re-opened the next time the app starts.
    await saveFilepaths()
})
