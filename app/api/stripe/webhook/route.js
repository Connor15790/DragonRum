import Stripe from "stripe";
import { headers } from "next/headers";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        await dbConnect();

        const items = await stripe.checkout.sessions.listLineItems(session.id);

        await Order.create({
            userId: session.metadata.userId,
            items: items.data.map(item => ({
                name: item.description,
                price: item.price.unit_amount / 100,
                quantity: item.quantity,
                image: session.line_items?.data?.[0]?.price?.product?.images?.[0] || "",
            })),
            totalPrice: session.amount_total / 100,
            paymentIntentId: session.payment_intent,
        });
    }

    return new Response("OK", { status: 200 });
}
