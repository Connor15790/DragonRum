import Stripe from "stripe";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

export async function POST(req) {
    try {
        await dbConnect();
        const userId = await getUserId();

        const { items } = await req.json();

        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: "Cart is empty!" },
                { status: 400 }
            )
        }

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            metadata: {
                userId: userId,
            },
            payment_method_types: ["card"],
            line_items: items.map(item => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.round(item.price * 100), // dollars → cents
                },
                quantity: item.quantity,
            })),
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment_success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Stripe error:", error);
        return NextResponse.json(
            { error: "Stripe checkout failed" },
            { status: 500 }
        );
    }
}