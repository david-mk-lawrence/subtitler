import React from "react"
import { useLocation, Outlet } from "react-router"
import { useTranslation } from "react-i18next"

import { ROUTES, routeToPath } from "@/common"

import TabLink from "@/renderer/components/layout/TabLink"

export default function Settings(): JSX.Element {
    const loc = useLocation()
    const { t } = useTranslation("settings")

    return (
        <>
            <div className="flex mt-4">
                <TabLink
                    to="appearance"
                    isActive={
                        loc.pathname.includes("appearance") ||
                        loc.pathname === routeToPath(ROUTES.settings)
                    }
                >
                    {t("tabs.appearance")}
                </TabLink>
                <TabLink to="advanced" isActive={loc.pathname.includes("advanced")}>
                    {t("tabs.advanced")}
                </TabLink>
                <TabLink to="i18n" isActive={loc.pathname.includes("i18n")}>
                    {t("tabs.i18n")}
                </TabLink>
                <div className="flex-grow border-b-2 border-bl-400 dark:border-bd-400">
                    {" "}
                </div>
            </div>
            <Outlet />
        </>
    )
}
