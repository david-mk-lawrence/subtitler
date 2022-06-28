import React from "react"

import { SubtitleTimestamp, toSubtitleTimestamp } from "@/common"

import Timestamp from "./Timestamp"

export interface CaptionTimestampProps {
    sts: SubtitleTimestamp
    min: number
    max: number
    selfMin?: number // set if this is an "end"
    selfMax?: number // set if this is a "start"
    onChange: (sts: SubtitleTimestamp) => void
}

const defaultClassName = ""
const errClassName =
    "ring-1 ring-red-600 focus:ring-red-600 dark:ring-red-600 dark:focus:ring-red-600"

export default function CaptionTimestamp(props: CaptionTimestampProps): JSX.Element {
    const { sts, min, max, selfMin, selfMax, onChange } = props
    const cls =
        sts.overlapsWithPrev ||
        sts.overlapsWithSelf ||
        sts.overlapsWithNext ||
        sts.outOfRange
            ? errClassName
            : defaultClassName

    const onTsChange = (
        hours: number,
        minutes: number,
        seconds: number,
        milliseconds: number,
    ) => {
        const newSts = toSubtitleTimestamp(hours, minutes, seconds, milliseconds)
        // set all the overlap flags on the timestamp based on the given ranges
        onChange({
            ...newSts,
            overlapsWithPrev: newSts.ts.totalMS < min,
            overlapsWithNext: newSts.ts.totalMS > max,
            overlapsWithSelf:
                (selfMin !== undefined && newSts.ts.totalMS < selfMin) ||
                (selfMax !== undefined && newSts.ts.totalMS > selfMax),
        })
    }

    return (
        <div className={cls}>
            <Timestamp ts={sts.ts} onChange={onTsChange} />
        </div>
    )
}
