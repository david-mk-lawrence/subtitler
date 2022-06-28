import { Subtitle, SubtitleTimestamp } from "@/common"
import { Selector } from "@/renderer/store/state"

export const selectNumSubtitles: Selector<number> = state =>
    state.subtitles.subs.present.subtitles?.length || 0

export const selectSubtitles: Selector<Subtitle[] | undefined> = state =>
    state.subtitles.subs.present.subtitles

export const selectSubtitlesLoaded: Selector<boolean> = state =>
    !!state.subtitles.subs.present.subtitles

export const selectFilepath: Selector<string | undefined> = state =>
    state.subtitles.meta.filepath

export const selectSaved: Selector<boolean> = state => state.subtitles.meta.saved

export const selectSubtitlesError: Selector<string | undefined> = state =>
    state.subtitles.meta.error

export const selectHasPastSubs: Selector<boolean> = state =>
    state.subtitles.subs.past.length > 0

export const selectHasFutureSubs: Selector<boolean> = state =>
    state.subtitles.subs.future.length > 0

export const selectHasSubs: Selector<boolean> = state =>
    state.subtitles.subs.present !== undefined &&
    state.subtitles.subs.present.subtitles !== undefined &&
    state.subtitles.subs.present.subtitles.length > 0

export const selectFocusedIndex: Selector<number | undefined> = state =>
    state.subtitles.ui.focusIndex

export const selectFirstTimestamp: Selector<SubtitleTimestamp | undefined> = state => {
    if (
        !state.subtitles.subs.present.subtitles ||
        state.subtitles.subs.present.subtitles.length === 0
    ) {
        return
    }

    return state.subtitles.subs.present.subtitles[0].start
}

export const selectHasSelected: Selector<boolean> = state =>
    state.subtitles.ui.selected !== undefined && state.subtitles.ui.selected.length > 0

export const selectSelected: Selector<boolean[] | undefined> = state =>
    state.subtitles.ui.selected

export const selectSelectedIndexes: Selector<number[]> = state => {
    if (!state.subtitles.ui.selected) {
        return []
    }
    return state.subtitles.ui.selected.map((val, idx) => val ? idx : -1).filter(idx => idx > -1)
}

export const selectLastSelected: Selector<
    { lastSelectedAction: "select" | "deselect"; lastSelected: number } | undefined
> = state =>
    state.subtitles.ui.lastSelectAction && state.subtitles.ui.lastSelected !== undefined
        ? {
              lastSelectedAction: state.subtitles.ui.lastSelectAction,
              lastSelected: state.subtitles.ui.lastSelected,
          }
        : undefined
