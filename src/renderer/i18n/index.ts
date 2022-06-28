import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import { supportedLocales } from "@/common"
import { IpcBackend } from "./backend"

// For some reason, when this has an "export default" and is imported as "import "./i18n"
// from the primary index.tsx, i18next doesn't get properly initialized. Probably a webpack problem.
// So instead this init function is exported to be called there which properly initializes i18next
export const i18nInit = () => {
    i18n.use(IpcBackend)
        .use(initReactI18next)
        .init({
            lng: navigator.language,
            fallbackLng: "en-US",
            supportedLngs: supportedLocales,
            interpolation: {
                escapeValue: false,
            },
        })
}
