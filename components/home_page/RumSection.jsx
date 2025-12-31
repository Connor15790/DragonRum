"use client";

import TiltedCard from "@/components/cards/TitledCard";

export default function RumSection({ products }) {
    return (
        <div className="flex flex-col gap-4">
            <p
                className="font-serif font-bold text-2xl"
                onClick={() => console.log(products)}
            >
                Rum
            </p>

            <div className="w-full overflow-x-auto px-5">
                <div className="flex gap-8 py-4 overflow-visible">
                    {products.map((product) => (
                        <div key={product._id} className="shrink-0 cursor-pointer overflow-visible">
                            <TiltedCard
                                key={product._id}
                                imageSrc={product.img}
                                altText={product.name}
                                captionText={product.name}
                                containerHeight="250px"
                                containerWidth="250px"
                                imageHeight="250px"
                                imageWidth="250px"
                                rotateAmplitude={12}
                                scaleOnHover={1.1}
                                showMobileWarning={false}
                                showTooltip={false}
                                displayOverlayContent={true}
                                overlayContent={<p>{product.title}</p>}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
