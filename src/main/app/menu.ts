/**
 * Builds the Menu for the application
 */
import { Menu, MenuItemConstructorOptions } from "electron"

import i18n from "i18n"

import { MENU_REDO, MENU_UNDO } from "@/common"
import { getCurrentWindow } from "@/main/app"
import { sendToRenderer } from "@/main/ipc"

import { sendNavBack, sendNavForward, sendNavEditor, sendNavSettings } from "./ipc"

const appSubMenu = (appName: string): MenuItemConstructorOptions => ({
    label: appName,
    submenu: [
        { role: "about" },
        { type: "separator" },
        {
            label: i18n.__("Preferences"),
            accelerator: "CmdOrCtrl+,",
            click: sendNavSettings,
        },
        { type: "separator" },
        { role: "services" },
        { type: "separator" },
        { role: "hide" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" },
    ],
})

const fileSubMenu = (
    onNewWindow: () => void,
    onFileOpen: () => void,
    onNewFile: () => void,
    onSave: () => void,
    onSaveAs: () => void,
): MenuItemConstructorOptions => ({
    label: i18n.__("File"),
    submenu: [
        { type: "separator" },
        {
            label: i18n.__("New-File"),
            accelerator: "CmdOrCtrl+N",
            click: onNewFile,
        },
        {
            label: i18n.__("New-Window"),
            accelerator: "Shift+CmdOrCtrl+N",
            click: onNewWindow,
        },
        { type: "separator" },
        {
            label: i18n.__("Open"),
            accelerator: "CmdOrCtrl+O",
            click: onFileOpen,
        },
        {
            label: i18n.__("Open-Recent"),
            role: "recentDocuments",
            submenu: [
                {
                    label: i18n.__("Clear-Recent"),
                    role: "clearRecentDocuments",
                },
            ],
        },
        { type: "separator" },
        {
            label: i18n.__("Save"),
            accelerator: "CmdOrCtrl+S",
            click: onSave,
        },
        {
            label: i18n.__("Save-As"),
            accelerator: "CmdOrCtrl+Shift+S",
            click: onSaveAs,
        },
        { role: "close" },
    ],
})

const onUndo = () => {
    const window = getCurrentWindow()
    if (!window) {
        return
    }

    sendToRenderer(window, MENU_UNDO)
}

const onRedo = () => {
    const window = getCurrentWindow()
    if (!window) {
        return
    }

    sendToRenderer(window, MENU_REDO)
}

const editSubMenu = (): MenuItemConstructorOptions => ({
    label: i18n.__("Edit"),
    submenu: [
        { label: i18n.__("Undo"), accelerator: "CmdOrCtrl+Z", click: onUndo },
        { label: i18n.__("Redo"), accelerator: "Shift+CmdOrCtrl+Z", click: onRedo },
        { type: "separator" },
        { label: i18n.__("Cut"), accelerator: "CmdOrCtrl+X", role: "cut" },
        { label: i18n.__("Copy"), accelerator: "CmdOrCtrl+C", role: "copy" },
        { label: i18n.__("Paste"), accelerator: "CmdOrCtrl+V", role: "paste" },
        { label: i18n.__("Select-All"), accelerator: "CmdOrCtrl+A", role: "selectAll" },
    ],
})

const navSubMenu = (): MenuItemConstructorOptions => ({
    label: i18n.__("Navigation"),
    submenu: [
        { label: i18n.__("Back"), accelerator: "CmdOrCtrl+Left", click: sendNavBack },
        {
            label: i18n.__("Forward"),
            accelerator: "CmdOrCtrl+Right",
            click: sendNavForward,
        },
        { type: "separator" },
        { label: i18n.__("Editor"), accelerator: "CmdOrCtrl+/", click: sendNavEditor },
        {
            label: i18n.__("Preferences"),
            accelerator: "CmdOrCtrl+,",
            click: sendNavSettings,
        },
    ],
})

const viewSubMenu = (): MenuItemConstructorOptions => ({
    label: i18n.__("View"),
    submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
    ],
})

const windowSubMenu = (): MenuItemConstructorOptions => ({
    label: i18n.__("Window"),
    submenu: [
        { role: "minimize" },
        { role: "zoom" },
        { type: "separator" },
        { role: "front" },
        { type: "separator" },
        { role: "window" },
    ],
})

export const createMenu = (
    appName: string,
    onNewWindow: () => void,
    onFileOpen: () => void,
    onNewFile: () => void,
    onSave: () => void,
    onSaveAs: () => void,
) => {
    Menu.setApplicationMenu(
        Menu.buildFromTemplate([
            appSubMenu(appName),
            fileSubMenu(onNewWindow, onFileOpen, onNewFile, onSave, onSaveAs),
            editSubMenu(),
            navSubMenu(),
            viewSubMenu(),
            windowSubMenu(),
        ]),
    )
}

export const macOSDockMenu = (
    onNewWindow: () => void,
    onFileOpen: () => void,
): Electron.Menu =>
    Menu.buildFromTemplate([
        {
            label: i18n.__("New-Window"),
            click: onNewWindow,
        },
        {
            label: i18n.__("Open"),
            accelerator: "CmdOrCtrl+O",
            click: onFileOpen,
        },
    ])
