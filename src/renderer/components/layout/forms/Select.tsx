import React from "react"

import { HasChildren } from "@/renderer/components/types"

const defaultClass = `
    bg-bl-50
    dark:bg-bd-800
    rounded-md
    mx-2 my-0.5
    focus:border-bl-50
    outline-pl-500
    focus:outline-pl-500
    focus:ring-bl-50
    dark:focus:border-bd-800
    dark:outline-pd-500
    dark:focus:outline-pd-500
    dark:focus:ring-bd-800`

export default function Radio(
    props: React.DetailedHTMLProps<
        React.SelectHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
    > &
        HasChildren,
): JSX.Element {
    const { className = "", ...selectProps } = props
    return (
        <select {...selectProps} className={`${defaultClass}  ${className}`}>
            {props.children}
        </select>
    )
}
