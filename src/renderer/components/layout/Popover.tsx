import React, { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"

interface PopoverProps {
    buttonTitle: string
    buttonDisabled: boolean
    icon: React.ReactNode
    body: (close: () => void) => React.ReactNode
}

export default function AppPopover(props: PopoverProps): JSX.Element {
    return (
        <Popover className="relative">
            <Popover.Button
                className="block disabled:opacity-50 bg-bl-300 dark:bg-bd-600 hover:bg-bl-400 dark:hover:bg-bd-700 disabled:hover:bg-bl-300 dark:disabled:hover:bg-bd-600"
                title={props.buttonTitle}
                disabled={props.buttonDisabled}
            >
                {props.icon}
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute z-10 mt-3 w-screen max-w-sm transform px-4">
                    {({ close }) => (
                        <div className="bg-bl-50 dark:bg-bd-600 overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-6">
                            {props.body(close)}
                        </div>
                    )}
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}
