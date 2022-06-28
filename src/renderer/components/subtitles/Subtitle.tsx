import React from "react"
import { useSelector } from "react-redux"

import { Subtitle as Sub, SubtitleTimestamp, range } from "@/common"

import { useDispatch } from "@/renderer/hooks"
import {
    addSubtitle,
    deleteSubtitles,
    selectSubs,
    deselectSubs,
    updateSubtitleCaption,
    updateSubtitleTimestamps,
    selectLastSelected,
    TimestampUpdate,
} from "@/renderer/store/subtitles"
import { selectKeyboardKeys } from "@/renderer/store/keyboard"
import SubtitleGridRow from "./SubtitleGridRow"
import Caption from "./Caption"
import InsertSub from "./InsertSub"
import RemoveSub from "./RemoveSub"
import SelectSub from "./SelectSub"
import CaptionTimestamp from "./CaptionTimestamp"

export interface SubtitleProps {
    prev?: Sub
    sub: Sub
    next?: Sub
    focusCaption: boolean
    onFocused: () => void
    selected: boolean
}

export default function Subtitle(props: SubtitleProps): JSX.Element {
    const { prev, sub, next, focusCaption, onFocused } = props
    const dispatch = useDispatch()
    const keyboardKeys = useSelector(selectKeyboardKeys)
    const lastSelected = useSelector(selectLastSelected)

    // The start time for a subtitle cannot be less then the previous subtitle's start time.
    const min = prev ? prev.start.ts.totalMS : 0
    // The start time for a subtitle cannot be greater than the next subtitle's start time.
    const max = next ? next.start.ts.totalMS : 0
    // The self min/max ensure there is no overlap between this subtitle's start and end.
    // i.e., a subtitle's start time cannot be _after_ the same subtitle's end time.
    const selfMax = sub.end.ts.totalMS
    const selfMin = sub.start.ts.totalMS

    // add a new subtitle before the current one.
    const prepend = () => {
        const start = { ...sub.start }
        const end = { ...sub.start }
        dispatch(addSubtitle(sub.index, start, end))
    }

    // add a new subtitle after the current one.
    const append = () => {
        const start = { ...sub.end }
        const end = { ...sub.end }
        dispatch(addSubtitle(sub.index + 1, start, end))
    }

    // remove the current subtitle
    const remove = () => {
        dispatch(deleteSubtitles([sub.index - 1]))
    }

    // select the current subtitle
    const select = () => {
        if (
            keyboardKeys.includes("Shift") &&
            lastSelected !== undefined &&
            sub.index - 1 !== lastSelected.lastSelected
        ) {
            let indexes = []
            if (lastSelected.lastSelected > sub.index - 1) {
                indexes = range(sub.index - 1, lastSelected.lastSelected - 1).reverse()
            } else {
                indexes = range(lastSelected.lastSelected + 1, sub.index - 1)
            }

            if (lastSelected.lastSelectedAction === "select") {
                dispatch(selectSubs(indexes))
            } else {
                dispatch(deselectSubs(indexes))
            }
        } else {
            if (props.selected) {
                dispatch(deselectSubs([sub.index - 1]))
            } else {
                dispatch(selectSubs([sub.index - 1]))
            }
        }
    }

    // update the subtitle's caption
    const updateCaption = (newCaption: string[]) => {
        dispatch(updateSubtitleCaption(sub.index, newCaption))
    }

    // update one of the subtitles timestamps (either the start or end)
    // when a timestamp changes, there might be changes to surrounding subtitles
    // so that overlapping timestamps may be reported to the user. All the updates
    // are batched together in a single dispatch so that an "undo" will revert
    // all the changes at the same time.
    const onTimestampChange = (sts: SubtitleTimestamp, kind: "start" | "end") => {
        const updates: TimestampUpdate[] = []
        if (kind === "start") {
            updates.push(
                // A change was made to the "start" timestamp, so update it
                { index: sub.index, sts, kind: "start" },
                // Also update the "end" timestamp's overlap value so that
                // if the new "start" time is invalid, it will be shown to the user.
                {
                    index: sub.index,
                    sts: { ...sub.end, overlapsWithSelf: sts.overlapsWithSelf },
                    kind: "end",
                },
            )

            if (prev) {
                // If there is a previous subtitle (i.e. the current subtitle is _not_ the first one)
                // then update it's overlap flag so that the UI will show any invalid overlaps
                updates.push({
                    index: prev.index,
                    sts: { ...prev.start, overlapsWithNext: sts.overlapsWithPrev },
                    kind: "start",
                })
            }

            if (next) {
                // If there is a next subtitle (i.e. the current subtitle is _not_ the last one)
                // then update it's overlap flag so that the UI will show any invalid overlaps
                updates.push({
                    index: next.index,
                    sts: { ...next.start, overlapsWithPrev: sts.overlapsWithNext },
                    kind: "start",
                })
            }
        } else {
            updates.push(
                // A change was made to the "end" timestamp, so update it
                { index: sub.index, sts, kind: "end" },
                // Also update the "start" timestamp's overlap value so that
                // if the new "end" time is invalid, it will be shown to the user.
                {
                    index: sub.index,
                    sts: { ...sub.start, overlapsWithSelf: sts.overlapsWithSelf },
                    kind: "start",
                },
            )
            // There is no further complex validation that needs to be checked for "end"
            // timestamps, since it's always okay for it to overlap with other timestamps
        }

        dispatch(updateSubtitleTimestamps(updates))
    }

    return (
        <div>
            <InsertSub onClick={prepend} />
            <SubtitleGridRow
                col1={{
                    node: (
                        <SelectSub
                            index={sub.index}
                            selected={props.selected}
                            onClick={select}
                        />
                    ),
                }}
                col2={{
                    node: (
                        <div className="grid grid-cols-1 justify-items-start content-start gap-1.5">
                            <CaptionTimestamp
                                sts={sub.start}
                                min={min}
                                max={max}
                                selfMax={selfMax}
                                onChange={ts => onTimestampChange(ts, "start")}
                            />
                            <CaptionTimestamp
                                sts={sub.end}
                                min={0}
                                max={Infinity}
                                selfMin={selfMin}
                                onChange={ts => onTimestampChange(ts, "end")}
                            />
                        </div>
                    ),
                }}
                col3={{
                    className: "w-full h-full block",
                    node: (
                        <Caption
                            caption={sub.caption}
                            onChange={updateCaption}
                            focus={focusCaption}
                            onFocused={onFocused}
                        />
                    ),
                }}
                col4={{
                    node: <RemoveSub onClick={remove} />,
                }}
            />
            {!next && <InsertSub onClick={append} />}
        </div>
    )
}
