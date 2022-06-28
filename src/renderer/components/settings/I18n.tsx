import React from "react"
import { useTranslation } from "react-i18next"

import {
    Settings,
    SETTINGS_KEY_I18N_DIR,
    LTR,
    RTL,
    SETTINGS_KEY_I18N_LOCALE,
} from "@/common"

import { useSetSetting } from "@/renderer/hooks"
import Radio from "@/renderer/components/layout/forms/Radio"
import Select from "@/renderer/components/layout/forms/Select"
import SettingsPanels from "@/renderer/components/layout/SettingsPanels"
import SettingsPanel from "@/renderer/components/layout/SettingsPanel"
import SettingsInput from "@/renderer/components/layout/SettingsInput"
import SettingsDescription from "@/renderer/components/layout/SettingsDescription"

export interface I18nProps {
    settings: Settings
}

export default function I18n(props: I18nProps): JSX.Element {
    const { locale } = props.settings.i18n
    const setSetting = useSetSetting()
    const { t, i18n } = useTranslation("settings")

    const onDirectionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSetting(SETTINGS_KEY_I18N_DIR, event.target.value)
    }

    const onLangChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setSetting(SETTINGS_KEY_I18N_LOCALE, event.target.value)
    }

    return (
        <SettingsPanels>
            <SettingsPanel>
                <SettingsInput>
                    <label className="cursor-pointer block">
                        <Radio
                            onChange={onDirectionChange}
                            value={LTR}
                            checked={props.settings.i18n.dir === LTR}
                        />
                        {t("i18n.direction.leftToRight")}
                    </label>
                    <label className="cursor-pointer block">
                        <Radio
                            onChange={onDirectionChange}
                            value={RTL}
                            checked={props.settings.i18n.dir === RTL}
                        />
                        {t("i18n.direction.rightToLeft")}
                    </label>
                </SettingsInput>
                <SettingsDescription>
                    {t("i18n.direction.description")}
                </SettingsDescription>
            </SettingsPanel>
            <SettingsPanel>
                <SettingsInput>
                    <label>
                        <Select onChange={onLangChange} value={locale}>
                            {i18n.languages.map((lang, key) => (
                                <option value={lang} key={key}>
                                    {lang}
                                </option>
                            ))}
                        </Select>
                        {t("i18n.lang.title")}
                    </label>
                </SettingsInput>
                <SettingsDescription>{t("i18n.lang.description")}</SettingsDescription>
                <SettingsDescription>
                    <strong>{t("i18n.lang.warning")}</strong>
                </SettingsDescription>
            </SettingsPanel>
        </SettingsPanels>
    )
}
