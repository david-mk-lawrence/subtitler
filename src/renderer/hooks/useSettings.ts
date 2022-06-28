import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Settings } from "@/common"
import { createAlert } from "@/renderer/store/alerts"
import {
    getSettings,
    selectSettings,
    selectSettingsError,
} from "@/renderer/store/settings"

// Handles retrieving the settings from the main process and returning them back.
// Also dispatches any alerts in case of errors while getting settings.
export const useSettings = (): [Settings | undefined, string | undefined] => {
    const dispatch = useDispatch()
    const settings = useSelector(selectSettings)
    const settingsError = useSelector(selectSettingsError)

    useEffect(() => {
        if (!settings && !settingsError) {
            dispatch(getSettings())
        }
    }, [settings, settingsError, dispatch])

    useEffect(() => {
        if (settingsError) {
            dispatch(
                createAlert({
                    key: "settings-error",
                    type: "warning",
                    message: settingsError,
                    context: "settings",
                }),
            )
        }
    }, [settingsError, dispatch])

    return [settings, settingsError]
}
