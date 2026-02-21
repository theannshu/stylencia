import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import {
    getWardrobeSuggestions,
    getColorPalette,
    getBodyTypeAdvice,
    getFaceShapeAdvice,
    getHeightAdvice
} from '../utils/fashionLogic';
import {
    Sparkles, ShoppingBag, Shirt, ArrowRight, Star,
    Zap, Heart, Palette, User, ExternalLink, IndianRupee, Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// ─── Store Badge Colors ───────────────────────────────────────────────────────
const storeBadgeColors = {
    Myntra: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    Amazon: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    Flipkart: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    Ajio: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    Nike: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    Manyavar: 'bg-red-500/20 text-red-300 border-red-500/30',
};

// ─── Star Rating Component ────────────────────────────────────────────────────
const StarRating = ({ rating }) => {
    const stars = Math.round(rating);
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
                <Star
                    key={i}
                    size={12}
                    className={i <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                />
            ))}
            <span className="text-xs text-gray-400 ml-1">{rating}</span>
        </div>
    );
};

// ─── Product Card ─────────────────────────────────────────────────────────────
const ProductCard = ({ item }) => {
    const badgeClass = storeBadgeColors[item.store] || 'bg-white/10 text-gray-300 border-white/10';
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all flex flex-col"
        >
            {/* Image */}
            <div className="aspect-[3/4] relative overflow-hidden bg-gray-900">
                {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600 bg-gradient-to-br from-gray-800 to-gray-900">
                        <Shirt size={36} />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Hover shop overlay */}
                {item.fromWardrobe ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="bg-green-100 text-green-900 px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                            In Wardrobe
                        </span>
                    </div>
                ) : (
                    item.link && (
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 flex items-center justify-center bg-purple-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                            <span className="bg-white text-purple-900 px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                                Shop Now <ExternalLink size={14} />
                            </span>
                        </a>
                    )
                )}
            </div>

            {/* Info */}
            <div className="p-3 flex flex-col gap-1.5 flex-1">
                <p className="text-sm font-semibold text-white leading-tight truncate">{item.name}</p>
                {item.store && (
                    <span className={`self-start text-xs px-2 py-0.5 rounded-full border font-medium ${badgeClass}`}>
                        {item.store}
                    </span>
                )}
                <div className="flex items-center justify-between mt-auto pt-1">
                    {item.rating && <StarRating rating={item.rating} />}
                    {item.price && (
                        <span className="text-sm font-bold text-purple-300">{item.price}</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

// ─── Outfit Column ────────────────────────────────────────────────────────────
const OutfitColumn = ({ items, title, description, type, styleTips }) => {
    const icons = {
        closet: <Shirt size={22} />,
        mix: <Sparkles size={22} />,
        shop: <ShoppingBag size={22} />
    };
    const headerColors = {
        closet: 'from-green-600/30 to-emerald-600/10 border-green-500/30',
        mix: 'from-blue-600/30 to-indigo-600/10 border-blue-500/30',
        shop: 'from-purple-600/30 to-pink-600/10 border-purple-500/30'
    };
    const iconColors = {
        closet: 'bg-green-500/20 text-green-400',
        mix: 'bg-blue-500/20 text-blue-400',
        shop: 'bg-purple-500/20 text-purple-400'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-xl flex flex-col"
        >
            {/* Column Header */}
            <div className={`bg-gradient-to-r ${headerColors[type]} border-b border-white/10 p-5`}>
                <div className="flex items-center gap-3 mb-1">
                    <div className={`p-2 rounded-xl ${iconColors[type]}`}>
                        {icons[type]}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">{title}</h3>
                        <p className="text-xs text-gray-400">{description}</p>
                    </div>
                </div>
            </div>

            {/* Products grid */}
            <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3 flex-1">
                {items.map((item, idx) => (
                    <ProductCard key={idx} item={item} />
                ))}
            </div>

            {/* Style tips */}
            {styleTips && styleTips.length > 0 && (
                <div className="px-4 pb-4 space-y-2">
                    {styleTips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-2 bg-white/5 rounded-xl p-3 text-xs text-purple-200">
                            <Sparkles size={12} className="text-purple-400 mt-0.5 shrink-0" />
                            {tip}
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

// ─── Style DNA Card ───────────────────────────────────────────────────────────
const StyleDNACard = ({ userProfile }) => {
    const { skinTone, bodyType, faceStructure, height, gender, name } = userProfile;
    const palette = skinTone ? getColorPalette(skinTone) : null;
    const bodyAdvice = bodyType ? getBodyTypeAdvice(bodyType, gender) : null;
    const faceAdvice = faceStructure ? getFaceShapeAdvice(faceStructure) : null;
    const heightAdvice = height ? getHeightAdvice(height) : null;

    const hasAnyData = palette || bodyAdvice || faceAdvice || heightAdvice;

    if (!hasAnyData) return (
        <div className="max-w-4xl mx-auto mb-12 bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 text-center">
            <User size={32} className="text-purple-400 mx-auto mb-3" />
            <p className="text-purple-200">Complete your <Link to="/profile" className="text-white font-bold underline underline-offset-2">Style Profile</Link> to unlock personalized recommendations based on your body type, skin tone, and face shape.</p>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-12 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600/40 to-pink-600/40 px-6 py-5 border-b border-white/10 flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-2xl">
                    <Zap size={24} className="text-yellow-300" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">
                        {name ? `${name}'s Style DNA` : 'Your Style DNA'}
                    </h3>
                    <p className="text-sm text-purple-200">Personalized insights based on your profile</p>
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Color Palette */}
                {palette && (
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                            <Palette size={18} className="text-pink-400" />
                            <span className="font-bold text-white text-sm">Your Color Palette</span>
                        </div>
                        <div className="flex gap-2 mb-3">
                            {palette.hex.map((c, i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full border-2 border-white/20 shadow-md"
                                    style={{ backgroundColor: c }}
                                    title={palette.best[i]}
                                />
                            ))}
                        </div>
                        <p className="text-xs text-gray-300">Best: <span className="text-purple-200">{palette.best.slice(0, 3).join(', ')}</span></p>
                    </div>
                )}

                {/* Body Type */}
                {bodyAdvice && (
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <User size={18} className="text-blue-400" />
                            <span className="font-bold text-white text-sm">Body Type: {bodyType}</span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed">{bodyAdvice.tip}</p>
                    </div>
                )}

                {/* Face Shape */}
                {faceAdvice && (
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <Heart size={18} className="text-rose-400" />
                            <span className="font-bold text-white text-sm">Face Shape: {faceStructure}</span>
                        </div>
                        <p className="text-xs text-gray-300"><span className="text-purple-300 font-medium">Necklines:</span> {faceAdvice.neckline}</p>
                        <p className="text-xs text-gray-300 mt-1"><span className="text-purple-300 font-medium">Accessories:</span> {faceAdvice.accessories}</p>
                    </div>
                )}

                {/* Height */}
                {heightAdvice && (
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <ArrowRight size={18} className="text-green-400" />
                            <span className="font-bold text-white text-sm">Height: {heightAdvice.category}</span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed">{heightAdvice.tip}</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const occasions = [
    { id: 'casual', label: 'Casual', emoji: '😊' },
    { id: 'office', label: 'Office', emoji: '💼' },
    { id: 'date', label: 'Date Night', emoji: '❤️' },
    { id: 'wedding', label: 'Wedding', emoji: '💍' },
    { id: 'party', label: 'Party', emoji: '🎉' },
    { id: 'sport', label: 'Sport', emoji: '⚡' },
];

const Stylist = () => {
    const { userProfile, wardrobe } = useUser();
    const [occasion, setOccasion] = useState('casual');
    const [budget, setBudget] = useState(5000); // 1K - 15K slider
    const [suggestions, setSuggestions] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGetAdvice = async () => {
        setLoading(true);
        try {
            // 1. Try fetching live scraped products from the backend API
            const response = await fetch('http://localhost:5000/api/generate-outfit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    gender: userProfile.gender || 'women',
                    occasion: occasion,
                    profile: userProfile,
                    wardrobe: wardrobe,
                    budget: budget
                })
            });

            if (response.ok) {
                const liveData = await response.json();

                setSuggestions({
                    vibe: { label: "Your Perfect Combination", description: "Seamlessly blending your wardrobe with curated fashion discoveries." },
                    description: liveData.description,
                    items: liveData.items && liveData.items.length > 0 ? liveData.items : []
                });
                setLoading(false);
                return;
            }
        } catch (err) {
            console.warn("Backend API not reachable or failed. Falling back to local mock data.", err);
        }

        // 2. Fallback to Local Generator if backend is off or fails
        const localResults = getWardrobeSuggestions(wardrobe, occasion, userProfile);
        setSuggestions({
            vibe: localResults.newLook.vibe,
            description: localResults.newLook.description,
            // Display only the new look to fit the unified column structure in fallback case
            items: localResults.newLook.items
        });
        setLoading(false);
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-20 max-w-7xl">
            {/* Hero */}
            <div className="text-center mb-12">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-white mb-4"
                >
                    Your AI Stylist
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-purple-200 max-w-2xl mx-auto"
                >
                    Personalized outfit recommendations powered by your profile — body type, skin tone, face shape & more.
                </motion.p>
            </div>

            {/* Style DNA */}
            <StyleDNACard userProfile={userProfile} />

            {/* Occasion Selector */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 mb-16 shadow-2xl"
            >
                <label className="block text-lg font-semibold text-purple-200 mb-5">
                    What's the occasion?
                </label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
                    {occasions.map((occ) => (
                        <button
                            key={occ.id}
                            onClick={() => setOccasion(occ.id)}
                            className={`py-3 px-2 rounded-xl transition-all text-center font-medium text-sm flex flex-col items-center gap-1 ${occasion === occ.id
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 scale-105'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <span className="text-xl">{occ.emoji}</span>
                            <span>{occ.label}</span>
                        </button>
                    ))}
                </div>

                {/* Budget Slider */}
                <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
                    <label className="flex justify-between text-lg font-semibold text-purple-200 mb-4">
                        <span className="flex items-center gap-2"><IndianRupee size={20} /> Outfit Budget Limit</span>
                        <span className="font-bold text-white bg-purple-600/30 px-3 py-1 rounded-lg">₹{budget}</span>
                    </label>
                    <input
                        type="range"
                        min="1000"
                        max="20000"
                        step="500"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-pink-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                        <span>₹1,000</span>
                        <span>₹20,000</span>
                    </div>
                </div>

                <button
                    onClick={handleGetAdvice}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                            Curating your perfect look...
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
            <AnimatePresence>
                {suggestions && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Vibe Banner */}
                        {suggestions.vibe && (
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="max-w-4xl mx-auto mb-8 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-2xl px-6 py-4 border border-purple-500/30 flex items-center gap-4"
                            >
                                <Sparkles size={24} className="text-pink-400 shrink-0" />
                                <div>
                                    <p className="font-bold text-white text-lg">{suggestions.vibe.label}</p>
                                    <p className="text-sm text-purple-200">{suggestions.description || suggestions.vibe.description}</p>
                                </div>
                            </motion.div>
                        )}

                        <div className="max-w-6xl mx-auto">
                            {suggestions.items?.length > 0 ? (
                                <OutfitColumn
                                    items={suggestions.items}
                                    title="Complete Outfit"
                                    description="A cohesive look combining your wardrobe with smart finds within your budget."
                                    type="shop"
                                />
                            ) : null}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Stylist;
