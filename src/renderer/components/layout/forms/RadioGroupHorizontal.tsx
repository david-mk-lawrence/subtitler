import React from "react"

import { RadioGroup } from '@headlessui/react'

import RadioGroupOption from "./RadioGroupOption"

interface AppRadioGroupProps<T> {
    options: {
        val: T
        content: React.ReactNode | string
    }[]
    value: T
    onChange: ((val: React.SetStateAction<T>) => void) | ((val: T) => void )
}

export default function RadioGroupHorizontal<T>(props: AppRadioGroupProps<T>): JSX.Element {
    return (
        <RadioGroup value={props.value} onChange={props.onChange} className="flex justify-center items-center gap-3">
            {props.options.map((opt, idx) => <RadioGroupOption value={opt.val} key={idx}>{opt.content}</RadioGroupOption> )}
        </RadioGroup>
    )
}
