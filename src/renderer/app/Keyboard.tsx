import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

import { keysDown, keysUp } from "@/renderer/store/keyboard"

import { HasChildren } from "@/renderer/components/types"

export default function Keyboard(props: HasChildren): JSX.Element {
    const dispatch = useDispatch()

    useEffect(() => {
        const getKeys = (event: KeyboardEvent) => {
            const keys = [event.key]
            if (event.metaKey) {
                keys.push("Meta")
            }

            if (event.shiftKey) {
                keys.push("Shift")
            }

            if (event.ctrlKey) {
                keys.push("Control")
            }

            if (event.altKey) {
                keys.push("Alt")
            }

            return [...new Set(keys)]
        }

        const onKeyDown = (event: KeyboardEvent) => {
            dispatch(keysDown(getKeys(event)))
        }

        const onKeyUp = (event: KeyboardEvent) => {
            dispatch(keysUp(getKeys(event)))
        }

        window.addEventListener("keydown", onKeyDown)
        window.addEventListener("keyup", onKeyUp)

        return () => {
            window.removeEventListener("keydown", onKeyDown)
            window.removeEventListener("keyup", onKeyUp)
        }
    }, [dispatch])

    return <>{props.children}</>
}
