import { JsonObjectReadOnly } from "@/common/json"

import { Subtitle } from "@/common/subtitles"

export interface Session extends JsonObjectReadOnly {
    readonly filepath?: string
    readonly saved: boolean
    readonly subs?: Subtitle[]
}
