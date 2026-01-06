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

        if (!userId) {
            return NextResponse.json(
                { message: "Unauthorized!" },
                { status: 401 }
            );
        }

        const body = await req.json();

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = await Cart.create({
                userId,
                items: [body]
            });
        } else {
            const itemIndex = cart.items.findIndex(
                item => item.productId.toString() === body.productId
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += body.quantity;
            } else {
                cart.items.push(body);
            }

            await cart.save();
        }

        return NextResponse.json(cart);

    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error!", error: error.message },
            { status: 500 }
        );
    }
}

// Update item quantity in cart
export async function PUT(req) {
    try {
        await dbConnect();
        const userId = await getUserId();

        if (!userId) {
            return NextResponse.json(
                { message: "Unauthorized!" },
                { status: 401 }
            );
        }

        const { productId, quantity } = await req.json();

        const userCart = await Cart.findOne({ userId });

        const itemIndex = userCart.items.findIndex(item => item.productId.toString() === productId);

        console.log("USER:", userId);
        console.log("PRODUCT:", productId);
        console.log("CART ITEMS:", userCart?.items);
        console.log("ITEM INDEX:", itemIndex);

        userCart.items[itemIndex].quantity += parseInt(quantity);

        await userCart.save();

        return NextResponse.json(userCart);
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { message: "Internal server error!", error: error.message },
            { status: 500 }
        );
    }
}