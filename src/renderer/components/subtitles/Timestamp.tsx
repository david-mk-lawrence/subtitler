import React from "react"

import { Timestamp as TS } from "@/common"
import TimestampPart from "./TimestampPart"

interface TimestampProps {
    ts: TS
    onChange: (
        hours: number,
        minutes: number,
        seconds: number,
        milliseconds: number,
    ) => void
}

export default function Timestamp(props: TimestampProps): JSX.Element {
    return (
        <div dir="ltr">
            <TimestampPart
                val={props.ts.hours}
                min={0}
                max={99}
                digits={2}
                width="w-2ch"
                onChange={hours =>
                    props.onChange(
                        hours,
                        props.ts.minutes,
                        props.ts.seconds,
                        props.ts.milliseconds,
                    )
                }
            />
            :
            <TimestampPart
                val={props.ts.minutes}
                min={0}
                max={60}
                digits={2}
                width="w-2ch"
                onChange={minutes =>
                    props.onChange(
                        props.ts.hours,
                        minutes,
                        props.ts.seconds,
                        props.ts.milliseconds,
                    )
                }
            />
            :
            <TimestampPart
                val={props.ts.seconds}
                min={0}
                max={60}
                digits={2}
                width="w-2ch"
                onChange={seconds =>
                    props.onChange(
                        props.ts.hours,
                        props.ts.minutes,
                        seconds,
                        props.ts.milliseconds,
                    )
                }
            />
            ,
            <TimestampPart
                val={props.ts.milliseconds}
                min={0}
                max={999}
                digits={3}
                width="w-3ch"
                onChange={milliseconds =>
                    props.onChange(
                        props.ts.hours,
                        props.ts.minutes,
                        props.ts.seconds,
                        milliseconds,
                    )
                }
            />
        </div>
    )
}
