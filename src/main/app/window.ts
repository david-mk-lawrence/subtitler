/**
 * Creates and manages application windows
 */
import { BrowserWindow } from "electron"

import { isDev } from "@/main/app"
import { deleteSession } from "@/main/session"
import { saveCurrentSession } from "@/main/subtitles"

const WINDOWS = new Set()

export const getCurrentWindow = (): BrowserWindow | null =>
    BrowserWindow.getFocusedWindow()

export const createWindow = (
    initialize?: (w: BrowserWindow) => Promise<void>,
): BrowserWindow => {
    let x: number | undefined, y: number | undefined
    const currentWindow = getCurrentWindow()
    if (currentWindow) {
        const [currentX, currentY] = currentWindow.getPosition()
        x = currentX + 24
        y = currentY + 24
    }

    let win: BrowserWindow | null = new BrowserWindow({
        x,
        y,
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegrationInSubFrames: false,
            contextIsolation: true,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            disableBlinkFeatures: "Auxclick",
        },
    })
    WINDOWS.add(win)

    win.once("ready-to-show", async () => {
        if (win) {
            if (initialize) {
                await initialize(win)
            }

            win.show()
            win.focus()
            if (isDev) {
                win.webContents.toggleDevTools()
            }
        }
    })

    win.on("close", async (event: Electron.Event) => {
        if (win) {
            win.focus()
            const conf = await saveCurrentSession(win)
            if (!conf) {
                event.preventDefault()
            }

            deleteSession(win.id)
        }
    })

    win.on("closed", () => {
        WINDOWS.delete(win)
        win = null
    })

    win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

    return win
}
