// Channel for the renderer to retrieve subtitles from the session
export const GET_SUBTITLES_CHANNEL = "subtitles:get"
// Channel to notify the main process that the New File button was selected
export const NEW_SUBTITLES_CHANNEL = "subtitles:new"
// Channel to notify the main process that the Open File button was selected (or a file was dropped into the window)
export const OPEN_SUBTITLES_CHANNEL = "subtitles:open"
// Channel to notify that the "Save" but was selected
export const SAVE_SUBTITLES_CHANNEL = "subtitles:save"
// Channel to notify that the "Save As" but was selected
export const SAVE_AS_SUBTITLES_CHANNEL = "subtitles:save-as"
// Channel for syncing the current state of subtitles in the UI to the main process
export const SET_SUBTITLES_CHANNEL = "subtitles:set"
