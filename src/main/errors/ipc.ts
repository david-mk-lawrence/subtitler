import { IpcHandler } from "@/common"

import { log } from "@/main/logs"

/**
 * Receives an error event from the renderer to log or report
 */
export const handleRendererError: IpcHandler = async (
    _,
    error: Error,
    stackTrace: string,
) => {
    log.error(`Renderer Error: ${error}\n${stackTrace}`)
}
