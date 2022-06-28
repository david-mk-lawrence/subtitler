import { serialize, deserialize } from "../serialization"

test("serialize default Error", () => {
    const err = new Error("test error")
    const serialized = serialize(err)

    expect(serialized.name).toBe("Error")
    expect(serialized.message).toBe("test error")
})

test("serialize serializeable error", () => {
    class TestError extends Error {
        constructor(public prop: number) {
            super()
        }
        serialize() {
            return {
                name: "TestError",
                message: "test error",
                extra: {prop: this.prop},
            }
        }
    }

    const serialized = serialize(new TestError(123))

    expect(serialized.name).toBe("TestError")
    expect(serialized.message).toBe("test error")
    expect(serialized.extra.prop).toBe(123)
})

test("deserialize error", () => {
    const serialized = {
        name: "TestError",
        message: "test error",
    }

    const err = deserialize(serialized)
    expect(err.name).toBe("TestError")
    expect(err.message).toBe("test error")
})
