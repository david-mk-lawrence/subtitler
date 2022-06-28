import React from "react"

export interface SelectSubProps {
    index: number
    selected: boolean
    onClick: () => void
}

const defaultCls =
    "hover:bg-bl-200 dark:hover:bg-bd-200 active:bg-bl-400 dark:active:bg-bd-400"
const selectedCls = "bg-bl-300 dark:bg-bd-300 active:bg-bl-400 dark:active:bg-bd-400"

export default function SelectSub(props: SelectSubProps): JSX.Element {
    const cls = props.selected ? selectedCls : defaultCls
    const onClick = (_: React.MouseEvent<HTMLButtonElement>) => {
        props.onClick()
    }

    return (
        <div className="w-full h-full px-2">
            <button onClick={onClick} className={"w-full h-full rounded-lg " + cls}>
                {props.index}
            </button>
        </div>
    )
}
