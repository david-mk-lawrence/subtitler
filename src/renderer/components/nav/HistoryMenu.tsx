import React from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

import { RewindIcon, FastForwardIcon } from "@heroicons/react/solid"

import { useDispatch } from "@/renderer/hooks"
import {
    undoSubtitle,
    redoSubtitle,
    selectHasPastSubs,
    selectHasFutureSubs,
} from "@/renderer/store/subtitles"

import NavButton from "./NavButton"

interface HistoryMenuProps {
    iconCls: string
}

export default function HistoryMenu(props: HistoryMenuProps): JSX.Element {
    const dispatch = useDispatch()
    const { t } = useTranslation("nav")

    const hasPast = useSelector(selectHasPastSubs)
    const hasFuture = useSelector(selectHasFutureSubs)

    const onUndo = (_: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(undoSubtitle())
    }

    const onRedo = (_: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(redoSubtitle())
    }

    return (
        <>
            <li>
                <NavButton disabled={!hasPast} title={t("undo.title")} onClick={onUndo}>
                    <RewindIcon className={props.iconCls + " rtl:rotate-180"} />
                </NavButton>
            </li>
            <li>
                <NavButton
                    disabled={!hasFuture}
                    title={t("redo.title")}
                    onClick={onRedo}
                >
                    <FastForwardIcon className={props.iconCls + " rtl:rotate-180"} />
                </NavButton>
            </li>
        </>
    )
}
