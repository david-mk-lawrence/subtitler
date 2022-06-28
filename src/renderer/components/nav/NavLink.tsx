import React from "react"
import {
    NavLink as RouterNavLink,
    NavLinkProps as RouterNavLinkProps,
} from "react-router-dom"

const inactive = "text-tl-500 hover:text-tl-900 dark:text-td-600 dark:hover:text-td-100"
const active = "text-tl-900 dark:text-td-100"

type NavLinkProps = RouterNavLinkProps & {
    currentLocation: string
}

export default function NavLink(props: NavLinkProps): JSX.Element {
    const { currentLocation, ...navProps } = props
    const to = props.to.toString()

    let className: string
    if (to === "/" && currentLocation === "/") {
        className = active
    } else if (to === "/") {
        className = inactive
    } else if (currentLocation.startsWith(to)) {
        className = active
    } else {
        className = inactive
    }

    return (
        <div className={className}>
            <RouterNavLink {...navProps} />
        </div>
    )
}
