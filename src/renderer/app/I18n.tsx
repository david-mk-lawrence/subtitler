import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"

import { Settings } from "@/common"
import { HasChildren } from "@/renderer/components/types"

interface I18nProps {
    settings: Settings
}

export default function I18n(props: I18nProps & HasChildren): JSX.Element {
    const { settings } = props
    const { i18n } = useTranslation()

    useEffect(() => {
        if (i18n.language !== settings.i18n.locale) {
            i18n.changeLanguage(settings.i18n.locale)
        }
    }, [settings, i18n])

    return <div dir={settings.i18n.dir}>{props.children}</div>
}
