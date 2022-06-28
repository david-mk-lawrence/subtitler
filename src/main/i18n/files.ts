import path from "path"

import { JsonObject } from "@/common"
import { fileExists, readJSON } from "@/main/files"
import { log } from "@/main/logs"

/**
 * Retrieves a translation for the renderer as requested from i18next
 */
export const getTranslation = async (
    lang: string,
    ns: string,
): Promise<JsonObject | undefined> => {
    const filepath = path.join(__dirname, "locales", "renderer", lang, `${ns}.json`)
    const exists = await fileExists(filepath)
    if (exists) {
        log.debug(`Reading translation from ${filepath}`)
        return readJSON(filepath)
    }

    log.error(`Unable to find translation file ${filepath}`)
    return
}
