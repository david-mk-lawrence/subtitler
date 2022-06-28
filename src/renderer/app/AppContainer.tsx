import React, { Suspense } from "react"

import Alerts from "@/renderer/components/alerts/Alerts"
import Container from "@/renderer/components/layout/Container"
import Navbar from "@/renderer/components/nav/Navbar"
import Loading from "@/renderer/components/layout/Loading"
import { useNavigationRedirects, useSettings } from "@/renderer/hooks"

import AppRoutes from "./AppRoutes"
import DropFile from "./DropFile"
import I18n from "./I18n"
import Keyboard from "./Keyboard"

const navHeight = "h-11"

export default function AppContainer(): JSX.Element {
    const [settings, settingsError] = useSettings()
    useNavigationRedirects()

    if (!settings) {
        return <Loading />
    }

    return (
        <Suspense fallback={<Loading />}>
            <I18n settings={settings}>
                <Keyboard>
                    <Navbar settings={settings} height={navHeight} />
                    <div className={navHeight}>
                        {/* Pushes the rest of the content down to account for the fixed navbar */}
                    </div>
                    <DropFile>
                        <Container>
                            <Alerts />
                            {!settingsError && <AppRoutes settings={settings} />}
                        </Container>
                    </DropFile>
                </Keyboard>
            </I18n>
        </Suspense>
    )
}
