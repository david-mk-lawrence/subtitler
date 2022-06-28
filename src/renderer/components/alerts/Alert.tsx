import React from "react"
import { useDispatch } from "react-redux"
import { XIcon } from "@heroicons/react/outline"

import { createClearAlertAction } from "@/renderer/lib/alerts"
import { clearAlert, Alert as AlertObject } from "@/renderer/store/alerts"

interface AlertProps {
    alert: AlertObject
}

export default function Alert(props: AlertProps): JSX.Element {
    const { alert } = props

    const dispatch = useDispatch()

    const onCloseClick = (): void => {
        dispatch(clearAlert(alert))
        if (alert.context) {
            dispatch(createClearAlertAction(alert.context))
        }
    }

    return (
        <div
            className={
                "flex justify-between alert dark:alert-d rounded-md m-3 " + alert.type
            }
        >
            <p className="p-3">{alert.message}</p>
            <button type="button" className="p-3 rounded-r-md" onClick={onCloseClick}>
                <XIcon className="h-5 w-5" />
            </button>
        </div>
    )
}
