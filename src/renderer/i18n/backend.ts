import { BackendModule, Services, TOptions, InitOptions, ReadCallback } from "i18next"

import { randomString, GET_TRANSLATION_CHANNEL, JsonObject } from "@/common"

// Contains callbacks that are waiting to be called once a response
// is sent back from the main process
const pending: {
    [k: string]: { callback: ReadCallback }
} = {}

/*
 *  Implements a Backend for i18next that uses IPC in order to retrieve the translations
 */
export const IpcBackend: BackendModule = {
    type: "backend",
    // Binds a function to be called whenever a message is received from the main process
    // which should contain the translation. The pendind callback is retrieved and called
    // with the translations
    init: (_: Services, __: TOptions, ___: InitOptions): void => {
        window.api.receive(GET_TRANSLATION_CHANNEL, (key: string, data: JsonObject) => {
            const cb = pending[key]
            if (!cb) {
                return
            }

            delete pending[key]
            cb.callback(null, data)
        })
    },
    // Called when i18next needs a translation file. This sends a message to the main
    // process, and does not wait for a response (since that would require awaiting the
    // response). Instead, the callback is stored with a unique key to be looked up and
    // called when the message is sent back from the main process.
    read: (language: string, namespace: string, callback: ReadCallback): void => {
        const key = randomString(10)
        pending[key] = { callback }
        window.api.send(GET_TRANSLATION_CHANNEL, key, language, namespace)
    },
}
