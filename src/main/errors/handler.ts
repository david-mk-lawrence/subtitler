import { app, crashReporter, dialog, MessageBoxOptions } from "electron"

import { log } from "@/main/logs"

export const configureCrashReporter = (remote: boolean): void => {
    crashReporter.start({
        companyName: "Subtitler",
        productName: "Subtitler",
        submitURL: remote ? "" : "",
        uploadToServer: false,
        compress: true,
    })
}

export const handleError = (error: Error): void => {
    const msg = `Fatal error: ${error.toString()}\n${error.stack}`
    log.error(msg)
    const messageBoxOpts: MessageBoxOptions = {
        type: "error",
        title: "Unexpected Error",
        message: msg,
    }
    dialog.showMessageBox(messageBoxOpts)
    app.exit(1)
}
