import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Heart, Download, ChevronDown, Sparkles } from 'lucide-react';

const Candle = ({ onExtinguish }) => {
    const [isLit, setIsLit] = useState(true);

    const handleBlow = () => {
        setIsLit(false);
        setTimeout(onExtinguish, 1500); // Wait for smoke animation
    };

    return (
        <div className="flex flex-col items-center cursor-pointer group" onClick={handleBlow}>
            <div className="relative w-8 h-40 bg-gradient-to-b from-[#e0e0e0] to-[#bdbdbd] rounded-b-lg shadow-2xl">
                {/* Wax Drips */}
                <div className="absolute top-0 left-0 w-full h-4 bg-white rounded-full blur-[1px]"></div>
                <div className="absolute top-2 left-1/4 w-2 h-8 bg-white rounded-full opacity-80"></div>

                {/* Wick */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-black"></div>

                {/* Flame */}
                <AnimatePresence>
                    {isLit && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="absolute -top-16 left-1/2 transform -translate-x-1/2"
                        >
                            <div className="relative w-8 h-12 bg-gradient-to-b from-yellow-300 via-orange-500 to-red-600 rounded-[50%] rounded-t-[0] rounded-bl-[40%] rounded-br-[40%] animate-pulse filter blur-[2px] shadow-[0_0_40px_rgba(255,200,0,0.6)]"></div>
                            {/* Inner Flame */}
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-6 bg-blue-300 rounded-full blur-[1px] opacity-70"></div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Smoke when out */}
                {!isLit && (
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 0.6, y: -50, x: 10 }}
                        transition={{ duration: 2 }}
                        className="absolute -top-20 left-1/2 w-2 h-20 bg-gray-400 blur-md rounded-full"
                        style={{ filter: 'url(#turbulence)' }}
                    />
                )}
            </div>

            <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-12 text-rose-200/80 font-playfair tracking-widest text-sm uppercase"
            >
                {isLit ? "Extinguish to Make a Wish" : "Your Wish is Heard..."}
            </motion.p>
        </div>
    );
};

const WelcomeScreen = ({ onComplete }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            className="fixed inset-0 z-[100] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-[#1a0b2e] to-black flex flex-col items-center justify-center p-6 text-center"
        >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mb-16 relative"
            >
                <Sparkles className="absolute -top-8 -left-8 text-yellow-500 w-8 h-8 animate-spin-slow opacity-50" />
                <h1 className="text-4xl md:text-6xl font-playfair text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    For The Birthday Queen
                </h1>
                <Sparkles className="absolute -bottom-8 -right-8 text-yellow-500 w-6 h-6 animate-pulse opacity-50" />
            </motion.div>

            <Candle onExtinguish={onComplete} />
        </motion.div>
    );
};

