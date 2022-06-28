import React, { useMemo } from "react"

import { Settings } from "@/common"
import { getSystemTheme } from "@/renderer/lib"

import FilesMenu from "./FilesMenu"
import HistoryMenu from "./HistoryMenu"
import RoutesMenu from "./RoutesMenu"
import SaveMenu from "./SaveMenu"
import Theme from "./Theme"
import ToolsMenu from "./ToolsMenu"

import NavDivider from "./NavDivider"

const iconCls = "h-7 w-7 p-1"

interface NavbarProps {
    settings: Settings
    height: string
}

export default function Navbar(props: NavbarProps): JSX.Element {
    const systemTheme = useMemo(getSystemTheme, [props.settings.appearance.theme])

    return (
        <div
            className={
                "fixed w-full bg-bl-200 dark:bg-bd-900 text-tl-800 dark:text-td-300 " +
                props.height
            }
        >
            <nav className="flex flex-wrap justify-between items-center py-2">
                <ul className="flex flex-1 justify-start items-center pl-2 gap-1">
                    <FilesMenu iconCls={iconCls} />
                    <NavDivider />
                    <SaveMenu iconCls={iconCls} />
                    <NavDivider />
                    <HistoryMenu iconCls={iconCls} />
                    <NavDivider />
                    <ToolsMenu iconCls={iconCls} />
                </ul>
                <ul className="flex flex-1 justify-end items-center pr-2 gap-2">
                    <Theme systemTheme={systemTheme} iconCls={iconCls} />
                    <RoutesMenu iconCls={iconCls} />
                </ul>
            </nav>
        </div>
    )
}
