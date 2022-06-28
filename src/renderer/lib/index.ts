import { ActualTheme, THEME_DARK, THEME_LIGHT } from "@/common"

export const getSystemTheme = (): ActualTheme => {
    const darkTheme = window.matchMedia("(prefers-color-scheme: dark)")
    if (darkTheme.matches) {
        return THEME_DARK
    }

    return THEME_LIGHT
}
