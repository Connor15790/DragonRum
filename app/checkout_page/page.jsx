"use client";

import React from 'react';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { Country, State, City } from 'country-state-city';
import Select from 'react-select';

const CheckoutPage = () => {
    return (
        <div className="w-full flex justify-center px-5 sm:px-16 py-5 sm:py-10">
            <div className="bg-white/10 rounded-lg w-full justify-center items-center px-6 md:px-16 lg:px-20 py-5 flex flex-row gap-4">
                <div className='w-full  p-4 flex flex-col'>
                    <p className='font-semibold text-xl'>Checkout</p>

                    <p className='font-semibold mt-6'>Shipping Information</p>

                    <div className='flex flex-col gap-3 mt-5'>
                        <p className='text-sm font-semibold'>Full Name <span className='text-red-500'>*</span></p>
                        <input
                            type="text"
                            className='bg-white text-black border border-gray-600 outline-0 rounded px-2 py-1.5'
                        />
                    </div>

                    <div className='flex flex-col gap-3 mt-5'>
                        <p className='text-sm font-semibold'>Email Address <span className='text-red-500'>*</span></p>
                        <input
                            type="text"
                            className='bg-white text-black border border-gray-600 outline-0 rounded px-2 py-1.5'
                        />
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label className="text-sm font-semibold">
                            Phone Number <span className="text-red-500">*</span>
                        </label>

                        <PhoneInput
                            country="us"
                            containerClass="w-full"
                            inputClass="!w-full !bg-white !text-black !border !border-gray-600 !rounded !py-1.5 !pl-12"
                            buttonClass="!bg-white !border !border-gray-600 text-black"
                        />
                    </div>

                    <div className='flex flex-col gap-3 mt-5'>
                        <p className='text-sm font-semibold'>Country <span className='text-red-500'>*</span></p>
                        <Select
                            options={Country.getAllCountries()}
                            getOptionLabel={(c) => c.name}
                            getOptionValue={(c) => c.isoCode}
                            className='text-black rounded-md'
                        />
                    </div>
                </div>
                <div className='w-full bg-blue-500 p-4'>
                    <p className='font-semibold text-xl'>Order Summary</p>
                </div>
            </div>
        </div>
    )
}
export default CheckoutPage