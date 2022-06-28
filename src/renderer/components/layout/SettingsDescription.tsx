import React from "react"

import { HasChildren } from "@/renderer/components/types"

export default function SettingsDescription(props: HasChildren): JSX.Element {
    return <p className="p-1">{props.children}</p>
}
