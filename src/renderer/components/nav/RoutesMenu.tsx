import React from "react"
import { useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { CogIcon, PencilAltIcon } from "@heroicons/react/solid"

import { ROUTES, routeToPath } from "@/common"

import NavLink from "./NavLink"

interface RoutesMenuProps {
    iconCls: string
}

export default function RoutesMenu(props: RoutesMenuProps): JSX.Element {
    const loc = useLocation()
    const { t } = useTranslation("nav")

    return (
        <>
            <li>
                <NavLink
                    to={routeToPath(ROUTES.home)}
                    title={t("editor.title")}
                    currentLocation={loc.pathname}
                >
                    <PencilAltIcon className={props.iconCls} />
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={routeToPath(ROUTES.settings)}
                    title={t("preferences.title")}
                    currentLocation={loc.pathname}
                >
                    <CogIcon className={props.iconCls} />
                </NavLink>
            </li>
        </>
    )
}
