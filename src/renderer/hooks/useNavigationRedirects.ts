import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { routeToPath } from "@/common"
import { selectPendingRoute, navigationComplete } from "@/renderer/store/navigation"

// If there any pending redirects in the redux state, then they will be navigated to
export const useNavigationRedirects = (): void => {
    const dispatch = useDispatch()
    const pendingRoute = useSelector(selectPendingRoute)
    const navigate = useNavigate()

    useEffect(() => {
        if (pendingRoute) {
            dispatch(navigationComplete())

            let path: string | undefined = routeToPath(pendingRoute)
            if (path !== undefined) {
                let go: -1 | 0 | 1 = 0
                if (path.startsWith("/@")) {
                    const direction = path.slice(2)
                    path = undefined
                    if (direction === "back") {
                        go = -1
                    } else if (direction === "forward") {
                        go = 1
                    }

                    navigate(go)
                } else {
                    navigate(path)
                }
            }
        }
    }, [pendingRoute, dispatch, navigate])
}
