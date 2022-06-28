import { StateWithHistory } from "redux-undo"

import { Subtitle } from "@/common"

export interface SubsState {
    subtitles?: Subtitle[]
}

export interface SubsMetaState {
    filepath?: string
    saved: boolean
    error?: string
}

export interface SubsUIState {
    focusIndex?: number
    selected?: boolean[]
    lastSelected?: number
    lastSelectAction?: "select" | "deselect"
}

export interface SubtitlesState {
    subs: StateWithHistory<SubsState>
    meta: SubsMetaState
    ui: SubsUIState
}
