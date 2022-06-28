import React, { lazy } from "react"
import { Route, Routes } from "react-router-dom"

import { Settings, ROUTES, routeToPath } from "@/common"

const Advanced = lazy(() => import("@/renderer/components/settings/Advanced"))
const Appearance = lazy(() => import("@/renderer/components/settings/Appearance"))
const I18n = lazy(() => import("@/renderer/components/settings/I18n"))
const NotFound = lazy(() => import("@/renderer/components/layout/NotFound"))
const SettingsContainer = lazy(() => import("@/renderer/components/settings/Settings"))
import SubtitlesEditor from "@/renderer/components/subtitles/SubtitlesEditor"

interface AppRoutesProps {
    settings: Settings
}

export default function AppRoutes(props: AppRoutesProps) {
    const { settings } = props

    return (
        <Routes>
            <Route index={true} element={<SubtitlesEditor />} />
            <Route path={routeToPath(ROUTES.home)} element={<SubtitlesEditor />} />
            <Route path={routeToPath(ROUTES.settings)} element={<SettingsContainer />}>
                <Route index={true} element={<Appearance settings={settings} />} />
                <Route path="appearance" element={<Appearance settings={settings} />} />
                <Route path="advanced" element={<Advanced settings={settings} />} />
                <Route path="i18n" element={<I18n settings={settings} />} />
                <Route element={<NotFound />} />
            </Route>
            <Route element={<NotFound />} />
        </Routes>
    )
}
