import React, { ErrorInfo } from "react"
import { ERRORS_CHANNEL } from "@/common"

interface LocalState {
    hasError: boolean
}

export default class ErrorBoundary extends React.PureComponent<any, LocalState> {
    constructor(props: never) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(_: Error): LocalState {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        window.api.invoke(ERRORS_CHANNEL, error, errorInfo.componentStack)
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>
        }

        return this.props.children
    }
}
