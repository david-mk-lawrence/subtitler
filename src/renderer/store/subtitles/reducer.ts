import { combineReducers } from "redux"
import undoable, { includeAction } from "redux-undo"

import { tsAddMilliseconds, emptySubtitle } from "@/common"
import { SubtitlesState, SubsState, SubsMetaState, SubsUIState } from "./state"
import {
    SubtitlesActions,
    ADD_SUBTITLE,
    CLEAR_SUBTITLES_ERROR,
    CLEAR_SUBTITLE_HISTORY,
    CLEAR_FOCUSED_SUBTITLE,
    DELETE_SUBTITLES,
    RECEIVE_SUBTITLES,
    REDO_SUBTITLE,
    SELECT_SUBTITLES,
    SHIFT_SUBTITLES,
    SUBTITLES_ERROR,
    UNDO_SUBTITLE,
    UPDATE_SUBTITLE_CAPTION,
    UPDATE_SUBTITLE_TIMESTAMPS,
    DESELECT_SUBTITLES,
} from "./types"

const initSubsState: SubsState = {
    subtitles: undefined,
}

const subsReducer = (
    state: SubsState = initSubsState,
    action: SubtitlesActions,
): SubsState => {
    switch (action.type) {
        case RECEIVE_SUBTITLES:
            return {
                subtitles: action.payload.subs,
            }
        case SHIFT_SUBTITLES:
            let shifts = [...(state.subtitles || [])]
            for (const idx of action.payload.indexes) {
                shifts[idx] = {
                    ...shifts[idx],
                    start: {
                        ...shifts[idx].start,
                        ts: tsAddMilliseconds(shifts[idx].start.ts, action.payload.ms),
                    },
                    end: {
                        ...shifts[idx].end,
                        ts: tsAddMilliseconds(shifts[idx].end.ts, action.payload.ms),
                    },
                }
            }

            return {
                subtitles: shifts,
            }
        case ADD_SUBTITLE:
            let adds = [...(state.subtitles || [])]
            adds.splice(action.payload.index - 1, 0, action.payload)
            adds = adds.map((sub, idx) => ({
                ...sub,
                index: idx + 1,
            }))

            return {
                subtitles: adds,
            }
        case UPDATE_SUBTITLE_TIMESTAMPS:
            const tsUpdates = [...(state.subtitles || [])]
            for (const tsUpdate of action.payload) {
                tsUpdates[tsUpdate.index - 1] = {
                    ...tsUpdates[tsUpdate.index - 1],
                    [tsUpdate.kind]: tsUpdate.sts,
                }
            }

            return {
                subtitles: tsUpdates,
            }
        case UPDATE_SUBTITLE_CAPTION:
            const captionUpdates = [...(state.subtitles || [])]
            captionUpdates[action.payload.index - 1] = {
                ...captionUpdates[action.payload.index - 1],
                caption: action.payload.caption,
            }

            return {
                subtitles: captionUpdates,
            }
        case DELETE_SUBTITLES:
            const deletes = new Set(action.payload)
            const newSubs = state.subtitles
                // remove any index in the set
                ?.filter((_, idx) => !deletes.has(idx))
                // re-index everything remaining
                .map((sub, idx) => ({
                    ...sub,
                    index: idx + 1,
                }))
            if (newSubs === undefined) {
                // Shouldn't be able to encounter this, since a delete shouldn't
                // be dispatched if there aren't any subs in the first place.
                return {subtitles: newSubs}
            } else if (newSubs.length === 0) {
                // Always ensure there is at least an empty subtitle
                return {subtitles: [emptySubtitle()]}
            } else {
                return {subtitles: newSubs}
            }

        default:
            return state
    }
}

const initMetaState: SubsMetaState = {
    filepath: undefined,
    error: undefined,
    saved: true,
}

const subsMetaReducer = (
    state: SubsMetaState = initMetaState,
    action: SubtitlesActions,
): SubsMetaState => {
    switch (action.type) {
        case RECEIVE_SUBTITLES:
            return {
                ...state,
                filepath: action.payload.filepath,
                saved: true,
            }
        case SUBTITLES_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case CLEAR_SUBTITLES_ERROR:
            return {
                ...state,
                error: undefined,
            }
        case ADD_SUBTITLE:
        case SHIFT_SUBTITLES:
        case UPDATE_SUBTITLE_CAPTION:
        case UPDATE_SUBTITLE_TIMESTAMPS:
        case DELETE_SUBTITLES:
        case UNDO_SUBTITLE:
        case REDO_SUBTITLE:
            return {
                ...state,
                saved: false,
            }
        default:
            return state
    }
}

