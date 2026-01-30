import { NextResponse } from "next/server";

import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");

        let products;

        if (category) {
            products = await Product.find({ category });
        } else {
            products = await Product.find();
        }

        if (!products || products.length === 0) {
            return NextResponse.json(
                { success: false, message: "No products found!" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, products: products },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching products:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
