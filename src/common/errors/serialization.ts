/**
 * This module helps with sending errors between processes over IPC
 * since Error objects are not serializeable (a requirement of IPC).
 */
import { SerializableError, SerializedError } from "./types"

const isSerializeableError = (error: Error): error is SerializableError =>
    "serialize" in error

export const serializeDefault = (error: Error): SerializedError => ({
    name: error.name,
    message: error.message,
    extra: { ...error },
})

export const serialize = (error: Error): SerializedError =>
    isSerializeableError(error) ? error.serialize() : serializeDefault(error)

export const deserialize = (serialized: SerializedError): Error => {
    const err = new Error(serialized.message)
    err.name = serialized.name
    Object.assign(err, serialized.extra)
    return err
}
