// components/SugarcaneStack.jsx
'use client';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState } from 'react';
import SugarcaneLayout from '@/components/home_page/sugarcane_layout/page';

function CardRotate({ children, onSendToBack, onSwipeLeft, onSwipeRight, sensitivity, dragEnabled }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [60, -60]);
    const rotateY = useTransform(x, [-100, 100], [-60, 60]);

    function handleDragEnd(_, info) {
        if (info.offset.x < -sensitivity) {
            onSwipeLeft();
        } else if (info.offset.x > sensitivity) {
            onSwipeRight();
        } else {
            x.set(0);
            y.set(0);
        }
    }

    return (
        <motion.div
            className={`absolute top-0 left-0 w-full h-full ${dragEnabled ? 'cursor-grab' : 'pointer-events-none'}`}
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
    cardsData = [],
    animationConfig = { stiffness: 260, damping: 20 },
}) {
    const [cards, setCards] = useState([...cardsData].reverse());

    const sendToBack = (id) => {
        setCards((prev) => {
            const newCards = [...prev];
            const index = newCards.findIndex((card) => card.id === id);
            const [card] = newCards.splice(index, 1);
            newCards.unshift(card);
            return newCards;
        });
    };

    const goNext = () => {
        setCards((prev) => {
            const newCards = [...prev];
            const topCard = newCards.pop();
            newCards.unshift(topCard);
            return newCards;
        });
    };

    const goPrev = () => {
        setCards((prev) => {
            const newCards = [...prev];
            const bottomCard = newCards.shift();
            newCards.push(bottomCard);
            return newCards;
        });
    };

    return (
        <div
            className="relative w-full h-full"
            style={{
                perspective: 600,
            }}
        >
            {cards.map((card, index) => {
                const isTopCard = index === cards.length - 1;

                return (
                    <CardRotate
                        key={card.id}
                        onSendToBack={() => sendToBack(card.id)}
                        onSwipeLeft={goNext}
                        onSwipeRight={goPrev}
                        sensitivity={sensitivity}
                        dragEnabled={isTopCard}
                    >
                        <motion.div
                            className="w-full h-full rounded-2xl overflow-hidden bg-white flex flex-col shadow-xl border-4 border-white"
                            animate={{
                                rotateZ: (cards.length - index - 1) * 2,
                                scale: 1 + index * 0.04 - cards.length * 0.04,
                                transformOrigin: '90% 90%',
                            }}
                            initial={false}
                            transition={{
                                type: 'spring',
                                stiffness: animationConfig.stiffness,
                                damping: animationConfig.damping,
                            }}
                        >
                            <div className="grow relative rounded-xl overflow-hidden">
                                <SugarcaneLayout bg={card.bg} products={card.products} />
                            </div>

                            <div className="text-center pt-3 font-serif text-gray-700">
                                <p className="text-sm md:text-base lg:text-lg font-semibold">Page {card.pageNumber}</p>
                                <p className="text-sm md:text-base lg:text-lg opacity-80">{card.description || "Swipe left or right to explore more premium rums."}</p>
                            </div>
                        </motion.div>
                    </CardRotate>
                );
            })}
        </div>
    );
}