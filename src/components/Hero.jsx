import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f0c29] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/30 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="mb-4 text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-white drop-shadow-lg">
                        Your Personal AI<br />Fashion Stylist
                    </h1>
                    <p className="mb-8 text-lg md:text-xl font-normal text-gray-300 lg:text-2xl sm:px-16 xl:px-48 max-w-4xl mx-auto">
                        Manage your digital wardrobe, get outfit recommendations based on your body type, and shop the perfect look for any occasion.
                    </p>
                    <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <Link to="/profile" className="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-300 shadow-lg shadow-purple-500/30 transition-all transform hover:scale-105">
                            Create Style Profile
                            <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
                        </Link>
                        <Link to="/stylist" className="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-center text-gray-300 rounded-lg border border-gray-600 hover:text-white hover:bg-gray-800 focus:ring-4 focus:ring-gray-700 backdrop-blur-sm transition-all">
                            Start Styling
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

