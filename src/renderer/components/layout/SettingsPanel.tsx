import React from "react"

import { HasChildren } from "@/renderer/components/types"

export default function SettingsPanel(props: HasChildren): JSX.Element {
    return (
        <div className="border-2 border-cl-500 dark:border-cd-500 rounded-lg p-3">
            {props.children}
        </div>
    )
}
