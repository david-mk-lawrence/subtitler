import React from "react"
import { Link, useLocation } from "react-router-dom"

export default function NotFound(): JSX.Element {
    const loc = useLocation()
    return (
        <div className="container">
            <div className="row">
                <div className="col s12">
                    <h1>Not Found</h1>
                    <p>
                        <Link to="/">Back to home</Link>
                    </p>
                    <p>
                        Attempted URL: Pathname: {loc.pathname}
                        <br />
                        Hash: {loc.hash}
                        <br />
                        Search: {loc.search}
                        <br />
                        Key: {loc.key}
                        <br />
                    </p>
                </div>
            </div>
        </div>
    )
}
