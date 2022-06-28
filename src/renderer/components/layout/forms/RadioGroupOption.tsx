import React from "react"

import { RadioGroup } from '@headlessui/react'
import { HasChildren } from "@/renderer/components/types";

interface AppRadioGroupOptionProps<T> {
    value: T
    className?: string
}

export default function RadioGroupOption<T>(props: AppRadioGroupOptionProps<T> & HasChildren): JSX.Element {
    return (
        <RadioGroup.Option value={props.value} className={({active, checked}) =>
            `${
                active ? 'ring-2 ring-pl-300 dark:ring-pd-300 ring-opacity-60' : ''
            }
            ${
                checked ? 'bg-pl-700 text-tl-50 dark:bg-pd-700 dark:text-td-50 bg-opacity-75' : 'bg-pl-100 dark:bg-bd-400'
            }
                relative flex-initial cursor-pointer rounded-lg p-2 shadow-md dark:shadow-lg focus:outline-none ${props.className || ""}`
            }>
                <RadioGroup.Label as="p">{props.children}</RadioGroup.Label>
        </RadioGroup.Option>
    )
}
