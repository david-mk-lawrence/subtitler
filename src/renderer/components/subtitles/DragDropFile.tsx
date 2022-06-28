import React from "react"
import { useTranslation } from "react-i18next"
import { UploadIcon } from "@heroicons/react/solid"

import { useDispatch } from "@/renderer/hooks"
import { openSubtitles } from "@/renderer/store/subtitles"

// The drag/drop area is actually always present and files can
// be dropped at any time, so this is really just some styling
// to guide a user to drop a file.
export default function DragDropFile(): JSX.Element {
    const dispatch = useDispatch()
    const { t } = useTranslation("editor")

    const onOpenFile = (_: React.MouseEvent<HTMLDivElement>) => {
        dispatch(openSubtitles())
    }

    return (
        <div
            onClick={onOpenFile}
            className="h-screen-center
                block
                m-9
                cursor-pointer
                grid
                justify-center
                justify-items-center
                content-center
                text-center
                rounded-md
                border-2
                border-dashed
                bg-bl-200
                dark:bg-bd-700
                border-cl-400
                dark:border-cd-50
                "
        >
            <p className="my-2">
                <UploadIcon className="h-8 w-8" />
            </p>
            <p>{t("dragDrop.description")}</p>
        </div>
    )
}
