/**
 * This module handles OS dialogs related to files
 */
import { dialog } from "electron"

import i18n from "i18n"

/**
 * Triggers the OS Open File dialog for the user to select a file.
 * Returns a promise containing the selected file, or else undefined
 * if the user cancelled the dialog without selecting anything
 */
export const openFileDialog = async (): Promise<string | undefined> => {
    const result = await dialog.showOpenDialog({
        properties: ["openFile", "createDirectory"],
        filters: [{ name: "Subtitles", extensions: ["srt"] }],
    })

    if (result.canceled) {
        return
    }

    if (result.filePaths.length > 1) {
        dialog.showErrorBox(
            "Invalid File Selection",
            "Only a single .srt may be selected.",
        )

        return
    }

    return result.filePaths[0]
}

/**
 * Triggers the OS Save file dialog
 *
 * Returns a promise containing either the name of the file that was saved
 * or else undefined if the user cancelled the dialog without saving
 */
export const openSaveDialog = async (
    defaultPath?: string,
): Promise<string | undefined> => {
    const result = await dialog.showSaveDialog({
        properties: ["createDirectory", "showOverwriteConfirmation"],
        filters: [{ name: "Subtitles", extensions: ["srt"] }],
        defaultPath,
    })

    if (result.canceled) {
        return
    }

    return result.filePath
}

/**
 * Triggers an OS message box asking the user for confirmation before saving.
 * This should be triggered when a save will result in the current work
 * being lost.
 *
 * Returns a promise containing either a boolean indicating the if the user
 * would like to continue with/without saving, or else undefined if they
 * cancelled the dialog without choosing either option.
 */
export const confirmSave = (filepath?: string): boolean | undefined => {
    let message: string
    if (filepath) {
        message = i18n.__("Save-File-Dialog-Message-Existing-File", filepath)
    } else {
        message = i18n.__("Save-File-Dialog-Message-New-File")
    }

    const result = dialog.showMessageBoxSync({
        title: i18n.__("Save-File-Dialog-Title"),
        message,
        detail: i18n.__("Save-File-Dialog-Detail"),
        type: "warning",
        buttons: [i18n.__("Save"), i18n.__("Dont-Save"), i18n.__("Cancel")],
        defaultId: 0,
    })

    if (result === 0) {
        return true
    } else if (result === 1) {
        return false
    }

    return
}
