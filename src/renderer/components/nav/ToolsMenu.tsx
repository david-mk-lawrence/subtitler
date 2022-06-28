import React from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { AdjustmentsIcon, XCircleIcon } from "@heroicons/react/solid"

import { selectHasSubs, selectHasSelected } from "@/renderer/store/subtitles"
import Popover from "@/renderer/components/layout/Popover"
import ShiftTool from "@/renderer/components/tools/ShiftTool"
import MultiRemoveTool from "@/renderer/components/tools/MultiRemoveTool"

interface ToolsMenuProps {
    iconCls: string
}

export default function ToolsMenu(props: ToolsMenuProps): JSX.Element {
    const { t } = useTranslation("nav")
    const hasSubs = useSelector(selectHasSubs)
    const hasSelected = useSelector(selectHasSelected)

    return (
        <>
            <li>
                <Popover
                    buttonTitle={t("shift.title")}
                    buttonDisabled={!hasSubs || !hasSelected}
                    icon={<AdjustmentsIcon className={props.iconCls + " rotate-90"} />}
                    body={(close) => <ShiftTool onClose={() => close()} />}
                />
            </li>
            <li>
                <Popover
                    buttonTitle={t("remove.title")}
                    buttonDisabled={!hasSubs || !hasSelected}
                    icon={<XCircleIcon className={props.iconCls} />}
                    body={(close) => <MultiRemoveTool onClose={() => close()} />}
                />
            </li>
        </>
    )
}
