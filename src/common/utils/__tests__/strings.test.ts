import { randomString } from "../strings"

test("random string", () => {
    const str = randomString(10)
    expect(str.length).toBe(10)
})
