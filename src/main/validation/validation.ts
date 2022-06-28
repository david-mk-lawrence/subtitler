import Ajv, { ErrorObject } from "ajv"
import {
    AppError,
    JsonValue,
    JsonObject,
    SerializableError,
    SerializedError,
} from "@/common"

export interface Validator {
    (value: JsonValue): boolean
}

export interface SettingValidators {
    [key: string]: Validator
}

export type Schema = JsonObject

export class ValidationErrors extends AppError implements SerializableError {
    errors: ErrorObject[]

    constructor(message: string, errors: ErrorObject[]) {
        super(message)
        this.errors = errors
    }

    serialize(): SerializedError {
        return {
            name: this.name,
            message: `${this.message}\n${this.errorsToString()}`,
            extra: {},
        }
    }

    errorsToString(delimiter = "\n"): string {
        return this.errors
            .map(err => `Failed to validate ${err.keyword}: ${err.message || ""}`)
            .join(delimiter)
    }
}

export const schemaValidate = (
    schema: Schema,
    value: JsonValue,
): ErrorObject[] | undefined | null => {
    const ajv = new Ajv()
    const validator = ajv.compile(schema)

    validator(value)

    return validator.errors
}
