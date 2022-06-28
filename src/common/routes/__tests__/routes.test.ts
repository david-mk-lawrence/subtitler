import { routeToPath } from "../routes"

test("route to path", () => {
    const route = {
        name: "test",
        path: ["test", "path"],
    }

    const path = routeToPath(route)
    expect(path).toBe("/test/path")
})
