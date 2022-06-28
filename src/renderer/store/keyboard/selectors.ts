import { Selector } from "@/renderer/store/state"

export const selectKeyboardKeys: Selector<string[]> = state => state.keyboard.keys
