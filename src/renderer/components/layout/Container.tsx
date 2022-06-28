import React from "react"

import { HasChildren } from "@/renderer/components/types"

const defaultClass = `
    container
    mx-auto`

export default function Button(
    props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > &
        HasChildren,
): JSX.Element {
    /* eslint-disable react/prop-types */
    return <div className={defaultClass}>{props.children}</div>
}
