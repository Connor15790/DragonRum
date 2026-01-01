"use client"

import React, { Fragment } from 'react';

import { useSelector } from 'react-redux';

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline'

import CartDrawerItem from './CartDrawerItem';
import Spinner from '../Spinner';

const CartDrawer = ({ open, setOpen }) => {
    const { items, cartLoading, cartError } = useSelector((state) => state.cart);

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
                                        <div className="bg-red-500 px-4 py-6 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <DialogTitle className="text-xl font-semibold leading-6 text-white">
                                                    Cart
                                                </DialogTitle>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative rounded-md bg-red-500 text-red-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="absolute -inset-2.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Body Content */}
                                        {cartLoading ?
                                            <div className="relative items-center justify-center flex flex-1">
                                                <Spinner />
                                            </div> :
                                            <div className="relative flex-1">
                                                {items.length === 0 ? (
                                                    <div className='h-full flex items-center justify-center'>
                                                        <p className='text-black'>Cart is empty!</p>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <CartDrawerItem />
                                                        <CartDrawerItem />
                                                    </>
                                                )
                                                }
                                            </div>
                                        }

                                        {/* Footer Actions */}
                                        <div className="flex shrink-0 justify-end px-4 py-4 border-t border-gray-200">
                                            <button
                                                type="button"
                                                className="rounded-md cursor-pointer bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                onClick={() => setOpen(false)}
                                            >
                                                Clear Cart
                                            </button>
                                            <button
                                                type="button"
                                                className="ml-4 inline-flex justify-center cursor-pointer rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                            >
                                                Checkout
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