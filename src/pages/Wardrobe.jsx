import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Plus, Trash2, Shirt, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Wardrobe = () => {
    const { wardrobe, addToWardrobe, removeFromWardrobe } = useUser();
    const [isAdding, setIsAdding] = useState(false);
    const [newItem, setNewItem] = useState({
        type: 'upper',
        color: 'black',
        occasion: 'casual',
        name: ''
    });

    const handleAddItem = (e) => {
        e.preventDefault();
        addToWardrobe(newItem);
        setIsAdding(false);
        setNewItem({ type: 'upper', color: 'black', occasion: 'casual', name: '' });
    };

    const categories = {
        upper: 'Tops & Outerwear',
        lower: 'Bottoms',
        shoes: 'Shoes',
        accessory: 'Accessories'
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">My Wardrobe</h1>
                    <p className="text-purple-200 mt-1">Manage your digital closet</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-purple-500/50 transform hover:-translate-y-1 transition-all flex items-center gap-2"
                >
                    <Plus size={20} /> Add Item
                </button>
            </div>

            {/* Add Item Modal */}
            <AnimatePresence>
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-[#1a1638] border border-white/10 rounded-3xl max-w-md w-full p-8 text-white shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Add New Item</h2>
                                <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleAddItem} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Item Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={newItem.name}
                                        onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                        placeholder="e.g. Blue Denim Jacket"
                                        className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder-gray-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                                        <select
                                            value={newItem.type}
                                            onChange={e => setNewItem({ ...newItem, type: e.target.value })}
                                            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-white"
                                        >
                                            <option value="upper" className="bg-gray-900">Top</option>
                                            <option value="lower" className="bg-gray-900">Bottom</option>
                                            <option value="shoes" className="bg-gray-900">Shoes</option>
                                            <option value="accessory" className="bg-gray-900">Accessory</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Occasion</label>
                                        <select
                                            value={newItem.occasion}
                                            onChange={e => setNewItem({ ...newItem, occasion: e.target.value })}
                                            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-white"
                                        >
                                            <option value="casual" className="bg-gray-900">Casual</option>
                                            <option value="office" className="bg-gray-900">Office</option>
                                            <option value="date" className="bg-gray-900">Date Night</option>
                                            <option value="wedding" className="bg-gray-900">Wedding</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Color</label>
                                    <select
                                        value={newItem.color}
                                        onChange={e => setNewItem({ ...newItem, color: e.target.value })}
                                        className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-white"
                                    >
                                        <option value="black" className="bg-gray-900">Black</option>
                                        <option value="white" className="bg-gray-900">White</option>
                                        <option value="blue" className="bg-gray-900">Blue</option>
                                        <option value="red" className="bg-gray-900">Red</option>
                                        <option value="green" className="bg-gray-900">Green</option>
                                        <option value="yellow" className="bg-gray-900">Yellow</option>
                                        <option value="pink" className="bg-gray-900">Pink</option>
                                        <option value="purple" className="bg-gray-900">Purple</option>
                                        <option value="beige" className="bg-gray-900">Beige</option>
                                        <option value="grey" className="bg-gray-900">Grey</option>
                                        <option value="brown" className="bg-gray-900">Brown</option>
                                        <option value="gold" className="bg-gray-900">Gold</option>
                                        <option value="silver" className="bg-gray-900">Silver</option>
                                        <option value="multi" className="bg-gray-900">Multi-color</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all mt-4"
                                >
                                    Add to Wardrobe
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Wardrobe Grid */}
            {wardrobe.length === 0 ? (
                <div className="text-center py-20 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 mt-8">
                    <div className="bg-white/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Shirt size={48} className="text-purple-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Your wardrobe is empty</h3>
                    <p className="text-gray-400 mb-8 text-lg">Start adding clothes to get personalized outfit ideas.</p>
                    <button
                        onClick={() => setIsAdding(true)}
                        className="text-purple-400 hover:text-purple-300 font-medium text-lg hover:underline"
                    >
                        + Add your first item
                    </button>
                </div>
            ) : (
                <div className="space-y-12 mt-8">
                    {Object.entries(categories).map(([type, label]) => {
                        const items = wardrobe.filter(item => item.type === type);
                        if (items.length === 0) return null;

                        return (
                            <div key={type}>
                                <h2 className="text-2xl font-semibold text-purple-200 mb-6 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                                    {label}
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                    {items.map(item => (
                                        <motion.div
                                            key={item.id}
                                            whileHover={{ y: -10, scale: 1.02 }}
                                            className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-purple-500/50 transition-all group relative shadow-lg"
                                        >
                                            <button
                                                onClick={() => removeFromWardrobe(item.id)}
                                                className="absolute top-3 right-3 p-2 bg-red-500/20 text-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/40 z-10"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                                                <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <Shirt size={40} className="text-gray-500 group-hover:text-purple-400 transition-colors" />
                                            </div>
                                            <h3 className="font-bold text-white truncate text-lg">{item.name}</h3>
                                            <div className="flex flex-wrap gap-2 mt-3 text-xs text-gray-300">
                                                <span className="capitalize px-2.5 py-1 bg-white/10 rounded-full border border-white/5">{item.color}</span>
                                                <span className="capitalize px-2.5 py-1 bg-white/10 rounded-full border border-white/5">{item.occasion}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Wardrobe;
