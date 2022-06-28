import React from "react"
import { useTranslation } from "react-i18next"

import { useDispatch } from "@/renderer/hooks"
import { HasChildren } from "@/renderer/components/types"

import { createAlert } from "@/renderer/store/alerts"
import { openSubtitles } from "@/renderer/store/subtitles"

export default function DropFile(props: HasChildren): JSX.Element {
    const dispatch = useDispatch()
    const { t } = useTranslation("editor")

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
    }

    const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
    }

    const onFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()

        if (event.dataTransfer.files.length !== 1) {
            dispatch(
                createAlert({
                    key: "open-file-error",
                    type: "error",
                    message: t("dragDrop.multipleFileError"),
                }),
            )
        } else {
            dispatch(openSubtitles(event.dataTransfer.files[0].path))
        }
    }

    return (
        <div onDrop={onFileDrop} onDragOver={onDragOver} onDragEnter={onDragEnter}>
            {props.children}
        </div>
    )
}
