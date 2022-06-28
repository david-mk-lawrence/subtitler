import {
    Subtitles,
    SubtitleTimestamp,
    GET_SUBTITLES_CHANNEL,
    OPEN_SUBTITLES_CHANNEL,
    NEW_SUBTITLES_CHANNEL,
    SET_SUBTITLES_CHANNEL,
    SAVE_SUBTITLES_CHANNEL,
    SAVE_AS_SUBTITLES_CHANNEL,
} from "@/common"
import { createIpcInvokeAction, IpcAction } from "@/renderer/lib/ipc"
import {
    IpcListener,
    IpcErrorHandler,
    ThunkAction,
    ThunkDispatch,
    StateGetter,
} from "@/renderer/store"
import {
    SubtitlesErrorAction,
    TimestampUpdate,
    ClearFocusedSubtitleAction,
    ADD_SUBTITLE,
    CLEAR_SUBTITLES_ERROR,
    CLEAR_SUBTITLE_HISTORY,
    CLEAR_FOCUSED_SUBTITLE,
    DELETE_SUBTITLES,
    RECEIVE_SUBTITLES,
    REDO_SUBTITLE,
    SUBTITLES_ERROR,
    UPDATE_SUBTITLE_CAPTION,
    UPDATE_SUBTITLE_TIMESTAMPS,
    UNDO_SUBTITLE,
    SHIFT_SUBTITLES,
    SelectSubtitlesAction,
    SELECT_SUBTITLES,
    DeselectSubtitlesAction,
    DESELECT_SUBTITLES,
} from "./types"

export const receiveSubtitles: IpcListener =
    (subs: Subtitles | undefined) => (dispatch, getState) => {
        const currentFile = getState().subtitles.meta.filepath
        if (subs) {
            dispatch({ type: RECEIVE_SUBTITLES, payload: subs })
            if (currentFile !== subs.filepath) {
                dispatch({ type: CLEAR_SUBTITLE_HISTORY })
            }
        }
    }

export const getSubtitles = (): IpcAction =>
    createIpcInvokeAction(GET_SUBTITLES_CHANNEL)

export const saveSubtitles = (): IpcAction =>
    createIpcInvokeAction(SAVE_SUBTITLES_CHANNEL)

export const saveSubtitlesAs = (): IpcAction =>
    createIpcInvokeAction(SAVE_AS_SUBTITLES_CHANNEL)

export const openSubtitles = (filepath?: string): IpcAction =>
    createIpcInvokeAction(OPEN_SUBTITLES_CHANNEL, [filepath])

export const newSubtitles = (): IpcAction =>
    createIpcInvokeAction(NEW_SUBTITLES_CHANNEL)

export const createSubtitlesError = (error: Error): SubtitlesErrorAction => ({
    type: SUBTITLES_ERROR,
    payload: error.message,
})

export const clearSubtitlesError = (): ThunkAction => dispatch =>
    dispatch({ type: CLEAR_SUBTITLES_ERROR })

export const clearFocusedIndex = (): ClearFocusedSubtitleAction => ({
    type: CLEAR_FOCUSED_SUBTITLE,
})

export const handleSubtitlesError: IpcErrorHandler<SubtitlesErrorAction> =
    (error: Error) => dispatch =>
        dispatch(createSubtitlesError(error))

const setSubtitles = (dispatch: ThunkDispatch, getState: StateGetter) => {
    const { subtitles } = getState().subtitles.subs.present
    dispatch(createIpcInvokeAction(SET_SUBTITLES_CHANNEL, [subtitles]))
}

export const selectSubs = (indexes: number[]): SelectSubtitlesAction => ({
    type: SELECT_SUBTITLES,
    payload: indexes,
})

export const deselectSubs = (indexes: number[]): DeselectSubtitlesAction => ({
    type: DESELECT_SUBTITLES,
    payload: indexes,
})

export const shiftSubtitles =
    (indexes: number[], ms: number): ThunkAction =>
    (dispatch, getState) => {
        dispatch({
            type: SHIFT_SUBTITLES,
            payload: {
                indexes,
                ms,
            },
        })

        setSubtitles(dispatch, getState)
    }

export const addSubtitle =
    (index: number, start: SubtitleTimestamp, end: SubtitleTimestamp): ThunkAction =>
    (dispatch, getState) => {
        dispatch({
            type: ADD_SUBTITLE,
            payload: {
                index,
                start,
                end,
                caption: [""],
            },
        })

        setSubtitles(dispatch, getState)
    }

export const updateSubtitleCaption =
    (index: number, caption: string[]): ThunkAction =>
    (dispatch, getState) => {
        dispatch({
            type: UPDATE_SUBTITLE_CAPTION,
            payload: {
                index,
                caption,
            },
        })

        setSubtitles(dispatch, getState)
    }

export const updateSubtitleTimestamps =
    (updates: TimestampUpdate[]): ThunkAction =>
    (dispatch, getState) => {
        dispatch({
            type: UPDATE_SUBTITLE_TIMESTAMPS,
            payload: updates,
        })

        setSubtitles(dispatch, getState)
    }

export const deleteSubtitles =
    (indexes: number[]): ThunkAction =>
    (dispatch, getState) => {
        dispatch({
            type: DELETE_SUBTITLES,
            payload: indexes,
        })

        setSubtitles(dispatch, getState)
    }

export const undoSubtitle = (): ThunkAction => (dispatch, getState) => {
    dispatch({ type: UNDO_SUBTITLE })
    setSubtitles(dispatch, getState)
}

export const redoSubtitle = (): ThunkAction => (dispatch, getState) => {
    dispatch({ type: REDO_SUBTITLE })
    setSubtitles(dispatch, getState)
}

export const receieveSubtitleUndo: IpcListener = () => dispatch =>
    dispatch(undoSubtitle())
export const receieveSubtitleRedo: IpcListener = () => dispatch =>
    dispatch(redoSubtitle())
