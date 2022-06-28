import path from "path"

import i18n from "i18n"

import locales from "./locales"

// Configures translations for the main process
i18n.configure({
    locales,
    defaultLocale: "en-US",
    directory: path.join(__dirname, "locales", "main"),
})

export const setLocale = (locale: string): void => i18n.setLocale(locale)
