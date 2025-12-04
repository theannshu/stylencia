import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Plus, Trash2, Shirt, X } from 'lucide-react';

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
        <div className="container mx-auto px-4 py-8 mt-16">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">My Wardrobe</h1>
                    <p className="text-gray-400 mt-1">Manage your digital closet</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                    <Plus size={20} /> Add Item
                </button>
            </div>

            {/* Add Item Modal */}
            {isAdding && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 text-gray-800">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Add New Item</h2>
                            <button onClick={() => setIsAdding(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleAddItem} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newItem.name}
                                    onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                    placeholder="e.g. Blue Denim Jacket"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        value={newItem.type}
                                        onChange={e => setNewItem({ ...newItem, type: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    >
                                        <option value="upper">Top</option>
                                        <option value="lower">Bottom</option>
                                        <option value="shoes">Shoes</option>
                                        <option value="accessory">Accessory</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Occasion</label>
                                    <select
                                        value={newItem.occasion}
                                        onChange={e => setNewItem({ ...newItem, occasion: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    >
                                        <option value="casual">Casual</option>
                                        <option value="office">Office</option>
                                        <option value="date">Date Night</option>
                                        <option value="wedding">Wedding</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                                <select
                                    value={newItem.color}
                                    onChange={e => setNewItem({ ...newItem, color: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                >
                                    <option value="black">Black</option>
                                    <option value="white">White</option>
                                    <option value="blue">Blue</option>
                                    <option value="red">Red</option>
                                    <option value="green">Green</option>
                                    <option value="yellow">Yellow</option>
                                    <option value="pink">Pink</option>
                                    <option value="purple">Purple</option>
                                    <option value="beige">Beige</option>
                                    <option value="grey">Grey</option>
                                    <option value="brown">Brown</option>
                                    <option value="gold">Gold</option>
                                    <option value="silver">Silver</option>
                                    <option value="multi">Multi-color</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors mt-4"
                            >
                                Add to Wardrobe
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Wardrobe Grid */}
            {wardrobe.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                    <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Shirt size={40} className="text-purple-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Your wardrobe is empty</h3>
                    <p className="text-gray-400 mb-6">Start adding clothes to get personalized outfit ideas.</p>
                    <button
                        onClick={() => setIsAdding(true)}
                        className="text-purple-400 hover:text-purple-300 font-medium"
                    >
                        + Add your first item
                    </button>
                </div>
            ) : (
                <div className="space-y-8">
                    {Object.entries(categories).map(([type, label]) => {
                        const items = wardrobe.filter(item => item.type === type);
                        if (items.length === 0) return null;

                        return (
                            <div key={type}>
                                <h2 className="text-xl font-semibold text-purple-300 mb-4 border-b border-white/10 pb-2">{label}</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {items.map(item => (
                                        <div key={item.id} className="bg-white/10 rounded-xl p-4 border border-white/10 hover:border-purple-500/50 transition-all group relative">
                                            <button
                                                onClick={() => removeFromWardrobe(item.id)}
                                                className="absolute top-2 right-2 p-1.5 bg-red-500/20 text-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/40"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                            <div className="aspect-square bg-gray-900/50 rounded-lg mb-3 flex items-center justify-center">
                                                <Shirt size={32} className="text-gray-600" />
                                            </div>
                                            <h3 className="font-medium text-white truncate">{item.name}</h3>
                                            <div className="flex gap-2 mt-2 text-xs text-gray-400">
                                                <span className="capitalize px-2 py-0.5 bg-white/5 rounded-full">{item.color}</span>
                                                <span className="capitalize px-2 py-0.5 bg-white/5 rounded-full">{item.occasion}</span>
                                            </div>
                                        </div>
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
