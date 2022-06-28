export interface SerializedError {
    name: string
    message: string
    extra?: any
}

export interface SerializableError extends Error {
    serialize: () => SerializedError
}
