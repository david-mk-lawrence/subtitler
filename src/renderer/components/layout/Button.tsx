import React from "react"

import { HasChildren } from "@/renderer/components/types"

const defaultClass = `
    rounded-xl
    py-1
    px-3
    bg-pl-700
    bg-opacity-75
    hover:bg-opacity-75
    active:bg-opacity-75
    text-tl-50
    hover:bg-pl-800
    active:bg-pl-900
    disabled:bg-pl-300
    disabled:hover:bg-pl-300

    dark:text-td-50
    dark:bg-pd-700
    dark:hover:bg-pd-800
    dark:active:bg-pd-900
    dark:disabled:bg-pd-400
    dark:disabled:hover:bg-pd-400`

export default function Button(
    props: React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > &
        HasChildren,
): JSX.Element {
    /* eslint-disable react/prop-types */
    return (
        <button {...props} className={`${defaultClass}  ${props.className}`}>
            {props.children}
        </button>
    )
}
