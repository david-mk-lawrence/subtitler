import React from "react"
import { useTranslation } from "react-i18next"

import { DocumentIcon, DocumentAddIcon } from "@heroicons/react/solid"

import { useDispatch } from "@/renderer/hooks"
import { openSubtitles, newSubtitles } from "@/renderer/store/subtitles"

import NavButton from "./NavButton"

interface FileMenuProps {
    iconCls: string
}

export default function FileMenu(props: FileMenuProps): JSX.Element {
    const dispatch = useDispatch()
    const { t } = useTranslation("nav")

    const onOpenFile = (_: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(openSubtitles())
    }

    const onNewFile = (_: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(newSubtitles())
    }

    return (
        <>
            <li>
                <NavButton title={t("open.title")} onClick={onOpenFile}>
                    <DocumentIcon className={props.iconCls} />
                </NavButton>
            </li>
            <li>
                <NavButton title={t("new.title")} onClick={onNewFile}>
                    <DocumentAddIcon className={props.iconCls} />
                </NavButton>
            </li>
        </>
    )
}
