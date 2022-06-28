import React from "react"
import { createRoot } from "react-dom/client"

import { i18nInit } from "./i18n"
i18nInit()

import { App } from "./app"

const container = document.getElementById("app") as HTMLElement
const root = createRoot(container)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
