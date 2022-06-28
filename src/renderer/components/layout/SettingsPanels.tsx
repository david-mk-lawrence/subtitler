import React from "react"

import { HasChildren } from "@/renderer/components/types"

export default function SettingsPanels(props: HasChildren): JSX.Element {
    return <div className="grid grid-cols-1 m-4 gap-4">{props.children}</div>
}
