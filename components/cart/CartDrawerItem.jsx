import React from 'react';

import Image from 'next/image';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

const CartDrawerItem = () => {
    return (
        <div className='flex border-b border-gray-300 p-2 gap-2'>
            <Image
                src="/rum_cart.jpg"
                width={100}
                height={100}
                alt="Picture of the author"
            />

            <div className='flex flex-col justify-between'>
                <p className='text-sm text-gray-500 font-semibold'>Dragon Rum brewed from the fires of the Jade Dragon Temple</p>

                <div className='flex justify-between items-center'>
                    <p className='text-red-500 text-lg'><span className='text-sm mr-2'>$</span>400</p>

                    <div className='flex gap-2 items-center'>
                        <MinusIcon className='text-black hover:bg-gray-100 cursor-pointer h-5 w-5' />
                        <p className='px-2.5 text-sm border rounded text-black'>5</p>
                        <PlusIcon className='text-black hover:bg-gray-100 cursor-pointer h-5 w-5' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartDrawerItem