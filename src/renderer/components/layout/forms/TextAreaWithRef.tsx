import React from "react"

const clsName = `
    bg-bl-50
    dark:bg-bd-800
    p-0
    w-full
    h-full
    rounded-md
    resize-none
    overflow-visible
    outline-none
    focus:outline-none
    border-none
    focus:border-none
    shadow-none
    focus:shadow-none
    border-transparent
    focus:border-transparent
    ring-transparent
    focus:ring-transparent
`

const TextAreaWithRef = React.forwardRef(
    (
        props: React.DetailedHTMLProps<
            React.TextareaHTMLAttributes<HTMLTextAreaElement>,
            HTMLTextAreaElement
        >,
        ref: React.ForwardedRef<HTMLTextAreaElement>,
    ): JSX.Element => <textarea ref={ref} dir="auto" {...props} className={clsName} />,
)

TextAreaWithRef.displayName = "TextAreaWithRef"

export default TextAreaWithRef
