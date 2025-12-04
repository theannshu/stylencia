import React from 'react';
import { motion } from 'framer-motion';

const BackgroundLayout = ({ children }) => {
    // Generate random petals
    const petals = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        duration: 10 + Math.random() * 20,
        delay: Math.random() * 10,
        size: 10 + Math.random() * 20,
        rotation: Math.random() * 360
    }));

    return (
        <div className="relative min-h-screen bg-[#0f0c29] overflow-hidden text-white">
            {/* Base Gradient Background */}
            <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]" />

            {/* Animated Gradient Orbs */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-600/20 rounded-full blur-[100px]"
                />
            </div>

            {/* Falling Petals Animation */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {petals.map((petal) => (
                    <motion.div
                        key={petal.id}
                        initial={{ y: -20, x: `${petal.x}vw`, opacity: 0, rotate: petal.rotation }}
                        animate={{
                            y: '120vh',
                            x: `${petal.x + (Math.random() * 10 - 5)}vw`,
                            opacity: [0, 1, 1, 0],
                            rotate: petal.rotation + 360
                        }}
                        transition={{
                            duration: petal.duration,
                            repeat: Infinity,
                            delay: petal.delay,
                            ease: "linear"
                        }}
                        className="absolute"
                        style={{ width: petal.size, height: petal.size }}
                    >
                        {/* Simple SVG Petal Shape */}
                        <svg viewBox="0 0 24 24" fill="rgba(255, 192, 203, 0.3)" className="w-full h-full drop-shadow-lg">
                            <path d="M12 2C12 2 14 8 18 10C22 12 22 14 18 16C14 18 12 22 12 22C12 22 10 18 6 16C2 14 2 12 6 10C10 8 12 2 12 2Z" />
                        </svg>
                    </motion.div>
                ))}
            </div>

            {/* Content Wrapper */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default BackgroundLayout;
