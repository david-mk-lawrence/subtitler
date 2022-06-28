import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { createAlert } from "@/renderer/store/alerts"
import {
    getSubtitles,
    selectSubtitles,
    selectSelected,
    selectSubtitlesError,
    selectFocusedIndex,
    selectFilepath,
    clearFocusedIndex,
} from "@/renderer/store/subtitles"

import DragDropFile from "./DragDropFile"
import Subtitles from "./Subtitles"

export default function SubtitlesEditor(): JSX.Element {
    const dispatch = useDispatch()
    const subtitles = useSelector(selectSubtitles)
    const selected = useSelector(selectSelected)
    const subsError = useSelector(selectSubtitlesError)
    const filepath = useSelector(selectFilepath)
    const focusedIndex = useSelector(selectFocusedIndex)

    // retrieve the subtitles from the main process, if there are any
    useEffect(() => {
        dispatch(getSubtitles())
    }, [dispatch])

    // puts the filename in the application window's title bar
    useEffect(() => {
        if (filepath) {
            document.title = filepath
        }
    }, [filepath])

    // dispatch an alert if there was any error related to subtitles
    useEffect(() => {
        if (subsError) {
            dispatch(
                createAlert({
                    key: "subs-error",
                    type: "error",
                    message: subsError,
                    context: "subtitles",
                }),
            )
        }
    }, [subsError, dispatch])

    if (!subtitles || !selected) {
        return <DragDropFile />
    }

    const onFocused = () => {
        dispatch(clearFocusedIndex())
    }

    return (
        <Subtitles
            subs={subtitles}
            selected={selected}
            focusedIndex={focusedIndex}
            onFocused={onFocused}
        />
    )
}
