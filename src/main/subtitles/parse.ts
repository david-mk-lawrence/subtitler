import os from "os"

import { promises as fs } from "graceful-fs"
import writeFileAtomic from "write-file-atomic"
import i18n from "i18n"

import {
    AppError,
    Subtitle,
    SubtitleTimestamp,
    toSubtitleTimestamp,
    timestampToString,
    tsSeparator,
} from "@/common"

export class SRTParseError extends AppError {}

/**
 * Converts a string to a timestamp
 *
 * A timestamp in a .srt file is in the form
 * HH:MM:SS,mmm
 * where
 *  HH = Hours, between 00 - 99
 *  MM = Minutes, between 00 - 59
 *  SS = Seconds, between 00 - 59
 *  mmm = Milliseconds, between 000 - 999
 */
const stringToSubtitleTimestamp = (
    captionTimestamp: string,
): SubtitleTimestamp | undefined => {
    const [hms, millisecondsStr] = captionTimestamp.split(",")
    if (
        hms === undefined ||
        millisecondsStr === undefined ||
        millisecondsStr.trim() === ""
    ) {
        return
    }

    const [hoursStr, minutesStr, secondsStr] = hms.split(":")
    if (
        hoursStr === undefined ||
        hoursStr.trim() === "" ||
        minutesStr === undefined ||
        minutesStr.trim() === "" ||
        secondsStr === undefined ||
        secondsStr.trim() === ""
    ) {
        return
    }

    const hours: number = parseInt(hoursStr.trim())
    const minutes: number = parseInt(minutesStr.trim())
    const seconds: number = parseInt(secondsStr.trim())
    const milliseconds: number = parseInt(millisecondsStr.trim())

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) || isNaN(milliseconds)) {
        return
    }

    return toSubtitleTimestamp(hours, minutes, seconds, milliseconds)
}

/**
 * Converts a full subtitle, including the index, the timestamps, and the caption
 * to a Subtitle object.
 *
 * Also takes the latest line in the file as an argument so that errors can be
 * reported to the user with the line number it occured on.
 *
 * Returns the Subtitle, and the new latest line number to be used in the next subtitle.
 */
const captionGroupToSubtitle = (
    captionGroup: string,
    lineNumber: number,
): [Subtitle, number] => {
    const [indexStr, timestamps, ...rawCaption] = captionGroup.trim().split(os.EOL)

    const caption = rawCaption.map(cap => cap.replace(/\r?\n|\r/, ""))

    const index = parseInt(indexStr)
    if (isNaN(index) || index < 1) {
        throw new SRTParseError(i18n.__("Parse-Index-Error", lineNumber.toString()))
    }

    const [startStr, endStr] = timestamps.split(tsSeparator)
    if (!startStr || !endStr) {
        throw new SRTParseError(
            i18n.__("Timestamp-Split-Error", tsSeparator, (lineNumber + 1).toString()),
        )
    }

    const start = stringToSubtitleTimestamp(startStr)
    const end = stringToSubtitleTimestamp(endStr)
    if (!start || !end) {
        throw new SRTParseError(
            i18n.__("Parse-Timestamp-Error", (lineNumber + 1).toString()),
        )
    }

    const lines = 2 + caption.length + 1 // index line + timestamp line + captions lines + new line

    return [
        {
            index,
            start,
            end,
            caption,
        },
        lines,
    ]
}

/**
 * Checks all the Subtitles for overlaps and sets the flags accordingly
 */
const setOverlaps = (subs: Subtitle[]) => {
    for (let idx = 0; idx < subs.length; idx += 1) {
        const prev: Subtitle | undefined = subs[idx - 1]
        const curr: Subtitle = subs[idx]
        const next: Subtitle | undefined = subs[idx + 1]

        if (curr.start.ts.totalMS > curr.end.ts.totalMS) {
            curr.start.overlapsWithSelf = true
            curr.end.overlapsWithSelf = true
        }

        if (prev) {
            if (curr.start.ts.totalMS < prev.start.ts.totalMS) {
                curr.start.overlapsWithPrev = true
                prev.start.overlapsWithNext = true
            }
        }

        if (next) {
            if (curr.start.ts.totalMS > next.start.ts.totalMS) {
                curr.start.overlapsWithNext = true
                next.start.overlapsWithPrev = true
            }
        }
    }
}

/**
 * Parse the srt file into a list of subtitle objects
 */
const parseSRT = (data: string): Subtitle[] => {
    const subs: Subtitle[] = []
    let lineNumber = 1
    const splitRegEx = new RegExp("\\" + os.EOL + "\\s*" + "\\" + os.EOL)
    const captionGroups = data.split(splitRegEx)

    for (const captionGroup of captionGroups) {
        if (captionGroup.trim() !== "") {
            const [sub, lines] = captionGroupToSubtitle(captionGroup, lineNumber)
            subs.push(sub)
            lineNumber += lines
        }
    }

    setOverlaps(subs)
    return subs
}

/**
 * Reads a .srt file and reads it into a list of Subtitle objects
 */
export const parseSRTFromPath = async (filepath: string): Promise<Subtitle[]> => {
    try {
        const data = await fs.readFile(filepath, { encoding: "utf-8" })
        return parseSRT(data)
    } catch (error: unknown) {
        const err = error as Error
        throw new AppError(i18n.__("Open-File-Error", filepath, err.message))
    }
}

/**
 * Converts a subtitle object into a list of strings that represent
 * each line in the subtitle
 */
const subtitleToSRTLines = (sub: Subtitle): string[] => [
    sub.index.toString(),
    [timestampToString(sub.start.ts), timestampToString(sub.end.ts)].join(tsSeparator),
    ...sub.caption,
    "", // newline will placed here when joined which will separate subtitle groups
]

/**
 * Converts a list of subtitle objects to a list of strings which
 * represents each line of the file
 */
const subtitlesToSRTLines = (subs: Subtitle[]): string[] => {
    const lines: string[] = []
    for (const sub of subs) {
        lines.push(...subtitleToSRTLines(sub))
    }

    return lines
}

/**
 * Writes the list of subtitles to the given filepath
 */
export const writeSubtitlesToSRT = async (
    subs: Subtitle[],
    filepath: string,
): Promise<void> => {
    const lines = subtitlesToSRTLines(subs)
    const srt = lines.join(os.EOL)

    try {
        await writeFileAtomic(filepath, srt, {
            encoding: "utf-8",
        })
    } catch (error: unknown) {
        const err = error as Error
        throw new AppError(i18n.__("Save-File-Error", filepath, err.message))
    }
}
