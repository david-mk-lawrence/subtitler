import { Action } from "redux"
import { Subtitles, Subtitle, SubtitleTimestamp } from "@/common"

export const RECEIVE_SUBTITLES = "RECEIVE_SUBTITLES"
export const SUBTITLES_ERROR = "SUBTITLES_ERROR"
export const CLEAR_SUBTITLES_ERROR = "CLEAR_SUBTITLES_ERROR"

export const ADD_SUBTITLE = "ADD_SUBTITLE"
export const UPDATE_SUBTITLE_CAPTION = "UPDATE_SUBTITLE_CAPTION"
export const UPDATE_SUBTITLE_TIMESTAMPS = "UPDATE_SUBTITLE_TIMESTAMPS"
export const DELETE_SUBTITLES = "DELETE_SUBTITLES"
export const CLEAR_FOCUSED_SUBTITLE = "CLEAR_FOCUSED_SUBTITLE"

export const SELECT_SUBTITLES = "SELECT_SUBTITLES"
export const DESELECT_SUBTITLES = "DESELECT_SUBTITLES"
export const SHIFT_SUBTITLES = "SHIFT_SUBTITLES"
export const UNDO_SUBTITLE = "UNDO_SUBTITLE"
export const REDO_SUBTITLE = "REDO_SUBTITLE"
export const CLEAR_SUBTITLE_HISTORY = "CLEAR_SUBTITLE_HISTORY"

export interface TimestampUpdate {
    index: number
    sts: SubtitleTimestamp
    kind: "start" | "end"
}

export interface ReceiveSubtitlesAction extends Action<typeof RECEIVE_SUBTITLES> {
    payload: Subtitles
}

export interface SubtitlesErrorAction extends Action<typeof SUBTITLES_ERROR> {
    payload: string
}

export interface SelectSubtitlesAction extends Action<typeof SELECT_SUBTITLES> {
    payload: number[]
}

export interface DeselectSubtitlesAction extends Action<typeof DESELECT_SUBTITLES> {
    payload: number[]
}

export interface ShiftSubtitleAction extends Action<typeof SHIFT_SUBTITLES> {
    payload: {
        ms: number
        indexes: number[]
    }
}

export interface AddSubtitleAction extends Action<typeof ADD_SUBTITLE> {
    payload: Subtitle
}

export interface UpdateSubtitleCaptionAction
    extends Action<typeof UPDATE_SUBTITLE_CAPTION> {
    payload: { index: number; caption: string[] }
}

export interface UpdateSubtitleTimestampsAction
    extends Action<typeof UPDATE_SUBTITLE_TIMESTAMPS> {
    payload: TimestampUpdate[]
}

export interface DeleteSubtitlesAction extends Action<typeof DELETE_SUBTITLES> {
    payload: number[]
}

export type ClearSubtitlesErrorAction = Action<typeof CLEAR_SUBTITLES_ERROR>
export type ClearFocusedSubtitleAction = Action<typeof CLEAR_FOCUSED_SUBTITLE>

export type UndoSubtitleAction = Action<typeof UNDO_SUBTITLE>
export type RedoSubtitleAction = Action<typeof REDO_SUBTITLE>
export type ClearSubtitleHistoryAction = Action<typeof CLEAR_SUBTITLE_HISTORY>

export type SubtitlesActions =
    | ReceiveSubtitlesAction
    | SubtitlesErrorAction
    | ClearSubtitlesErrorAction
    | ClearFocusedSubtitleAction
    | SelectSubtitlesAction
    | DeselectSubtitlesAction
    | ShiftSubtitleAction
    | AddSubtitleAction
    | UpdateSubtitleCaptionAction
    | UpdateSubtitleTimestampsAction
    | DeleteSubtitlesAction
    | UndoSubtitleAction
    | RedoSubtitleAction
// | ClearSubtitleHistoryAction
