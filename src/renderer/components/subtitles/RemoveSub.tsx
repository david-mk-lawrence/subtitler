import React from "react"
import { useTranslation } from "react-i18next"
import { XIcon } from "@heroicons/react/outline"

import Button from "@/renderer/components/layout/BackgroundButton"

export interface RemoveSubProps {
    onClick: () => void
}

export default function RemoveSub(props: RemoveSubProps): JSX.Element {
    const { t } = useTranslation("editor")
    const onClick = (_: React.MouseEvent<HTMLButtonElement>) => {
        props.onClick()
    }

    return (
        <Button
            className="p-1 rounded-full"
            title={t("remove.title")}
            onClick={onClick}
        >
            <XIcon className="h-6 w-6" />
        </Button>
    )
}
