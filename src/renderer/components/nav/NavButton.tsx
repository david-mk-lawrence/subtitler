import React from "react"

import { HasChildren } from "@/renderer/components/types"

type NavButtonProps = HasChildren &
    React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >

const defaultClass = `
    block
    disabled:opacity-50
    bg-bl-300
    dark:bg-bd-600
    hover:bg-bl-400
    dark:hover:bg-bd-700
    disabled:hover:bg-bl-300
    dark:disabled:hover:bg-bd-600
`

export default function NavButton(props: NavButtonProps): JSX.Element {
    const { children, className = "", ...buttonProps } = props
    return (
        <button {...buttonProps} className={`${defaultClass}  ${className}`}>
            {children}
        </button>
    )
}
