import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FashionThrobber = () => {
    const [currentOutfit, setCurrentOutfit] = useState(0);
    const outfits = ['dress', 'shirt', 'jacket'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentOutfit((prev) => (prev + 1) % outfits.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const hangerPath = "M12 4C9.79086 4 8 5.79086 8 8L4 10L12 14L20 10L16 8C16 5.79086 14.2091 4 12 4ZM12 2C15.3137 2 18 4.68629 18 8V8.5L22 10.5L12 15.5L2 10.5L6 8.5V8C6 4.68629 8.68629 2 12 2Z";
    // Simplified SVG paths for demonstration - replace with more detailed paths if needed
    const outfitPaths = {
        dress: "M8 10L6 20H18L16 10H8Z", // Placeholder simple dress shape
        shirt: "M6 10L4 14L6 14L6 20H18V14L20 14L18 10H6Z", // Placeholder shirt
        jacket: "M6 10L4 20H8V20H16V20H20L18 10H6Z" // Placeholder jacket
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f0c29] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px]" />

            <div className="relative w-32 h-32 mb-8">
                {/* Hanger */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-white/50 absolute top-[-20px]">
                    <path d="M16 8.5C16 5.5 14.5 4 12 4C9.5 4 8 5.5 8 8.5" />
                    <path d="M12 4V2" />
                    <path d="M4 10L12 14L20 10" strokeWidth="2" />
                    <path d="M4 10L8 8.5" />
                    <path d="M20 10L16 8.5" />
                </svg>

                {/* Animated Clothes */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={outfits[currentOutfit]}
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="absolute top-[35px] inset-x-0 mx-auto flex justify-center"
                    >
                        {outfits[currentOutfit] === 'dress' && (
                            <svg width="80" height="100" viewBox="0 0 100 120" fill="none" className="text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]">
                                <path d="M30 0 L20 10 L25 40 L10 120 H90 L75 40 L80 10 L70 0 H30 Z" fill="currentColor" fillOpacity="0.8" />
                            </svg>
                        )}
                        {outfits[currentOutfit] === 'shirt' && (
                            <svg width="90" height="90" viewBox="0 0 100 100" fill="none" className="text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]">
                                <path d="M30 0 L10 20 L20 30 L30 20 V100 H70 V20 L80 30 L90 20 L70 0 H30 Z" fill="currentColor" fillOpacity="0.8" />
                            </svg>
                        )}
                        {outfits[currentOutfit] === 'jacket' && (
                            <svg width="90" height="90" viewBox="0 0 100 100" fill="none" className="text-purple-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.5)]">
                                <path d="M35 0 L10 25 V90 H45 V30 H55 V90 H90 V25 L65 0 H35 Z" fill="currentColor" fillOpacity="0.8" />
                            </svg>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            >
                <h2 className="text-2xl font-light tracking-[0.2em] text-white uppercase text-center">
                    Stylencia
                </h2>
                <p className="text-sm text-gray-400 text-center mt-2 tracking-wide">
                    Curating your wardrobe...
                </p>
            </motion.div>
        </div>
    );
};

export default FashionThrobber;
