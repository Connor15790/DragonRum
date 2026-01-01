import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";

import Cart from "@/models/Cart";

async function getUserId() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.id;
    } catch (error) {
        return null;
    }
}

// Fetch cart 
export async function GET() {
    try {
        await dbConnect();
        const userId = await getUserId();

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return NextResponse.json({ items: [], totalPrice: 0 });
        }

        return NextResponse.json(cart);
    } catch (error) {
        return NextResponse.json({ message: "Internal server error!", error: error.message }, { status: 500 });
    }
}

// Add item to cart
export async function POST(req) {
    try {
        await dbConnect();
        const userId = await getUserId();

        if (!user) {
            return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
        }

        const { productId, name, price, image, quantity } = await req.json();

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = await Cart.create({
                userId,
                items: [{ productId, name, price, image, quantity }]
            })
        } else {
            const itemIndex = await cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > - 1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, name, price, image, quantity });
            }

            await cart.save();
        }

        return NextResponse.json(cart);
    } catch (error) {
        return NextResponse.json({ message: "Internal server error!", error: error.message }, { status: 500 });
    }
}