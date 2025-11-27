// components/SugarcaneStack.jsx
'use client';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState } from 'react';
import SugarcaneLayout from '@/components/home_page/sugarcane_layout/page';

function CardRotate({ children, onSendToBack, sensitivity, dragEnabled }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [60, -60]);
    const rotateY = useTransform(x, [-100, 100], [-60, 60]);

    function handleDragEnd(_, info) {
        if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
            onSendToBack();
        } else {
            x.set(0);
            y.set(0);
        }
    }

    return (
        <motion.div
            className={`absolute ${dragEnabled ? 'cursor-grab' : 'pointer-events-none'}`}
            style={{ x, y, rotateX, rotateY, zIndex: dragEnabled ? 10 : 0 }}
            drag={dragEnabled}
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            dragElastic={0.6}
            whileTap={{ cursor: 'grabbing' }}
            onDragEnd={handleDragEnd}
        >
            {children}
        </motion.div>
    );
}

export default function SugarcaneStack({
    sensitivity = 200,
    cardDimensions = { width: 600, height: 400 }, // Increased size for your layout
    cardsData = [],
    animationConfig = { stiffness: 260, damping: 20 },
}) {
    const [cards, setCards] = useState(cardsData);

    const sendToBack = (id) => {
        setCards((prev) => {
            const newCards = [...prev];
            const index = newCards.findIndex((card) => card.id === id);
            const [card] = newCards.splice(index, 1);
            newCards.unshift(card);
            return newCards;
        });
    };

    return (
        <div
            className="relative"
            style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
                perspective: 600,
            }}
        >
            {cards.map((card, index) => {
                const isTopCard = index === cards.length - 1;

                return (
                    <CardRotate
                        key={card.id}
                        onSendToBack={() => sendToBack(card.id)}
                        sensitivity={sensitivity}
                        dragEnabled={isTopCard}
                    >
                        <motion.div
                            className="rounded-2xl overflow-hidden border-4 border-white bg-white"
                            animate={{
                                rotateZ: (cards.length - index - 1) * 2, // Reduced rotation for cleaner look
                                scale: 1 + index * 0.04 - cards.length * 0.04,
                                transformOrigin: '90% 90%',
                            }}
                            initial={false}
                            transition={{
                                type: 'spring',
                                stiffness: animationConfig.stiffness,
                                damping: animationConfig.damping,
                            }}
                            style={{
                                width: cardDimensions.width,
                                height: cardDimensions.height,
                            }}
                        >
                            {/* RENDER YOUR LAYOUT HERE */}
                            <div className="flex-grow relative rounded-xl overflow-hidden">
                                <SugarcaneLayout bg={card.bg} products={card.products} />
                            </div>

                            {/* Text Section - sits at the bottom */}
                            <div className="text-center pt-3 font-serif text-gray-700">
                                <p className="text-lg font-semibold">{card.title || "Dragon's Reserve Collection"}</p>
                                <p className="text-sm opacity-80">{card.description || "Swipe to explore more premium rums."}</p>
                            </div>
                        </motion.div>
                    </CardRotate>
                );
            })}
        </div>
    );
}