import React from "react"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"

import { Settings, SETTINGS_KEY_LOG_ENABLED } from "@/common"

import { useSetSetting } from "@/renderer/hooks"
import { resetSettings } from "@/renderer/store/settings"
import Button from "@/renderer/components/layout/Button"
import Checkbox from "@/renderer/components/layout/forms/Checkbox"
import SettingsPanels from "@/renderer/components/layout/SettingsPanels"
import SettingsPanel from "@/renderer/components/layout/SettingsPanel"
import SettingsInput from "@/renderer/components/layout/SettingsInput"
import SettingsDescription from "@/renderer/components/layout/SettingsDescription"

export interface AdvancedProps {
    settings: Settings
}

export default function Advanced(props: AdvancedProps): JSX.Element {
    const dispatch = useDispatch()
    const setSetting = useSetSetting()
    const { t } = useTranslation("settings")

    const onLoggingEnabledChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        setSetting(SETTINGS_KEY_LOG_ENABLED, event.target.checked)
    }

    const onResetClick = (_: React.MouseEvent<HTMLButtonElement>): void => {
        dispatch(resetSettings())
    }

    return (
        <SettingsPanels>
            <SettingsPanel>
                <SettingsInput>
                    <label className="cursor-pointer block">
                        <Checkbox
                            onChange={onLoggingEnabledChange}
                            checked={props.settings.advanced.logging.enabled}
                        />
                        {t("advanced.logging.title")}
                    </label>
                </SettingsInput>
                <SettingsDescription>
                    {t("advanced.logging.description", {
                        filepath: props.settings.advanced.logging.path,
                    })}
                </SettingsDescription>
            </SettingsPanel>
            <SettingsPanel>
                <SettingsInput>
                    <Button onClick={onResetClick}>{t("advanced.reset.button")}</Button>
                </SettingsInput>
                <SettingsDescription>
                    {t("advanced.reset.description")}
                </SettingsDescription>
            </SettingsPanel>
        </SettingsPanels>
    )
}
