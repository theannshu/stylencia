import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { getWardrobeSuggestions } from '../utils/fashionLogic';
import { Sparkles, ShoppingBag, Shirt, ArrowRight } from 'lucide-react';

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
        <div className="bg-white/10 rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all">
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${type === 'closet' ? 'bg-green-500/20 text-green-400' : type === 'mix' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                    {type === 'closet' ? <Shirt size={20} /> : type === 'mix' ? <Sparkles size={20} /> : <ShoppingBag size={20} />}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    <p className="text-sm text-gray-400">{description}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                {items.map((item, idx) => (
                    <div key={idx} className="relative group">
                        <div className="aspect-square bg-gray-900/50 rounded-xl overflow-hidden mb-2">
                            {item.image ? (
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-600">
                                    <Shirt size={32} />
                                </div>
                            )}
                        </div>
                        <p className="text-sm font-medium text-white truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.store || 'My Wardrobe'}</p>

                        {item.link && (
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                                    Shop <ArrowRight size={14} />
                                </span>
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                    Your Personal Stylist
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Get outfit recommendations based on your wardrobe, body type, and the occasion.
                </p>
            </div>

            {/* Controls */}
            <div className="max-w-xl mx-auto bg-white/5 p-6 rounded-2xl border border-white/10 mb-12">
                <label className="block text-sm font-medium text-gray-300 mb-2">Where are you going?</label>
                <div className="flex gap-4 mb-6">
                    {['casual', 'office', 'date', 'wedding'].map((occ) => (
                        <button
                            key={occ}
                            onClick={() => setOccasion(occ)}
                            className={`flex-1 py-2 rounded-lg capitalize transition-all ${occasion === occ
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                                }`}
                        >
                            {occ}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleGetAdvice}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Styling you...
                        </>
                    ) : (
                        <>
                            <Sparkles size={20} />
                            Style Me
                        </>
                    )}
                </button>
            </div>

            {/* Results */}
            {suggestions && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
                    {/* 1. From Closet */}
                    {suggestions.closet.length > 0 ? (
                        <OutfitCard
                            items={suggestions.closet}
                            title="From Your Closet"
                            description="Ready to wear right now."
                            type="closet"
                        />
                    ) : (
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                            <Shirt size={48} className="text-gray-600 mb-4" />
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
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                            <Sparkles size={48} className="text-gray-600 mb-4" />
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
