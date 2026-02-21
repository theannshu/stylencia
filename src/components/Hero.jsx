import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Hero = () => {
    const { currentUser } = useUser();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Ambient Background Glow */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-8 backdrop-blur-sm"
                    >
                        <Sparkles size={16} />
                        <span>AI-Powered Personal Styling</span>
                    </motion.div>

                    <h1 className="font-logo text-6xl md:text-8xl lg:text-9xl text-white mb-6 tracking-tight leading-none">
                        Elevate Your <br />
                        <span className="text-primary italic drop-shadow-[0_0_15px_rgba(216,180,254,0.6)]">
                            Aura
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 font-light leading-relaxed">
                        Curate your digital wardrobe, discover your unique style persona, and let AI craft perfect outfits for every occasion.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link
                            to={currentUser ? "/stylist" : "/signup"}
                            className="group relative px-8 py-4 bg-white text-[#050510] rounded-full font-bold text-lg overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {currentUser ? "Go to AI Stylist" : "Start Styling Free"}
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>

                        <Link
                            to="/features"
                            className="px-8 py-4 rounded-full border border-white/10 text-white font-medium hover:bg-white/5 transition-colors backdrop-blur-sm"
                        >
                            Explore Features
                        </Link>
                    </div>

                    {/* Stats / Trust Badges */}
                    <div className="mt-20 pt-10 border-t border-white/5 grid grid-cols-3 gap-8 md:gap-20 text-center">
                        <div>
                            <div className="text-3xl font-logo text-white mb-1">10k+</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">Outfits Generated</div>
                        </div>
                        <div>
                            <div className="text-3xl font-logo text-white mb-1">5k+</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">Happy Users</div>
                        </div>
                        <div>
                            <div className="text-3xl font-logo text-white mb-1">4.9</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">Star Rating</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Parallax Background Elements */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[20%] right-[10%] opacity-20 transform rotate-12">
                    <Star size={40} className="text-primary animate-pulse" />
                </div>
                <div className="absolute bottom-[30%] left-[10%] opacity-20 transform -rotate-12">
                    <Star size={24} className="text-secondary animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
