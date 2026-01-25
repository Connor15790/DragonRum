import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { items } = await req.json();

        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: "Cart is empty!" },
                { status: 400 }
            )
        }

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
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