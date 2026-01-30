import { NextResponse } from "next/server";

import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const slug = searchParams.get("slug");

        if (!slug) {
            return NextResponse.json({ success: false, message: "No slug found!" }, { status: 400 });
        }

        const product = await Product.findOne({ slug });

        if (!product) {
            return NextResponse.json(
                { success: false, message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                product: product
            }, { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching product:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
                error: error.message
            }, { status: 500 }
        );
    }
}