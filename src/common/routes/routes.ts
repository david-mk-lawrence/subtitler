import { JsonObject } from "@/common/json"

export interface Route extends JsonObject {
    name: string
    path: string[]
}

// defines the routes that can be navigated to in the application
// they are declared here so that the main process can dispatch
// navigation from the menu
export const ROUTES: { [location: string]: Route } = {
    home: {
        name: "home",
        path: [""],
    },
    settings: {
        name: "settings",
        path: ["settings"],
    },
    "@back": {
        name: "back",
        path: ["@back"],
    },
    "@forward": {
        name: "forward",
        path: ["@forward"],
    },
}

export const routeToPath = (route: Route): string => "/" + route.path.join("/")
