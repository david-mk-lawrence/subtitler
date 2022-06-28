import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useTranslation, Trans } from "react-i18next"
import { PlusIcon, MinusIcon } from "@heroicons/react/solid"

import { Timestamp, toTimestamp } from "@/common"
import { selectFirstTimestamp, shiftSubtitles, selectNumSubtitles, selectSelectedIndexes } from "@/renderer/store/subtitles"
import { useDispatch } from "@/renderer/hooks"

import TimestampComponent from "@/renderer/components/subtitles/Timestamp"
import Button from "@/renderer/components/layout/Button"
import BgButton from "@/renderer/components/layout/BackgroundButton"

const defaultClassName = ""
const errClassName =
    "ring-1 ring-red-600 focus:ring-red-600 dark:ring-red-600 dark:focus:ring-red-600"

interface ShiftToolProps {
    onClose: () => void
}

type Dir = -1 | 1

export default function ShiftTool(props: ShiftToolProps): JSX.Element {
    const { t } = useTranslation("tools")
    const dispatch = useDispatch()
    const startTS = useSelector(selectFirstTimestamp)
    const numSubs = useSelector(selectNumSubtitles)
    const selectedIndexes = useSelector(selectSelectedIndexes)
    const min = startTS !== undefined ? startTS.ts.totalMS : 0

    const [ts, setTs] = useState<Timestamp>(toTimestamp(0,0,0,0))
    const [dir, setDir] = useState<Dir>(1)
    const [cls, setCls] = useState<string>(defaultClassName)
    const [disable, setDisabled] = useState<boolean>(false)
    const dirStr = dir === 1 ? "forward" : "backward"

    const onShift = (_: React.MouseEvent<HTMLButtonElement>) => {
        if (ts.totalMS === 0) {
            props.onClose()
        } else {
            dispatch(shiftSubtitles(selectedIndexes, ts.totalMS * dir))
            props.onClose()
        }
    }

    const onDirection = (_: React.MouseEvent<HTMLButtonElement>) => {
        setDir(dir === 1 ? -1 : 1)
    }

    const onTSChange = (hours: number, minutes: number, seconds: number, milliseconds: number): void => {
        const newTs = toTimestamp(hours, minutes, seconds, milliseconds)
        setTs(newTs)
        if (dir === -1 && newTs.totalMS > min) {
            setCls(errClassName)
            setDisabled(true)
        } else {
            setCls(defaultClassName)
            setDisabled(false)
        }
    }

    return (
        <div className="grid grid-cols-1 gap-2 place-content-center">
            {selectedIndexes.length > 0 &&
                <>
                    <div className={"text-xl justify-self-center " + cls}>
                        <div className="flex">
                            <BgButton onClick={onDirection}>
                                {dir === 1 &&
                                    <PlusIcon className="h-5 w-5" />
                                }
                                {dir === -1 &&
                                    <MinusIcon className="h-5 w-5" />
                                }
                            </BgButton>
                            <TimestampComponent ts={ts} onChange={onTSChange} />
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex-1">
                        {selectedIndexes.length === numSubs &&
                            <Trans
                                ns="tools"
                                i18nKey="shift.all"
                                components={{
                                    strong: <strong></strong>,
                                }}
                                values={{
                                    direction: t(`shift.${dirStr}`),
                                }}
                            />
                        }
                        {selectedIndexes.length > 0 && selectedIndexes.length < numSubs &&
                            <Trans
                                ns="tools"
                                i18nKey="shift.selected"
                                components={{
                                    strong: <strong></strong>,
                                }}
                                values={{
                                    count: selectedIndexes.length,
                                    direction: t(`shift.${dirStr}`),
                                }}
                            />
                        }
                        </div>
                        <div className="flex-initial">
                            <Button disabled={disable} onClick={onShift}>
                                {t("shift.button")}
                            </Button>
                        </div>
                    </div>
                </>
            }
            {selectedIndexes.length === 0 &&
                <div className="flex-1">
                    <p className="text-sm">{t("shift.none")}</p>
                </div>
            }
        </div>
    )
}
