import React from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

import { SaveIcon, SaveAsIcon } from "@heroicons/react/solid"

import { useDispatch } from "@/renderer/hooks"
import { saveSubtitles, saveSubtitlesAs } from "@/renderer/store/subtitles"
import { selectSaved, selectSubtitlesLoaded } from "@/renderer/store/subtitles"

import NavButton from "./NavButton"

interface SaveMenuProps {
    iconCls: string
}

export default function SaveMenu(props: SaveMenuProps): JSX.Element {
    const dispatch = useDispatch()
    const { t } = useTranslation("nav")
    const saved = useSelector(selectSaved)
    const subtitlesLoaded = useSelector(selectSubtitlesLoaded)

    const onSave = (_: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(saveSubtitles())
    }

    const onSaveAs = (_: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(saveSubtitlesAs())
    }

    return (
        <>
            <li>
                <NavButton disabled={saved} title={t("save.title")} onClick={onSave}>
                    <SaveIcon className={props.iconCls} />
                </NavButton>
            </li>
            <li>
                <NavButton
                    disabled={!subtitlesLoaded}
                    title={t("saveAs.title")}
                    onClick={onSaveAs}
                >
                    <SaveAsIcon className={props.iconCls} />
                </NavButton>
            </li>
        </>
    )
}
