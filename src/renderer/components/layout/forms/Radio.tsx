import React from "react"

export default function Radio(
    props: React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >,
): JSX.Element {
    return (
        <input
            {...props}
            type="radio"
            className="
                h-4 w-4
                border
                mx-2"
        />
    )
}
