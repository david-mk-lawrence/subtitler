import React from "react"

const defaultClass = `
    bg-bl-50
    dark:bg-bd-800
    p-0
    rounded-md
    outline-none
    focus:outline-none
    border-none
    focus:border-none
    shadow-none
    focus:shadow-none
    border-transparent
    focus:border-transparent
    ring-transparent
    focus:ring-transparent`

export default function TextInput(
    props: React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >,
): JSX.Element {
    /* eslint-disable react/prop-types */
    const { className = "", ...inputProps } = props
    return (
        <input
            {...inputProps}
            dir="auto"
            type="text"
            className={`${defaultClass}  ${className}`}
        />
    )
}
