import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { getWardrobeSuggestions } from '../utils/fashionLogic';
import { Sparkles, ShoppingBag, Shirt, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Stylist = () => {
    const { userProfile, wardrobe } = useUser();
    const [occasion, setOccasion] = useState('casual');
    const [suggestions, setSuggestions] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGetAdvice = () => {
        setLoading(true);
        // Simulate AI processing time
        setTimeout(() => {
            const results = getWardrobeSuggestions(wardrobe, occasion, userProfile.gender);
            setSuggestions(results);
            setLoading(false);
        }, 1500);
    };

    const OutfitCard = ({ items, title, description, type }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-purple-500/50 transition-all shadow-xl"
        >
            <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl ${type === 'closet' ? 'bg-green-500/20 text-green-400' : type === 'mix' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                    {type === 'closet' ? <Shirt size={24} /> : type === 'mix' ? <Sparkles size={24} /> : <ShoppingBag size={24} />}
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white">{title}</h3>
                    <p className="text-sm text-gray-400">{description}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                {items.map((item, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="relative group rounded-2xl overflow-hidden"
                    >
                        <div className="aspect-[3/4] bg-gray-900/50 relative">
                            {item.image ? (
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-600 bg-gradient-to-br from-gray-800 to-gray-900">
                                    <Shirt size={32} />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                                <p className="text-sm font-bold text-white truncate">{item.name}</p>
                                <p className="text-xs text-gray-300">{item.store || 'My Wardrobe'}</p>
                            </div>
                        </div>

                        {item.link && (
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 bg-purple-900/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                            >
                                <span className="bg-white text-purple-900 px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                    Shop Now <ArrowRight size={14} />
                                </span>
                            </a>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );

    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            <div className="text-center mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-white mb-6"
                >
                    Your Personal Stylist
                </motion.h1>
                <p className="text-xl text-purple-200 max-w-2xl mx-auto">
                    Get outfit recommendations based on your wardrobe, body type, and the occasion.
                </p>
            </div>

            {/* Controls */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl mx-auto bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 mb-16 shadow-2xl"
            >
                <label className="block text-lg font-medium text-purple-200 mb-4">Where are you going?</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {['casual', 'office', 'date', 'wedding'].map((occ) => (
                        <button
                            key={occ}
                            onClick={() => setOccasion(occ)}
                            className={`py-3 rounded-xl capitalize transition-all font-medium ${occasion === occ
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 scale-105'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {occ}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleGetAdvice}
                    disabled={loading}
                    className="w-full bg-white text-purple-900 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-white/20 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-900"></div>
                            Curating your look...
                        </>
                    ) : (
                        <>
                            <Sparkles size={22} />
                            Style Me
                        </>
                    )}
                </button>
            </motion.div>

            {/* Results */}
            {suggestions && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* 1. From Closet */}
                    {suggestions.closet.length > 0 ? (
                        <OutfitCard
                            items={suggestions.closet}
                            title="From Your Closet"
                            description="Ready to wear right now."
                            type="closet"
                        />
                    ) : (
                        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                            <div className="bg-white/10 p-4 rounded-full mb-4">
                                <Shirt size={40} className="text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Nothing in Closet</h3>
                            <p className="text-gray-400">Add more items to your wardrobe for instant matches.</p>
                        </div>
                    )}

                    {/* 2. Mix & Match */}
                    {suggestions.mixMatch.length > 0 ? (
                        <OutfitCard
                            items={suggestions.mixMatch}
                            title="Mix & Match"
                            description="Pair your clothes with something new."
                            type="mix"
                        />
                    ) : (
                        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                            <div className="bg-white/10 p-4 rounded-full mb-4">
                                <Sparkles size={40} className="text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No Mix Matches</h3>
                            <p className="text-gray-400">Couldn't find a perfect mix this time.</p>
                        </div>
                    )}

                    {/* 3. New Look */}
                    {suggestions.newLook.items.length > 0 && (
                        <OutfitCard
                            items={suggestions.newLook.items}
                            title="Shop the Look"
                            description={suggestions.newLook.description.split('\n')[0].replace('**', '').replace('**', '')} // Simple cleanup
                            type="shop"
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Stylist;
