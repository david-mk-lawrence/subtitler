import React, { useEffect, useState } from "react"

import { padNum } from "@/common"

import NumberInput from "@/renderer/components/layout/forms/NumberInput"

const defaultClassName = ""
const errClassName =
    "ring-1 ring-red-600 focus:ring-red-600 dark:ring-red-600 dark:focus:ring-red-600"

interface TimestampPartProps {
    val: number
    digits: number
    width: string
    min: number
    max: number
    onChange: (newVal: number) => void
}

export default function TimestampPart(props: TimestampPartProps): JSX.Element {
    const { val, min, max, onChange, width, digits } = props
    const [strVal, setStrVal] = useState<string>(padNum(val, digits))
    const [cls, setCls] = useState<string>(defaultClassName)

    useEffect(() => {
        setStrVal(padNum(val, digits))
    }, [val])

    const onValChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > digits) {
            return
        }
        setStrVal(event.target.value)
        const intVal = parseInt(event.target.value)
        if (isNaN(intVal) || intVal < min || intVal > max) {
            setCls(errClassName)
        } else {
            setCls(defaultClassName)
        }
    }

    const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        const intVal = parseInt(event.target.value)
        if (!(isNaN(intVal) || intVal < min || intVal > max)) {
            onChange(intVal)
            setStrVal(padNum(intVal, digits))
        }
    }

    return (
        <NumberInput
            className={width + " " + cls}
            onChange={onValChange}
            onBlur={onBlur}
            value={strVal}
            min={min}
            max={max}
        />
    )
}
