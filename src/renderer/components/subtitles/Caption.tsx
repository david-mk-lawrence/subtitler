import React, { useEffect, useState, useMemo, useRef } from "react"
import { debounce } from "lodash"

import { asLines, asText } from "@/common"
import TextArea from "@/renderer/components/layout/forms/TextAreaWithRef"

interface CaptionProps {
    caption: string[]
    onChange: (newCaption: string[]) => void
    onFocused: () => void
    focus: boolean
}

export default function Caption(props: CaptionProps): JSX.Element {
    const { caption, onChange, focus, onFocused } = props

    // caption is stored in local state so that changes can be debounced.
    // This reduces the number of hostiry items that get added to the redux state.
    // Otherwise, each "undo"/"redo" would only go back a single character.
    const [cap, setCap] = useState<string>(asText(caption))
    // Storing the rows of the textarea in state allows the textarea to
    // automatically shrink and grow as newlines are added.
    const [rows, setRows] = useState<number>(caption.length)

    const ref = useRef<HTMLTextAreaElement>(null)

    // Immediately reset the state when the props change.
    // This forces react to re-render.
    useEffect(() => {
        setCap(asText(caption))
        setRows(caption.length)
    }, [caption, setCap, setRows])

    useEffect(() => {
        if (ref.current && focus) {
            ref.current.focus()
            onFocused()
        }
    }, [ref, focus, onFocused])

    // Debounced onChange
    const onChangeD = useMemo(() => debounce(onChange, 500), [onChange])

    // When the component is taken down, make sure that any pending
    // debounces are cancelled.
    useEffect(
        () => () => {
            onChangeD.cancel()
        },
        [onChangeD],
    )

    // Update state and call the debounced onChange
    const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCap(event.target.value)
        const lines = asLines(event.target.value)
        setRows(lines.length)
        onChangeD(lines)
    }

    return <TextArea ref={ref} rows={rows} value={cap} onChange={onTextChange} />
}
