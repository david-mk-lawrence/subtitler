import { combineReducers } from "redux"

import { alertReducer } from "./alerts"
import { keyboardReducer } from "./keyboard"
import { navigationReducer } from "./navigation"
import { settingsReducer } from "./settings"
import { subtitlesReducer } from "./subtitles"
import { RootState } from "./state"

export const rootReducer = combineReducers<RootState>({
    alert: alertReducer,
    navigation: navigationReducer,
    setting: settingsReducer,
    subtitles: subtitlesReducer,
    keyboard: keyboardReducer,
})
