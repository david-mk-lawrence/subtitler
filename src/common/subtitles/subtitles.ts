/**
 * This module contains declarations and general utility and
 * helper functions for creating new Subtitle objects.
 */
import { JsonObject } from "@/common/json"

export type Unit = "ms" | "s" | "m" | "h"

export interface Timestamp extends JsonObject {
    hours: number
    minutes: number
    seconds: number
    milliseconds: number
    totalMS: number
}

export interface SubtitleTimestamp extends JsonObject {
    ts: Timestamp
    overlapsWithPrev: boolean
    overlapsWithNext: boolean
    overlapsWithSelf: boolean
    outOfRange: boolean
}

export interface Subtitle extends JsonObject {
    index: number
    start: SubtitleTimestamp
    end: SubtitleTimestamp
    caption: string[]
}

export interface Subtitles {
    subs: Subtitle[]
    filepath?: string
}

const timestampToMS = (
    hours: number,
    minutes: number,
    seconds: number,
    milliseconds: number,
): number =>
    hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000 + milliseconds

export const toTimestamp = (
    hours: number,
    minutes: number,
    seconds: number,
    milliseconds: number,
): Timestamp => ({
    hours,
    minutes,
    seconds,
    milliseconds,
    totalMS: timestampToMS(hours, minutes, seconds, milliseconds),
})

export const padNum = (val: number, pad = 2) => val.toString().padStart(pad, "0")

export const timestampToString = (ts: Timestamp): string =>
    `${padNum(ts.hours)}:${padNum(ts.minutes)}:${padNum(ts.seconds)},${padNum(
        ts.milliseconds,
        3,
    )}`

export const millisecondsToTimestamp = (ms: number): Timestamp => {
    if (ms <= 0) {
        return toTimestamp(0, 0, 0, 0)
    }

    let remaining = ms

    const hours = Math.floor(remaining / (60 * 60 * 1000))
    remaining = remaining - hours * 60 * 60 * 1000

    const minutes = Math.floor(remaining / (60 * 1000))
    remaining = remaining - minutes * 60 * 1000

    const seconds = Math.floor(remaining / 1000)
    remaining = remaining - seconds * 1000

    const milliseconds = remaining

    return toTimestamp(hours, minutes, seconds, milliseconds)
}

export const tsAddMilliseconds = (ts: Timestamp, ms: number): Timestamp =>
    millisecondsToTimestamp(ts.totalMS + ms)

export const toSubtitleTimestamp = (
    hours: number,
    minutes: number,
    seconds: number,
    milliseconds: number,
): SubtitleTimestamp => {
    const ts = toTimestamp(hours, minutes, seconds, milliseconds)
    if (
        hours >= 0 &&
        hours <= 99 &&
        minutes >= 0 &&
        minutes <= 59 &&
        seconds >= 0 &&
        seconds <= 59 &&
        milliseconds >= 0 &&
        milliseconds <= 999
    ) {
        return {
            ts,
            overlapsWithPrev: false,
            overlapsWithNext: false,
            overlapsWithSelf: false,
            outOfRange: false,
        }
    }

    return {
        ts,
        overlapsWithPrev: false,
        overlapsWithNext: false,
        overlapsWithSelf: false,
        outOfRange: true,
    }
}

export const tsSeparator = " --> "

export const asText = (lines: string[]): string => lines.join("\n")
export const asLines = (text: string): string[] => text.split("\n")

export const emptySubtitle = (): Subtitle => ({
    index: 1,
    start: toSubtitleTimestamp(0, 0, 0, 0),
    end: toSubtitleTimestamp(0, 0, 0, 0),
    caption: [""],
})
