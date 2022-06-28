import { padNum, toTimestamp, timestampToString, millisecondsToTimestamp, tsAddMilliseconds, toSubtitleTimestamp, asLines, asText, emptySubtitle } from "../subtitles"

test("to timestamp", () => {
    const ts = toTimestamp(1, 2, 3, 4)
    expect(ts.hours).toBe(1)
    expect(ts.minutes).toBe(2)
    expect(ts.seconds).toBe(3)
    expect(ts.milliseconds).toBe(4)
    expect(ts.totalMS).toBe(3723004)
})

test("pad number default", () => {
    const padded = padNum(3)
    expect(padded).toBe("03")
})

test("pad number", () => {
    const padded = padNum(3, 4)
    expect(padded).toBe("0003")
})

test("timestamp to string", () => {
    const ts = timestampToString(toTimestamp(1, 2, 3, 4))
    expect(ts).toBe("01:02:03,004")
})

test("negatve milliseconds to timestamp", () => {
    const ts = millisecondsToTimestamp(-1)
    expect(ts.totalMS).toBe(0)
})

test("zero milliseconds to timestamp", () => {
    const ts = millisecondsToTimestamp(0)
    expect(ts.totalMS).toBe(0)
})

test("milliseconds to timestamp", () => {
    const ts = millisecondsToTimestamp(3723004)

    expect(ts.hours).toBe(1)
    expect(ts.minutes).toBe(2)
    expect(ts.seconds).toBe(3)
    expect(ts.milliseconds).toBe(4)
    expect(ts.totalMS).toBe(3723004)
})

test("timestamp add", () => {
    const ts = toTimestamp(1, 2, 3, 4)
    const added = tsAddMilliseconds(ts, 1001)

    expect(added.hours).toBe(1)
    expect(added.minutes).toBe(2)
    expect(added.seconds).toBe(4)
    expect(added.milliseconds).toBe(5)
    expect(added.totalMS).toBe(3724005)
})

test("invalid timestamp to subtitle timestamp", () => {
    const ts = toSubtitleTimestamp(123, 0, 0, 0)
    expect(ts.outOfRange).toBe(true)
    expect(ts.overlapsWithPrev).toBe(false)
    expect(ts.overlapsWithNext).toBe(false)
    expect(ts.overlapsWithSelf).toBe(false)
})

test("timestamp to subtitle timestamp", () => {
    const ts = toSubtitleTimestamp(1, 0, 0, 0)
    expect(ts.outOfRange).toBe(false)
    expect(ts.overlapsWithPrev).toBe(false)
    expect(ts.overlapsWithNext).toBe(false)
    expect(ts.overlapsWithSelf).toBe(false)
})

test("lines as text", () => {
    const text = asText(["line1", "line2"])
    expect(text).toEqual("line1\nline2")
})

test("text as lines", () => {
    const lines = asLines("line1\nline2")
    expect(lines).toEqual(["line1", "line2"])
})

test("empty subtitle", () => {
    const sub = emptySubtitle()
    expect(sub.index).toBe(1)
    expect(sub.caption[0]).toEqual("")
})
