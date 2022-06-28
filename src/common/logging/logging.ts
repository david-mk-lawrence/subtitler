export type LogLevel = "debug" | "info" | "warn" | "error"

export const LEVEL_DEBUG = 0
export const LEVEL_INFO = 100
export const LEVEL_WARN = 200
export const LEVEL_ERROR = 300

export const DEFAULT_LEVEL = LEVEL_DEBUG

export const levelMapping = new Map<LogLevel, number>([
    ["debug", LEVEL_DEBUG],
    ["info", LEVEL_INFO],
    ["warn", LEVEL_WARN],
    ["error", LEVEL_ERROR],
])

export type LogEntry = any

export const logLevels = ["debug", "info", "warn", "error"]
