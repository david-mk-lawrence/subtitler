import React from "react"
import { useSelector } from "react-redux"
import { useTranslation, Trans } from "react-i18next"

import Button from "@/renderer/components/layout/Button"
import { selectNumSubtitles, selectSelectedIndexes, deleteSubtitles } from "@/renderer/store/subtitles"
import { useDispatch } from "@/renderer/hooks"

interface MultiRemoveToolProps {
    onClose: () => void
}

export default function MultiRemoveTool(props: MultiRemoveToolProps): JSX.Element {
    const { t } = useTranslation("tools")
    const dispatch = useDispatch()

    const numSubs = useSelector(selectNumSubtitles)
    const selectedIndexes = useSelector(selectSelectedIndexes)

    const onClick = (_: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(deleteSubtitles(selectedIndexes))
        props.onClose()
    }

    return (
        <>
            <div className="flex justify-center items-center mb-2">
                <div className="flex-initial">
                    <p className="text-sm">
                        {selectedIndexes.length === 0 &&
                            <span>{t("remove.none")}</span>
                        }
                        {selectedIndexes.length === numSubs &&
                            <Trans
                                ns="tools"
                                i18nKey="remove.all"
                                components={{
                                    strong: <strong></strong>,
                                }}
                            />
                        }
                        {selectedIndexes.length > 0 && selectedIndexes.length < numSubs &&
                            <Trans
                                ns="tools"
                                i18nKey="remove.selected"
                                components={{
                                    strong: <strong></strong>,
                                }}
                                values={{count: selectedIndexes.length}}
                            />
                        }
                    </p>
                </div>
            </div>
            <div className="flex justify-center items-center">
                {selectedIndexes.length > 0 &&
                    <div className="flex-initial">
                        <Button onClick={onClick}>
                            {t("remove.button")}
                        </Button>
                    </div>
                }
            </div>
        </>
    )
}
