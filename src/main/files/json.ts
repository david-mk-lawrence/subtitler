/**
 * Helper functions for reading and writing JSON
 */
import { promises as fs } from "graceful-fs"
import writeFileAtomic from "write-file-atomic"

import { JsonObject } from "@/common"

export const readJSON = async <T extends JsonObject>(filename: string): Promise<T> => {
    const jsonString = await fs.readFile(filename, { encoding: "utf-8" })
    return JSON.parse(jsonString) as T
}

export const writeJSON = async <T extends JsonObject>(
    filename: string,
    data: T,
): Promise<void> =>
    writeFileAtomic(filename, JSON.stringify(data), {
        encoding: "utf-8",
    })

export const writeJSONNonAtomic = async <T extends JsonObject>(
    filename: string,
    data: T,
): Promise<void> =>
    fs.writeFile(filename, JSON.stringify(data), {
        encoding: "utf-8",
    })
