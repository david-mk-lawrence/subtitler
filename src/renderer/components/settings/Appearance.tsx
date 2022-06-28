import React from "react"
import { useTranslation } from "react-i18next"

import {
    Settings,
    THEME_SYSTEM,
    THEME_LIGHT,
    THEME_DARK,
    SETTINGS_KEY_THEME,
} from "@/common/settings"
import { useSetSetting } from "@/renderer/hooks"

import Radio from "@/renderer/components/layout/forms/Radio"
import SettingsPanels from "@/renderer/components/layout/SettingsPanels"
import SettingsPanel from "@/renderer/components/layout/SettingsPanel"
import SettingsInput from "@/renderer/components/layout/SettingsInput"
import SettingsDescription from "@/renderer/components/layout/SettingsDescription"

export interface AppearanceProps {
    settings: Settings
}

export default function Appearance(props: AppearanceProps): JSX.Element {
    const currentTheme = props.settings.appearance.theme
    const setSetting = useSetSetting()
    const { t } = useTranslation("settings")

    const onThemeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSetting(SETTINGS_KEY_THEME, event.target.value)
    }

    return (
        <SettingsPanels>
            <SettingsPanel>
                <SettingsInput>
                    <label className="cursor-pointer block">
                        <Radio
                            onChange={onThemeChange}
                            value={THEME_SYSTEM}
                            checked={currentTheme === THEME_SYSTEM}
                        />
                        {t("appearance.theme.system")}
                    </label>
                    <label className="cursor-pointer block">
                        <Radio
                            onChange={onThemeChange}
                            value={THEME_LIGHT}
                            checked={currentTheme === THEME_LIGHT}
                        />
                        {t("appearance.theme.light")}
                    </label>
                    <label className="cursor-pointer block">
                        <Radio
                            onChange={onThemeChange}
                            value={THEME_DARK}
                            checked={currentTheme === THEME_DARK}
                        />
                        {t("appearance.theme.dark")}
                    </label>
                </SettingsInput>
                <SettingsDescription>
                    {t("appearance.theme.description")}
                </SettingsDescription>
            </SettingsPanel>
        </SettingsPanels>
    )
}