const initUIState: SubsUIState = {
    focusIndex: undefined,
    selected: undefined,
    lastSelected: undefined,
    lastSelectAction: undefined,
}

const subsUIReducer = (
    state: SubsUIState = initUIState,
    action: SubtitlesActions,
): SubsUIState => {
    switch (action.type) {
        case RECEIVE_SUBTITLES:
            return {
                ...state,
                selected: new Array(action.payload.subs.length).fill(false),
                lastSelected: undefined,
                lastSelectAction: undefined,
            }
        case ADD_SUBTITLE:
            const adds = [...(state.selected || [])]
            adds.splice(action.payload.index - 1, 0, false)

            let lastSelAdd = state.lastSelected
            if (lastSelAdd !== undefined && lastSelAdd >= action.payload.index - 1) {
                lastSelAdd += 1
            }

            return {
                ...state,
                focusIndex: action.payload.index - 1,
                selected: adds,
                lastSelected: lastSelAdd,
            }
        case DELETE_SUBTITLES:
            let lastSelDel = state.lastSelected
            let lastSelActionDel = state.lastSelectAction
            let selectedDel = state.selected
            if (action.payload.length === 1) {
                // since only one was reset, it was either by clicking a single
                // remove button, or a single removal from the tool.
                //
                // If from a remove button, then we can just remove this one and
                // without touching any others that are currently selected.
                //
                // If it was done from the multi-remove tool, then the selected
                // index will match this one, in which case the state can be reset.
                selectedDel = state.selected?.filter(
                    (_, idx) => idx !== action.payload[0],
                )
                if (lastSelDel !== undefined && lastSelDel > action.payload[0]) {
                    lastSelDel -= 1
                } else if (lastSelDel !== undefined && lastSelDel === action.payload[0]) {
                    lastSelDel = undefined
                    lastSelActionDel = undefined
                }
            } else {
                // if more than 1 are being deleted, then it was done by a multi-select,
                // in which case everything should be reset.
                lastSelDel = undefined
                lastSelActionDel = undefined
                selectedDel = selectedDel ? new Array(selectedDel.length).fill(false) : undefined
            }

            return {
                ...state,
                selected: selectedDel,
                lastSelected: lastSelDel,
                lastSelectAction: lastSelActionDel,
            }
        case SELECT_SUBTITLES:
            const sels = [...(state.selected || [])]
            for (const idx of action.payload) {
                sels[idx] = true
            }

            return {
                ...state,
                selected: sels,
                lastSelected:
                    action.payload.length > 0
                        ? action.payload[action.payload.length - 1]
                        : state.lastSelected,
                lastSelectAction:
                    action.payload.length > 0 ? "select" : state.lastSelectAction,
            }
        case DESELECT_SUBTITLES:
            const desels = [...(state.selected || [])]
            for (const idx of action.payload) {
                desels[idx] = false
            }

            return {
                ...state,
                selected: desels,
                lastSelected:
                    action.payload.length > 0
                        ? action.payload[action.payload.length - 1]
                        : state.lastSelected,
                lastSelectAction:
                    action.payload.length > 0 ? "deselect" : state.lastSelectAction,
            }
        case CLEAR_FOCUSED_SUBTITLE:
            return {
                ...state,
                focusIndex: undefined,
            }
        case UNDO_SUBTITLE:
        case REDO_SUBTITLE:
            return {
                ...state,
                selected: state.selected
                    ? new Array(state.selected.length).fill(false)
                    : undefined,
            }
        default:
            return state
    }
}

export const subtitlesReducer = combineReducers<SubtitlesState>({
    meta: subsMetaReducer,
    subs: undoable<SubsState, SubtitlesActions>(subsReducer, {
        filter: includeAction([
            ADD_SUBTITLE,
            SHIFT_SUBTITLES,
            UPDATE_SUBTITLE_CAPTION,
            UPDATE_SUBTITLE_TIMESTAMPS,
            DELETE_SUBTITLES,
        ]),
        undoType: UNDO_SUBTITLE,
        redoType: REDO_SUBTITLE,
        clearHistoryType: CLEAR_SUBTITLE_HISTORY,
    }),
    ui: subsUIReducer,
})
