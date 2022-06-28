import { IpcListener, LogLevel } from "@/common"

import { log } from "./logger"

/**
 * Listens for messages from the renderer to log.
 * This is useful for keeping logs out of the chrome
 * console
 */
export const handleRendererLog: IpcListener = async (
    _,
    level: LogLevel,
    entry: string,
) => {
    log.log(level, entry)
}
