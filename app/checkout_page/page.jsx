"use client";

import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { Country, State, City } from 'country-state-city';
import Select from 'react-select';
import Image from 'next/image';

const CheckoutPage = () => {
    const { items, totalPrice, cartLoadingFetch, cartErrorFetch } = useSelector((state) => state.cart);

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    return (
        <div className="w-full flex justify-center px-5 sm:px-16 py-5 sm:py-10">
            <div className="bg-white/10 rounded-lg w-full px-6 md:px-16 lg:px-20 py-5 flex flex-row gap-4">
                {/* Shipping Info */}
                <div className='w-full p-4 flex flex-col'>
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
                            className="text-black"
                            placeholder="Select country"
                            onChange={(country) => {
                                setSelectedCountry(country);
                                setSelectedState(null);
                            }}
                        />

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold">State</label>
                            <Select
                                options={
                                    selectedCountry
                                        ? State.getStatesOfCountry(selectedCountry.isoCode)
                                        : []
                                }
                                getOptionLabel={(s) => s.name}
                                getOptionValue={(s) => s.isoCode}
                                className="text-black"
                                placeholder="Select state"
                                isDisabled={!selectedCountry}
                                onChange={setSelectedState}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold">City</label>
                            <Select
                                options={
                                    selectedCountry && selectedState
                                        ? City.getCitiesOfState(
                                            selectedCountry.isoCode,
                                            selectedState.isoCode
                                        )
                                        : []
                                }
                                getOptionLabel={(c) => c.name}
                                getOptionValue={(c) => c.name}
                                className="text-black"
                                placeholder="Select city"
                                isDisabled={!selectedState}
                                onChange={setSelectedCity}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold">ZIP Code</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                className="bg-white text-black border border-gray-600 rounded px-2 py-1.5"
                                placeholder="ZIP"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-l border-white/10 my-5" />
                {/* Order Summary */}
                <div className="w-full p-4 flex flex-col rounded-lg ">
                    <p className="font-semibold text-xl mb-4">Order Summary</p>

                    {/* Items */}
                    <div className="flex flex-col gap-4 max-h-[260px] overflow-y-auto pr-2">
                        {items.map((item, index) => (
                            <div key={index} className="flex gap-4 items-center">
                                {/* Image */}
                                <div className="relative w-16 h-16 bg-white rounded-md p-1">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>

                                {/* Item info */}
                                <div className="flex flex-col gap-3 flex-1">
                                    <p className="text-sm font-semibold">{item.name}</p>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-3 mt-1">
                                        <button
                                            className="w-6 h-6 flex items-center justify-center rounded border border-white/20 hover:bg-white/10 transition"
                                            onClick={() => handleDecrease(item)}
                                        >
                                            −
                                        </button>

                                        <span className="text-sm font-medium">{item.quantity}</span>

                                        <button
                                            className="w-6 h-6 flex items-center justify-center rounded border border-white/20 hover:bg-white/10 transition"
                                            onClick={() => handleIncrease(item)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Price */}
                                <p className="text-sm font-semibold">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/10 my-5" />

                    {/* Pricing */}
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex justify-between text-gray-300">
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-gray-300">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>

                        <div className="flex justify-between font-semibold text-base mt-2">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* CTA */}
                    <button className="w-full mt-6 bg-red-500 hover:bg-red-600 transition-colors py-3 rounded-md font-semibold">
                        Pay Now
                    </button>

                    <p className="text-xs text-gray-400 text-center mt-3">
                        Secure payment • SSL encrypted
                    </p>
                </div>
            </div>
        </div>
    )
}
export default CheckoutPage