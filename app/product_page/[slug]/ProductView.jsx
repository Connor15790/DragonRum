"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import { addtoCart } from "@/redux/CartSlice/cartSlice";
import { setCartOpen } from "@/redux/CartSlice/cartSlice";

import Spinner from "@/components/Spinner";

export default function ProductView({ product }) {
    const dispatch = useDispatch();

    const { cartLoadingAdd, cartErrorAdd } = useSelector((state) => state.cart);

    const handleAddtoCart = async () => {
        const cartItemData = {
            productId: product._id,
            name: product.title,
            price: product.price,
            image: product.img,
            quantity: 1
        };

        try {
            await dispatch(addtoCart(cartItemData)).unwrap();

            dispatch(setCartOpen(true));
        } catch (error) {
            console.error("Failed to add to cart:", error);
            toast.error("Error saving to cart!");
        }
    }

    return (
        <>
            <div className="w-full flex justify-center px-5 sm:px-16 py-5 sm:py-10">
                <div className="bg-white/10 rounded-lg w-full justify-center items-center px-6 md:px-16 lg:px-20 py-5 flex flex-col">
                    <section className="text-gray-600 body-font overflow-hidden">
                        <div className="container px-5 py-24 mx-auto">
                            <div className="lg:w-4/5 mx-auto flex flex-wrap">

                                {/* LEFT IMAGE */}
                                <div className="lg:w-1/2 w-full lg:h-auto h-64 relative">
                                    <Image
                                        alt="ecommerce"
                                        src={product.img}
                                        width={600}
                                        height={600}
                                        className="object-cover object-center rounded"
                                    />
                                </div>

                                {/* RIGHT DETAILS */}
                                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                    <h1 onClick={() => console.log(product)} className="text-white text-3xl title-font font-medium mb-1">
                                        {product.title}
                                    </h1>

                                    {/* STARS + REVIEWS */}
                                    <div className="flex mb-4">
                                        <span className="flex items-center">
                                            {[1, 2, 3, 4].map((i) => (
                                                <svg
                                                    key={i}
                                                    fill="currentColor"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    className="w-4 h-4 text-red-500"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                </svg>
                                            ))}
                                            <span className="text-white ml-3">4 Reviews</span>
                                        </span>
                                    </div>

                                    {/* DESCRIPTION */}
                                    <p className="leading-relaxed text-white">
                                        {product.desc}
                                    </p>

                                    {/* PRICE + BUTTONS */}
                                    <div className="flex mt-6">
                                        <span className="title-font font-medium text-2xl text-white">
                                            ${product.price}
                                        </span>

                                        <button onClick={handleAddtoCart} className="flex gap-4 items-center ml-auto cursor-pointer text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                                            Add to Cart

                                            {cartLoadingAdd && <Spinner size={18} color="border-white" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}