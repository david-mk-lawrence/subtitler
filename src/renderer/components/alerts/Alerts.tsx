import React, { lazy } from "react"
import { useSelector } from "react-redux"

import { selectAlerts } from "@/renderer/store/alerts"

const Alert = lazy(() => import("@/renderer/components/alerts/Alert"))

export default function Alerts(): JSX.Element {
    const alerts = useSelector(selectAlerts)

    if (Object.keys(alerts).length < 1) {
        return <></>
    }

    return (
        <>
            {Object.keys(alerts).map((key, idx) => (
                <Alert alert={alerts[key]} key={idx} />
            ))}
        </>
    )
}
