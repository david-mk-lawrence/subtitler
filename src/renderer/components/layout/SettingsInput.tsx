import React from "react"

import { HasChildren } from "@/renderer/components/types"

export default function SettingsInput(props: HasChildren): JSX.Element {
    return (
        <div className="border-b-2 border-cl-500 dark:border-cd-500 mb-1 pb-2">
            {props.children}
        </div>
    )
}
