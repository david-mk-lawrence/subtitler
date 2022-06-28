import React from "react"
import { Provider } from "react-redux"
import { HashRouter } from "react-router-dom"

import { store } from "./store"
import ErrorBoundary from "./ErrorBoundary"
import AppContainer from "./AppContainer"

import "./App.css"

export function App(): JSX.Element {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <HashRouter>
                    <AppContainer />
                </HashRouter>
            </Provider>
        </ErrorBoundary>
    )
}