const Divyanka18 = () => {
    const [showWelcome, setShowWelcome] = useState(true);
    const [secondsAlive, setSecondsAlive] = useState(0);
    const { scrollYProgress } = useScroll();

    // Calculate seconds alive
    useEffect(() => {
        const birthDate = new Date('January 10, 2008 00:00:00');

        const interval = setInterval(() => {
            const now = new Date();
            const diffInSeconds = Math.floor((now - birthDate) / 1000);
            setSecondsAlive(diffInSeconds);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Variant for fade-in animations
    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
    };

    const scaleIn = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: "circOut" } }
    };

    return (
        <>
            <AnimatePresence>
                {showWelcome && <WelcomeScreen onComplete={() => setShowWelcome(false)} />}
            </AnimatePresence>

            {!showWelcome && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="bg-[#050505] text-[#e0e0e0] font-serif min-h-screen overflow-x-hidden selection:bg-rose-900 selection:text-white"
                >

                    {/* Immersive Scroll Progress */}
                    <motion.div
                        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-yellow-500 to-rose-500 z-50 origin-left"
                        style={{ scaleX: scrollYProgress }}
                    />

                    {/* --- HERO SECTION --- */}
                    <section className="h-screen relative flex items-center justify-center overflow-hidden">
                        {/* Background Particles/Glow */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-900/20 rounded-full blur-[100px] animate-pulse"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
                        </div>

                        <motion.div
                            className="z-10 text-center px-4"
                            initial="hidden"
                            animate="visible"
                            variants={scaleIn}
                        >
                            <motion.div
                                className="text-yellow-500 tracking-[0.3em] text-sm md:text-lg mb-4 uppercase"
                                initial={{ opacity: 0, letterSpacing: "0.1em" }}
                                animate={{ opacity: 1, letterSpacing: "0.3em" }}
                                transition={{ duration: 1.5 }}
                            >
                                The Muse. The Moment. The Birthday.
                            </motion.div>
                            <h1 className="text-6xl md:text-9xl font-playfair bg-clip-text text-transparent bg-gradient-to-b from-white via-rose-100 to-rose-400 drop-shadow-2xl">
                                Divyanka
                            </h1>
                            <motion.div
                                className="text-7xl md:text-9xl font-cursive text-rose-500 mt-[-10px] md:mt-[-20px]"
                                initial={{ opacity: 0, rotate: -10 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                18
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <ChevronDown className="w-8 h-8 text-rose-300/50" />
                        </motion.div>
                    </section>

                    {/* --- CHAPTER 1: THE BEGINNING (Nostalgia) --- */}
                    <section className="min-h-screen py-20 px-6 max-w-4xl mx-auto flex flex-col justify-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={fadeInUp}
                        >
                            <h2 className="text-3xl md:text-5xl border-l-4 border-yellow-600 pl-6 mb-12 italic text-rose-100/90">
                                Chapter I: The Bloom
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div className="relative group">
                                    <div className="absolute -inset-2 bg-gradient-to-r from-yellow-600 to-rose-600 rounded-lg opacity-30 group-hover:opacity-60 transition delay-75 blur-md"></div>
                                    {/* PLACEHOLDER: Replace src with actual childhood photo */}
                                    <div className="relative h-96 bg-sepia-900 rounded-lg overflow-hidden sepia-[.3] contrast-125 saturate-50 shadow-2xl transform rotate-[-2deg] hover:rotate-0 transition-all duration-700">
                                        <img
                                            src="https://images.unsplash.com/photo-1596464716127-f9a86255b2b3?q=80&w=2070&auto=format&fit=crop"
                                            alt="Childhood Memory"
                                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                        />
                                    </div>
                                </div>
                                <div className="font-light text-lg md:text-xl leading-relaxed text-gray-300">
                                    <p className="mb-6">
                                        From the very first moment, there was a spark. A light that promised to shine brighter than the stars.
                                    </p>
                                    <p>
                                        Jan 10, 2008 marked the beginning of a story written in laughter, curiosity, and an undeniable grace.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    {/* --- CHAPTER 2: THE GOLDEN HOUR (Recent) --- */}
                    <section className="min-h-screen py-20 px-6 relative">
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                className="text-right mb-16"
                            >
                                <h2 className="text-4xl md:text-6xl text-rose-500 font-bold mb-2">Golden Hour</h2>
                                <p className="text-yellow-500/80 uppercase tracking-widest">Eighteen Years of Elegance</p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
                                {/* Photo 1 - Tall */}
                                <motion.div
                                    className="row-span-2 relative rounded-2xl overflow-hidden border border-rose-900/30"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" className="w-full h-full object-cover" alt="Recent 1" />
                                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                        <p className="text-white font-serif italic text-xl">Radiance</p>
                                    </div>
                                </motion.div>

                                {/* Photo 2 */}
                                <motion.div
                                    className="relative rounded-2xl overflow-hidden border border-rose-900/30"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1887&auto=format&fit=crop" className="w-full h-full object-cover" alt="Recent 2" />
                                </motion.div>

                                {/* Photo 3 */}
                                <motion.div
                                    className="md:col-start-2 row-span-2 relative rounded-2xl overflow-hidden border border-rose-900/30"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop" className="w-full h-full object-cover" alt="Recent 3" />
                                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                        <p className="text-white font-serif italic text-xl">Grace</p>
                                    </div>
                                </motion.div>

                                {/* Photo 4 */}
                                <motion.div
                                    className="relative rounded-2xl overflow-hidden border border-rose-900/30"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <img src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1727&auto=format&fit=crop" className="w-full h-full object-cover" alt="Recent 4" />
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* --- COUNTDOWN --- */}
                    <section className="py-32 bg-gradient-to-b from-[#050505] to-[#110505] text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="text-rose-400 mb-4 uppercase tracking-[0.2em] text-sm">Every second you've been in this world</p>
                            <div className="text-5xl md:text-8xl font-mono text-white font-bold tabular-nums">
                                {secondsAlive.toLocaleString()}
                            </div>
                            <p className="text-gray-500 mt-4 text-lg">Seconds of Pure Magic</p>
                        </motion.div>
                    </section>

                    {/* --- LETTER SECTION --- */}
                    <section className="min-h-screen flex items-center justify-center p-6 relative">
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                            <Heart className="w-[500px] h-[500px] text-rose-600 animate-pulse" />
                        </div>

                        <div className="max-w-2xl bg-[#0a0a0a]/80 backdrop-blur-sm border border-rose-900/20 p-8 md:p-16 rounded-sm shadow-2xl relative">
                            <div className="absolute -top-6 -left-6 text-6xl text-yellow-600/20 font-serif">"</div>

                            <h3 className="text-3xl text-rose-100 font-serif mb-8 text-center border-b border-rose-900/30 pb-4">
                                To The Birthday Queen
                            </h3>

                            <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed font-light font-serif">
                                <p>
                                    Divyanka, turning 18 isn't just a milestone; it's the unveiling of the masterpiece you are becoming.
                                </p>
                                <p>
                                    From the laughter of your childhood to the breathtaking grace you hold today, every moment has been a privilege to witness. You are the protagonist of a beautiful story, and this new chapter promises to be the most exciting yet.
                                </p>
                                <p>
                                    May your day be as stunning as your smile and as golden as your heart.
                                </p>
                                <p className="text-right pt-6 text-rose-400 font-medium">
                                    — Forever Your Biggest Fan
                                </p>
                            </div>

                            <div className="relative mt-12 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500 to-transparent">
                                <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-rose-500 fill-current animate-bounce" />
                            </div>
                        </div>
                    </section>

                    {/* --- FOOTER & DOWNLOAD --- */}
                    <footer className="py-20 text-center relative z-10 bg-[#020202]">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block"
                        >
                            <a
                                href="/assets/birthday-story.mp4"
                                download="Divyanka18_Story.mp4"
                                className="flex items-center gap-3 bg-gradient-to-r from-rose-700 to-pink-600 text-white px-8 py-4 rounded-full shadow-lg shadow-rose-900/20 hover:shadow-rose-900/40 transition-all group"
                            >
                                <Download className="w-5 h-5 group-hover:animate-bounce" />
                                <span className="font-medium tracking-wide">Download Instagram Story</span>
                            </a>
                        </motion.div>

                        <p className="mt-8 text-xs text-gray-600 uppercase tracking-widest">
                            © 2026 Stylencia x Divyanka
                        </p>
                    </footer>

                </motion.div>
            )}
        </>
    );
};

export default Divyanka18;
