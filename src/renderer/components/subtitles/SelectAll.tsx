import React from "react"
import { useDispatch } from "react-redux"

import { range } from "@/common"
import { selectSubs, deselectSubs } from "@/renderer/store/subtitles"
import Checkbox from "@/renderer/components/layout/forms/Checkbox"

interface SelectAllProps {
    selected: boolean[]
}

export default function SelectAll(props: SelectAllProps): JSX.Element {
    const { selected } = props
    const dispatch = useDispatch()

    // all our selected if the filtered equals the original
    const checked = selected.filter(s => s).length === selected.length

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            dispatch(selectSubs(range(0, selected.length - 1)))
        } else {
            dispatch(deselectSubs(range(0, selected.length - 1)))
        }
    }

    return <Checkbox checked={checked} onChange={onChange} />
}
