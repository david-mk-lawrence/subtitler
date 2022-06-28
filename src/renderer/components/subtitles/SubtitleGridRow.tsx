import React from "react"

interface Col {
    className?: string
    node: React.ReactNode
}

interface SubtitleGridRowProps {
    col1: Col
    col2: Col
    col3: Col
    col4: Col
}

export default function SubtitleGridRow(props: SubtitleGridRowProps): JSX.Element {
    const { col1, col2, col3, col4 } = props
    return (
        <div className="grid grid-cols-12 grid-rows-2 gap-y-1 place-items-center py-3 auto-cols-max">
            <div
                className={
                    "col-start-1 col-end-2 row-start-1 row-end-3 w-full h-full self-center " +
                    (col1.className || "")
                }
            >
                {col1.node}
            </div>
            <div
                className={
                    "col-start-2 col-end-5 row-start-1 row-end-3 justify-self-start self-start " +
                    (col2.className || "")
                }
            >
                {col2.node}
            </div>
            <div
                className={
                    "col-start-5 col-end-12 row-start-1 row-end-3 justify-self-start self-start " +
                    (col3.className || "")
                }
            >
                {col3.node}
            </div>
            <div
                className={
                    "col-start-12 col-end-13 row-start-1 row-end-3 self-center " +
                    (col4.className || "")
                }
            >
                {col4.node}
            </div>
        </div>
    )
}
