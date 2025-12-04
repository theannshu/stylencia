import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Save, User } from 'lucide-react';

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
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-full">
                            <User size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Your Style Profile</h1>
                            <p className="text-purple-100 mt-1">Help us personalize your recommendations</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {message && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                            {message}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Info */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                placeholder="Your Name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                            >
                                <option value="women">Women</option>
                                <option value="men">Men</option>
                            </select>
                        </div>

                        {/* Physical Attributes */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                            <input
                                type="number"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                placeholder="e.g. 165"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Skin Tone</label>
                            <select
                                name="skinTone"
                                value={formData.skinTone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                            >
                                <option value="">Select Skin Tone</option>
                                <option value="fair">Fair</option>
                                <option value="medium">Medium</option>
                                <option value="olive">Olive</option>
                                <option value="brown">Brown</option>
                                <option value="dark">Dark</option>
                            </select>
                        </div>
                    </div>

                    {/* Body Type Section */}
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <label className="block text-lg font-medium text-gray-800">Body Type</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['Hourglass', 'Pear', 'Apple', 'Rectangle', 'Inverted Triangle', 'Athletic'].map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, bodyType: type }))}
                                    className={`p-4 rounded-xl border-2 transition-all text-sm font-medium ${formData.bodyType === type
                                            ? 'border-purple-600 bg-purple-50 text-purple-700'
                                            : 'border-gray-200 hover:border-purple-300 text-gray-600'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                        >
                            <Save size={20} />
                            Save Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
