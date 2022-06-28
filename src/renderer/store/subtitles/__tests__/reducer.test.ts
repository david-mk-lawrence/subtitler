import { subtitlesReducer } from "../reducer"
import { SubtitlesState } from "../state"
import { RECEIVE_SUBTITLES, ReceiveSubtitlesAction } from "../types"

const initState = (): SubtitlesState => ({
    subs: {
        past: [],
        present: {subtitles: undefined},
        future: [],
    },
    meta: {
        filepath: undefined,
        error: undefined,
        saved: true,
    },
    ui: {
        focusIndex: undefined,
        selected: undefined,
        lastSelected: undefined,
        lastSelectAction: undefined,
    },
})

test("receieve empty subtitles", () => {
    const state = initState()
    const action: ReceiveSubtitlesAction = {type: RECEIVE_SUBTITLES, payload: {subs: []}}

    const next = subtitlesReducer(state, action)
    expect(next.subs.past.length).toBe(0)
    expect(next.subs.present.subtitles?.length).toBe(0)
})
