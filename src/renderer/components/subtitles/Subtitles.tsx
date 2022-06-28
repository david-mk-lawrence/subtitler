import React from "react"
import { useTranslation } from "react-i18next"

import { Subtitle } from "@/common"

import Sub from "./Subtitle"
import SubtitleGridRow from "./SubtitleGridRow"
import SelectAll from "./SelectAll"

export interface SubtitleEditorProps {
    subs: Subtitle[]
    selected: boolean[]
    focusedIndex?: number
    onFocused: () => void
}

export default function Subtitles(props: SubtitleEditorProps): JSX.Element {
    const { t } = useTranslation("editor")

    return (
        <div className="mt-5 mb-screen-70">
            <SubtitleGridRow
                col1={{ node: <SelectAll selected={props.selected} /> }}
                col2={{ node: t("columns.ts") }}
                col3={{ node: t("columns.caption") }}
                col4={{ node: t("columns.remove") }}
            />
            <div className="grid grid-cols-1">
                {props.subs.map((sub, idx) => (
                    <Sub
                        prev={props.subs[idx - 1]}
                        sub={sub}
                        next={props.subs[idx + 1]}
                        key={idx}
                        focusCaption={idx === props.focusedIndex}
                        onFocused={props.onFocused}
                        selected={props.selected[idx]}
                    />
                ))}
            </div>
        </div>
    )
}
