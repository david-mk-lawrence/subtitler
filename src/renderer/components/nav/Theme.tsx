import React from "react"
import { useTranslation } from "react-i18next"
import { SunIcon, MoonIcon } from "@heroicons/react/solid"

import { ActualTheme, THEME_DARK, THEME_LIGHT, SETTINGS_KEY_THEME } from "@/common"
import { useSetSetting } from "@/renderer/hooks"

import NavButton from "./NavButton"

interface ThemeProps {
    systemTheme: ActualTheme
    iconCls: string
}

export default function Theme(props: ThemeProps): JSX.Element {
    const setSetting = useSetSetting()
    const { t } = useTranslation("nav")

    const onToggleTheme = (theme: ActualTheme) => {
        setSetting(SETTINGS_KEY_THEME, theme)
    }

    return (
        <>
            {props.systemTheme === THEME_LIGHT && (
                <li>
                    <NavButton
                        title={t("theme.title")}
                        onClick={() => onToggleTheme(THEME_DARK)}
                        className="rounded-full"
                    >
                        <SunIcon className={props.iconCls} />
                    </NavButton>
                </li>
            )}
            {props.systemTheme === THEME_DARK && (
                <li>
                    <NavButton
                        title={t("theme.title")}
                        onClick={() => onToggleTheme(THEME_LIGHT)}
                        className="rounded-full"
                    >
                        <MoonIcon className={props.iconCls} />
                    </NavButton>
                </li>
            )}
        </>
    )
}
