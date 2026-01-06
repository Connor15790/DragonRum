"use client";

import React from 'react';
import { toast } from 'react-toastify';

import Image from 'next/image';

import { useDispatch } from 'react-redux';
import { updateCart } from '@/redux/CartSlice/cartSlice';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

const CartDrawerItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleUpdateItem = async (newQuantity) => {
        try {
            await dispatch(updateCart({ productId: item.productId, quantity: newQuantity })).unwrap();
        } catch (error) {
            console.error("Failed to update cart:", error);
            toast.error("Error!");
        }
    }

    return (
        <div className='flex border-b border-gray-300 p-2 gap-2'>
            <Image
                src="/rum_cart.jpg"
                width={100}
                height={100}
                alt="Picture of the author"
            />

            <div className='flex flex-col justify-between w-full'>
                <p onClick={() => console.log(item)} className='text-sm text-gray-500 font-semibold'>{item.name}</p>

                <div className='flex justify-between items-center'>
                    <p className='text-red-500 text-lg'><span className='text-sm mr-2'>$</span>{item.price}</p>

                    <div className='flex gap-2 items-center'>
                        <MinusIcon onClick={() => handleUpdateItem("-1")} className='text-black hover:bg-gray-100 cursor-pointer h-5 w-5' />
                        <p className='px-2.5 text-sm border rounded text-black'>{item.quantity}</p>
                        <PlusIcon onClick={() => handleUpdateItem("1")} className='text-black hover:bg-gray-100 cursor-pointer h-5 w-5' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartDrawerItem