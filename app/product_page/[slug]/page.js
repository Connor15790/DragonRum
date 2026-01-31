import React from "react";
import ProductView from "./ProductView";

async function getProduct(slug) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get-one-product?slug=${slug}`,
        { cache: "no-store" }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.product;
}

export default async function ProductPage({ params }) {
    const { slug } = await params;

    const product = await getProduct(slug);

    if (!product) {
        return (
            <div className="text-center text-white py-40">
                <h1>Product Not Found</h1>
            </div>
        );
    }

    return <ProductView product={product} />;
}