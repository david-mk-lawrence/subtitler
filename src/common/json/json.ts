export type JsonValue =
    | void
    | Date
    | null
    | boolean
    | number
    | string
    | JsonValue[]
    | { [prop: string]: JsonValue }

export interface JsonObject {
    [prop: string]: JsonValue
}

export interface JsonObjectReadOnly {
    readonly [prop: string]: JsonValue
}
