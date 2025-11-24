import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, RefreshCw } from 'lucide-react';

const occasions = [
    { id: 'wedding', label: 'Wedding Guest', emoji: '💍' },
    { id: 'office', label: 'Office / Professional', emoji: '💼' },
    { id: 'date', label: 'Date Night', emoji: '🍷' },
    { id: 'casual', label: 'Weekend Casual', emoji: '☕' },
];

const mockResults = {
    wedding: {
        upper: "Silk Chiffon Blouse in Pale Gold",
        lower: "High-Waisted Pleated Midi Skirt (Emerald Green)",
        shoes: "Nude Strappy Heels",
        accessories: "Pearl Drop Earrings + Gold Clutch"
    },
    office: {
        upper: "Crisp White Button-Down Shirt",
        lower: "Tailored Navy Trousers",
        shoes: "Black Leather Loafers",
        accessories: "Minimalist Silver Watch"
    },
    date: {
        upper: "Black Lace Bodysuit",
        lower: "Dark Wash Skinny Jeans",
        shoes: "Ankle Boots with Heel",
        accessories: "Layered Gold Necklaces"
    },
    casual: {
        upper: "Oversized Beige Knit Sweater",
        lower: "Vintage Wash Mom Jeans",
        shoes: "White Canvas Sneakers",
        accessories: "Canvas Tote Bag"
    }
};

const StylingDemo = () => {
    const [selectedOccasion, setSelectedOccasion] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState(null);

    const handleGenerate = () => {
        if (!selectedOccasion) return;
        setIsGenerating(true);
        setResult(null);

        // Simulate AI processing
        setTimeout(() => {
            setResult(mockResults[selectedOccasion]);
            setIsGenerating(false);
        }, 2000);
    };

    return (
        <section id="demo" className="py-20 bg-[#0f0c29] text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">Try the AI Stylist</h2>
                <p className="text-gray-400 mb-12">Select an occasion to see how Stylencia curates your look.</p>

                <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl">
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
                    <div className="flex justify-center mb-8">
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
                                    <RefreshCw className="animate-spin" /> Styling...
                                </>
                            ) : (
                                <>
                                    <Sparkles /> Generate Look
                                </>
                            )}
                        </button>
                    </div>

                    {/* Results Area */}
                    <div className="min-h-[200px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {result ? (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="w-full text-left bg-black/30 rounded-xl p-6 border border-purple-500/30"
                                >
                                    <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                                        <Check className="w-5 h-5" /> Recommended Outfit
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <div>
                                                <span className="text-xs uppercase tracking-wider text-gray-500">Upper Wear</span>
                                                <p className="font-medium text-lg">{result.upper}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs uppercase tracking-wider text-gray-500">Lower Wear</span>
                                                <p className="font-medium text-lg">{result.lower}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <span className="text-xs uppercase tracking-wider text-gray-500">Footwear</span>
                                                <p className="font-medium text-lg">{result.shoes}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs uppercase tracking-wider text-gray-500">Accessories</span>
                                                <p className="font-medium text-lg">{result.accessories}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                !isGenerating && (
                                    <motion.div
                                        key="placeholder"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-gray-500 italic"
                                    >
                                        Select an occasion and click generate to see the magic.
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
