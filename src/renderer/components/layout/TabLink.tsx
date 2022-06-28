import React from "react"
import { NavLink, NavLinkProps } from "react-router-dom"

type TabLinkProps = NavLinkProps & {
    isActive: boolean
}

const inactive ="border-bl-500 dark:border-bd-400 hover:bg-bl-200 dark:hover:bg-bd-600"
const active = "border-2 border-b-0 rounded-t-md border-bl-500 dark:border-bd-400 hover:bg-bl-50 dark:hover:bg-bd-800"

export default function TabLink(props: TabLinkProps): JSX.Element {
    const { isActive, children, ...linkProps } = props
    const cls = isActive ? active : inactive

    return <NavLink {...linkProps} className={"flex-initial border-b-2 p-3 " + cls}>{children}</NavLink>
}
