import { NextResponse } from "next/server";

import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(req) {
    try {
        await dbConnect();

        const products = await req.json();

        if (!Array.isArray(products) || products.length === 0) {
            return NextResponse.json({ success: false, message: "Invalid products array" }, { status: 400 });
        }

        const inserted = await Product.insertMany(products, { ordered: false });

        return NextResponse.json({
            success: true,
            products: inserted
        }, { status: 201 })
    } catch (error) {
        console.error("Error inserting products:", error);

        if (error.code === 11000) {
            return NextResponse.json({
                success: false,
                message: `Duplicate slug found: ${JSON.stringify(error.keyValue)}`,
            }, { status: 409 });
        }

        return NextResponse.json({
            success: false,
            message: "Internal server error",
            error: error.message,
        }, { status: 500 });
    }
}