import React, { Fragment, ReactNode, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function ModalOppourtunity({ title, show, hide, children, customClassName, contentClassName }: { contentClassName?: string, customClassName?: string, title?: string, show: boolean, hide: () => void, children: ReactNode }) {

    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={hide}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 overflow-y-auto">
                    <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-[750px] ${customClassName}`}>
                                <button
                                    className="absolute top-4 right-10 text-gray-600 text-5xl"
                                    onClick={() => { hide() }}
                                >
                                    &times;
                                </button>

                                <div className="flex justify-center w-full mt-10 "  >

                                    <h2 className="text-xl font-semibold mb-4 text-[#0270A0]">   
                                        {title}
                                        </h2>
                                </div>

                                <hr className="border-t-2 border-black" />
                                <div className={`bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ${contentClassName}`}>

                                    <div className=" overflow-auto">
                                        {children}
                                    </div>

                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
