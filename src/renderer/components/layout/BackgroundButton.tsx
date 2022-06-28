import React from "react"

import { HasChildren } from "@/renderer/components/types"

const defaultClass = `
    hover:bg-bl-300
    dark:hover:bg-bd-600
    active:bg-bl-400
    dark:active:bg-bd-700`

export default function BackgroundButton(
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
