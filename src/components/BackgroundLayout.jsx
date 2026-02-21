import React from 'react';
import { motion } from 'framer-motion';

const BackgroundLayout = ({ children }) => {
    // Generate random petals (Reduced count for performance)
    const petals = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        duration: 15 + Math.random() * 20, // Slower for smoother feel
        delay: Math.random() * 10,
        size: 10 + Math.random() * 20,
        rotation: Math.random() * 360
    }));

    return (
        <div className="relative min-h-screen bg-[#050510] overflow-hidden text-white">
            {/* Base Gradient Background */}
            <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2d033b] via-[#050510] to-[#000000] will-change-transform" />

            {/* Noise Texture Overlay for Luxury Feel */}
            <div className="fixed inset-0 z-[1] opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Animated Gradient Orbs */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2], // Reduced opacity for subtlety
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} // Smoother ease
                    className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] will-change-transform"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{ duration: 15, repeat: Infinity, delay: 2, ease: "easeInOut" }}
                    className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-600/20 rounded-full blur-[120px] will-change-transform"
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
                            opacity: [0, 0.8, 0.8, 0],
                            rotate: petal.rotation + 360
                        }}
                        transition={{
                            duration: petal.duration,
                            repeat: Infinity,
                            delay: petal.delay,
                            ease: "linear"
                        }}
                        className="absolute will-change-transform"
                        style={{ width: petal.size, height: petal.size }}
                    >
                        {/* Simple SVG Petal Shape */}
                        <svg viewBox="0 0 24 24" fill="rgba(255, 192, 203, 0.2)" className="w-full h-full drop-shadow-lg">
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
