import React from "react"
import { useTranslation } from "react-i18next"

export interface InsertSubProps {
    onClick: () => void
}

export default function InsertSub(props: InsertSubProps): JSX.Element {
    const { t } = useTranslation("editor")
    const onClick = (_: React.MouseEvent<HTMLDivElement>) => {
        props.onClick()
    }

    return (
        <div
            title={t("insert.title")}
            onClick={onClick}
            className="
                grid
                grid-cols-12
                grid-rows-1
                h-7
                content-center
                items-center
                cursor-pointer

                hr-cl-300
                hover:hr-bl-400
                active:hr-bl-500

                dark:hr-bd-200
                dark:hover:hr-cd-50
                dark:active:hr-cd-200"
        >
            <div
                className="col-start-1 col-end-13 row-start-1 row-end-2"
            >
                <hr className="border-2" />
            </div>
        </div>
    )
}
