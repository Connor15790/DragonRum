import React, { Fragment } from 'react';

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline'

const CartDrawer = ({ open, setOpen, person }) => {
    return (
        <Transition show={open} as={Fragment}>
            <Dialog as="div" className="relative z-110" onClose={setOpen}>
                {/* Background Backdrop */}
                <TransitionChild
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25 transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            {/* Sliding Panel */}
                            <TransitionChild
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <DialogPanel className="pointer-events-auto w-screen max-w-sm">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        {/* Header */}
                                        <div className="bg-teal-600 px-4 py-6 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <DialogTitle className="text-base font-semibold leading-6 text-white">
                                                    User Details
                                                </DialogTitle>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative rounded-md bg-teal-600 text-teal-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="absolute -inset-2.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-1">
                                                <p className="text-sm text-teal-100">
                                                    Detailed information about {person?.name || 'the user'}.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Body Content */}
                                        <div className="relative flex-1 px-4 py-6 sm:px-6">
                                            {person ? (
                                                <div className="space-y-6">
                                                    {/* Profile Avatar Placeholder */}
                                                    <div className="flex justify-center">
                                                        <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-bold">
                                                            {person.name.charAt(0)}
                                                        </div>
                                                    </div>

                                                    {/* Info Grid */}
                                                    <div>
                                                        <h3 className="font-medium text-gray-900">Contact Information</h3>
                                                        <dl className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                                                            <div className="flex justify-between py-3 text-sm font-medium">
                                                                <dt className="text-gray-500">Full Name</dt>
                                                                <dd className="text-gray-900">{person.name}</dd>
                                                            </div>
                                                            <div className="flex justify-between py-3 text-sm font-medium">
                                                                <dt className="text-gray-500">Email</dt>
                                                                <dd className="text-gray-900">{person.email}</dd>
                                                            </div>
                                                            <div className="flex justify-between py-3 text-sm font-medium">
                                                                <dt className="text-gray-500">Job Title</dt>
                                                                <dd className="text-gray-900">{person.title}</dd>
                                                            </div>
                                                            <div className="flex justify-between py-3 text-sm font-medium">
                                                                <dt className="text-gray-500">Role</dt>
                                                                <dd className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                    {person.role}
                                                                </dd>
                                                            </div>
                                                        </dl>
                                                    </div>

                                                    {/* Bio Section */}
                                                    <div>
                                                        <h3 className="font-medium text-gray-900">Bio</h3>
                                                        <div className="mt-2 text-sm text-gray-500">
                                                            <p>{person.bio}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p>No user selected.</p>
                                            )}
                                        </div>

                                        {/* Footer Actions */}
                                        <div className="flex shrink-0 justify-end px-4 py-4 border-t border-gray-200">
                                            <button
                                                type="button"
                                                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                onClick={() => setOpen(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="ml-4 inline-flex justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default CartDrawer