/**
 * Defines loggers for the application
 */
import electronLog from "electron-log"

import {
    LogLevel,
    LogEntry,
    DEFAULT_LEVEL,
    levelMapping,
    LEVEL_DEBUG,
    LEVEL_ERROR,
    LEVEL_INFO,
    LEVEL_WARN,
} from "@/common"

export interface LoggingOpts {
    level?: LogLevel
    enabled: boolean
    trace: boolean
}

abstract class Logger {
    level: number

    enabled: boolean

    trace: boolean

    constructor(opts: LoggingOpts) {
        this.level = levelMapping.get(opts.level || "debug") || DEFAULT_LEVEL
        this.enabled = opts.enabled
        this.trace = opts.trace
    }

    log(level: LogLevel, ...entry: LogEntry) {
        switch (level) {
            case "debug":
                this.debug(...entry)
                break
            case "info":
                this.info(...entry)
                break
            case "warn":
                this.warn(...entry)
                break
            case "error":
                this.error(...entry)
                break
        }
    }

    abstract debug(...entry: LogEntry): void

    abstract info(...entry: LogEntry): void

    abstract warn(...entry: LogEntry): void

    abstract error(...entry: LogEntry): void

    protected entryToMessage(entries: LogEntry[]): LogEntry[] {
        return entries.map(entry => {
            if (entry instanceof Error) {
                return this.errorToMessage(entry)
            }

            return entry
        })
    }

    protected errorToMessage(err: Error): string {
        let msg = err.name + " " + err.message
        if (this.trace) {
            msg += err.stack
        }

        return msg
    }

    protected shouldLog(level: number): boolean {
        return this.enabled && level >= this.level
    }
}

export class FileLogger extends Logger {
    debug(...entry: LogEntry) {
        if (this.shouldLog(LEVEL_DEBUG)) {
            electronLog.debug(...this.entryToMessage(entry))
        }
    }

    info(...entry: LogEntry) {
        if (this.shouldLog(LEVEL_INFO)) {
            electronLog.info(...this.entryToMessage(entry))
        }
    }

    warn(...entry: LogEntry) {
        if (this.shouldLog(LEVEL_WARN)) {
            electronLog.warn(...this.entryToMessage(entry))
        }
    }

    error(...entry: LogEntry) {
        if (this.shouldLog(LEVEL_ERROR)) {
            electronLog.error(...this.entryToMessage(entry))
        }
    }
}

export class ConsoleLogger extends Logger {
    debug(...entry: LogEntry) {
        if (this.shouldLog(LEVEL_DEBUG)) {
            console.debug("APP", ...this.entryToMessage(entry))
        }
    }

    info(...entry: LogEntry) {
        if (this.shouldLog(LEVEL_INFO)) {
            console.info("APP", ...this.entryToMessage(entry))
        }
    }

    warn(...entry: LogEntry) {
        if (this.shouldLog(LEVEL_WARN)) {
            console.warn("APP", ...this.entryToMessage(entry))
        }
    }

    error(...entry: LogEntry) {
        if (this.shouldLog(LEVEL_ERROR)) {
            console.error("APP", ...this.entryToMessage(entry))
        }
    }
}

// When a console logger is being used (development only)
// its convenient to redefine the logging functions so that
// only the application may log. A lot of noise is generated
// in development mode from other libraries/processes (particularly
// browser extensions).
const overrideConsole = () => {
    const now = () => new Date().toISOString()

    const defaultConsoleLog = console.log
    const defaultConsoleDebug = console.debug
    const defaultConsoleInfo = console.info
    const defaultConsoleWarn = console.warn
    const defaultConsoleError = console.error

    console.log = (...data: any[]) => {
        if (!data.length || data[0] !== "APP") {
            return
        }

        defaultConsoleLog("[LOG]", now(), ...data.slice(1))
    }

    console.debug = (...data: any[]) => {
        if (!data.length || data[0] !== "APP") {
            return
        }

        defaultConsoleDebug("[DEBUG]", now(), ...data.slice(1))
    }

    console.info = (...data: any[]) => {
        if (!data.length || data[0] !== "APP") {
            return
        }

        defaultConsoleInfo("[INFO]", now(), ...data.slice(1))
    }

    console.warn = (...data: any[]) => {
        if (!data.length || data[0] !== "APP") {
            return
        }

        defaultConsoleWarn("[WARN]", now(), ...data.slice(1))
    }

    console.error = (...data: any[]) => {
        if (!data.length || data[0] !== "APP") {
            return
        }

        defaultConsoleError("[ERROR]", now(), ...data.slice(1))
    }
}

export let log: Logger

export const setDefaultLogger = (driver: "file" | "console", opts: LoggingOpts) => {
    if (driver === "file") {
        log = new FileLogger(opts)
    } else {
        overrideConsole()
        log = new ConsoleLogger(opts)
    }
}
