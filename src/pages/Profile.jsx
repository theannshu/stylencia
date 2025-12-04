import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Save, User, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
    const { userProfile, updateProfile } = useUser();
    const [formData, setFormData] = useState(userProfile);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(formData);
        setMessage('Profile saved successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="container mx-auto px-4 py-24 max-w-3xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
            >
                <div className="bg-gradient-to-r from-purple-600/80 to-pink-600/80 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <Sparkles size={100} />
                    </div>
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm border border-white/30">
                            <User size={40} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Your Style Profile</h1>
                            <p className="text-purple-100 mt-1 text-lg">Help us personalize your recommendations</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-500/20 border border-green-500/50 text-green-200 px-6 py-4 rounded-xl flex items-center gap-2"
                        >
                            <Sparkles size={20} />
                            {message}
                        </motion.div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Basic Info */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-purple-200">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-5 py-3 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-400"
                                placeholder="Your Name"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-purple-200">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-5 py-3 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white"
                            >
                                <option value="women" className="bg-gray-900">Women</option>
                                <option value="men" className="bg-gray-900">Men</option>
                            </select>
                        </div>

                        {/* Physical Attributes */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-purple-200">Height (cm)</label>
                            <input
                                type="number"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                className="w-full px-5 py-3 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-400"
                                placeholder="e.g. 165"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-purple-200">Skin Tone</label>
                            <select
                                name="skinTone"
                                value={formData.skinTone}
                                onChange={handleChange}
                                className="w-full px-5 py-3 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white"
                            >
                                <option value="" className="bg-gray-900">Select Skin Tone</option>
                                <option value="fair" className="bg-gray-900">Fair</option>
                                <option value="medium" className="bg-gray-900">Medium</option>
                                <option value="olive" className="bg-gray-900">Olive</option>
                                <option value="brown" className="bg-gray-900">Brown</option>
                                <option value="dark" className="bg-gray-900">Dark</option>
                            </select>
                        </div>
                    </div>

                    {/* Body Type Section */}
                    <div className="space-y-4 pt-4 border-t border-white/10">
                        <label className="block text-lg font-medium text-purple-200">Body Type</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {['Hourglass', 'Pear', 'Apple', 'Rectangle', 'Inverted Triangle', 'Athletic'].map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, bodyType: type }))}
                                    className={`p-4 rounded-xl border transition-all text-sm font-medium relative overflow-hidden group ${formData.bodyType === type
                                            ? 'border-purple-500 bg-purple-500/20 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                                            : 'border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:border-purple-400/50'
                                        }`}
                                >
                                    <span className="relative z-10">{type}</span>
                                    {formData.bodyType === type && (
                                        <motion.div
                                            layoutId="activeBodyType"
                                            className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Save size={20} />
                                Save Profile
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Profile;
