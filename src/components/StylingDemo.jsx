import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, User } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from './ProductCard';

const occasions = [
    { id: 'wedding', label: 'Wedding Guest', emoji: '💍' },
    { id: 'office', label: 'Office / Professional', emoji: '💼' },
    { id: 'date', label: 'Date Night', emoji: '🍷' },
    { id: 'casual', label: 'Weekend Casual', emoji: '☕' },
];

const StylingDemo = () => {
    const [selectedOccasion, setSelectedOccasion] = useState(null);
    const [gender, setGender] = useState('women'); // 'women' or 'men'
    const [isGenerating, setIsGenerating] = useState(false);
    const [resultProducts, setResultProducts] = useState([]);

    const handleGenerate = () => {
        if (!selectedOccasion) return;
        setIsGenerating(true);
        setResultProducts([]);

        // Simulate AI processing
        setTimeout(() => {
            // Filter products based on gender and occasion
            const filtered = products.filter(p =>
                p.tags.includes(gender) && p.tags.includes(selectedOccasion)
            );

            setResultProducts(filtered);
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <section id="demo" className="py-20 bg-[#0f0c29] text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Try the AI Stylist</h2>
                <p className="text-gray-400 mb-8">Select your preferences to get a curated look with shoppable links.</p>

                <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl">

                    {/* Gender Filter */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-black/40 p-1 rounded-full flex items-center border border-white/10">
                            <button
                                onClick={() => { setGender('women'); setResultProducts([]); }}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${gender === 'women' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                Women
                            </button>
                            <button
                                onClick={() => { setGender('men'); setResultProducts([]); }}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${gender === 'men' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                Men
                            </button>
                        </div>
                    </div>

                    {/* Occasion Selection */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {occasions.map((occ) => (
                            <button
                                key={occ.id}
                                onClick={() => { setSelectedOccasion(occ.id); setResultProducts([]); }}
                                className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2
                  ${selectedOccasion === occ.id
                                        ? 'bg-purple-600/20 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/30'
                                    }`}
                            >
                                <span className="text-2xl">{occ.emoji}</span>
                                <span className="font-medium text-sm">{occ.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Generate Button */}
                    <div className="flex justify-center mb-10">
                        <button
                            onClick={handleGenerate}
                            disabled={!selectedOccasion || isGenerating}
                            className={`px-8 py-3 rounded-full font-bold text-lg flex items-center gap-2 transition-all
                ${!selectedOccasion
                                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105'
                                }`}
                        >
                            {isGenerating ? (
                                <>
                                    <RefreshCw className="animate-spin" /> Curating Look...
                                </>
                            ) : (
                                <>
                                    <Sparkles /> Generate Outfit
                                </>
                            )}
                        </button>
                    </div>

                    {/* Results Area */}
                    <div className="min-h-[200px]">
                        <AnimatePresence mode="wait">
                            {resultProducts.length > 0 ? (
                                <motion.div
                                    key="results"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                                >
                                    {resultProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </motion.div>
                            ) : (
                                !isGenerating && (
                                    <motion.div
                                        key="placeholder"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center justify-center h-40 text-gray-500 italic"
                                    >
                                        <User className="w-12 h-12 mb-2 opacity-20" />
                                        <p>Select gender & occasion to see AI recommendations.</p>
                                    </motion.div>
                                )
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StylingDemo;
