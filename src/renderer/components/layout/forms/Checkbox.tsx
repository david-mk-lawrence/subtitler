import React from "react"

export default function Checkbox(
    props: React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >,
): JSX.Element {
    return (
        <input
            {...props}
            type="checkbox"
            className="
                h-4 w-4
                border
                mx-2"
        />
    )
}
