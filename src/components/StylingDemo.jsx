import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, User, Info } from 'lucide-react';
import { generateOutfit } from '../utils/fashionLogic';
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
    const [result, setResult] = useState(null); // { description: string, items: [] }

    const handleGenerate = () => {
        if (!selectedOccasion) return;
        setIsGenerating(true);
        setResult(null);

        // Simulate Expert Engine processing
        setTimeout(() => {
            const outfit = generateOutfit(gender, selectedOccasion);
            setResult(outfit);
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <section id="demo" className="py-20 bg-[#0f0c29] text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ask Stylencia</h2>
                <p className="text-gray-400 mb-8">Select your preferences to get a curated look designed by fashion experts.</p>

                <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl">

                    {/* Gender Filter */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-black/40 p-1 rounded-full flex items-center border border-white/10">
                            <button
                                onClick={() => { setGender('women'); setResult(null); }}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${gender === 'women' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                Women
                            </button>
                            <button
                                onClick={() => { setGender('men'); setResult(null); }}
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
                                onClick={() => { setSelectedOccasion(occ.id); setResult(null); }}
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
                    <div className="min-h-[300px]">
                        <AnimatePresence mode="wait">
                            {result ? (
                                <motion.div
                                    key="results"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="text-left"
                                >
                                    {/* Outfit Summary Box */}
                                    <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-xl p-6 mb-8 flex items-start gap-4">
                                        <Info className="w-6 h-6 text-purple-300 flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="text-lg font-bold text-purple-200 mb-2">Stylencia's Pick</h3>
                                            <p className="text-gray-200 leading-relaxed">{result.description}</p>
                                        </div>
                                    </div>

                                    {/* Product Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {result.items.map((product) => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center h-60 text-gray-500"
                                >
                                    {isGenerating ? (
                                        <div className="flex flex-col items-center gap-4">
                                            <RefreshCw className="w-12 h-12 text-purple-500 animate-spin" />
                                            <p className="text-xl font-medium text-purple-300 animate-pulse">Stylencia is curating your look...</p>
                                            <p className="text-sm text-gray-400">Analyzing color theory & style trends</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <User className="w-16 h-16 mb-4 opacity-20" />
                                            <p className="text-lg">Select gender & occasion, then click <span className="text-purple-400 font-bold">Generate</span> to see Stylencia's recommendations.</p>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StylingDemo;
