import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Save, User, Sparkles, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { BodyTypeIcons } from '../components/BodyTypeIcons';
import { FaceShapeIcons } from '../components/FaceShapeIcons';

const skinTones = [
    { id: 'fair', color: '#F5E0D8', label: 'Fair' },
    { id: 'medium', color: '#EAC0A6', label: 'Medium' },
    { id: 'olive', color: '#D4AA78', label: 'Olive' },
    { id: 'brown', color: '#8D5524', label: 'Brown' },
    { id: 'dark', color: '#3B2219', label: 'Dark' }
];

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
                        <div className="bg-white/20 rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center overflow-hidden w-20 h-20">
                            {formData.avatar ? (
                                <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User size={40} />
                            )}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Your Style Profile</h1>
                            <p className="text-purple-100 mt-1 text-lg">Help us personalize your recommendations</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">


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
                            <div className="flex gap-3 flex-wrap">
                                {skinTones.map((tone) => (
                                    <button
                                        key={tone.id}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, skinTone: tone.id }))}
                                        className={`w-10 h-10 rounded-full border-2 transition-all relative ${formData.skinTone === tone.id
                                            ? 'border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.5)]'
                                            : 'border-transparent hover:scale-105'
                                            }`}
                                        style={{ backgroundColor: tone.color }}
                                        title={tone.label}
                                    >
                                        {formData.skinTone === tone.id && (
                                            <div className="absolute inset-0 flex items-center justify-center text-black/50">
                                                <Check size={16} strokeWidth={3} />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-purple-300 ml-1">Selected: {skinTones.find(t => t.id === formData.skinTone)?.label || 'None'}</p>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-purple-200">Age</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full px-5 py-3 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-400"
                                placeholder="e.g. 25"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-purple-200">Hair Color</label>
                            <select
                                name="hairColor"
                                value={formData.hairColor}
                                onChange={handleChange}
                                className="w-full px-5 py-3 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white"
                            >
                                <option value="" className="bg-gray-900">Select Hair Color</option>
                                <option value="black" className="bg-gray-900">Black</option>
                                <option value="brown" className="bg-gray-900">Brown</option>
                                <option value="blonde" className="bg-gray-900">Blonde</option>
                                <option value="red" className="bg-gray-900">Red</option>
                                <option value="gray" className="bg-gray-900">Gray</option>
                                <option value="white" className="bg-gray-900">White</option>
                                <option value="colored" className="bg-gray-900">Colored/Dyed</option>
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-purple-200">Eye Color</label>
                            <select
                                name="eyeColor"
                                value={formData.eyeColor}
                                onChange={handleChange}
                                className="w-full px-5 py-3 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white"
                            >
                                <option value="" className="bg-gray-900">Select Eye Color</option>
                                <option value="brown" className="bg-gray-900">Brown</option>
                                <option value="blue" className="bg-gray-900">Blue</option>
                                <option value="green" className="bg-gray-900">Green</option>
                                <option value="hazel" className="bg-gray-900">Hazel</option>
                                <option value="gray" className="bg-gray-900">Gray</option>
                                <option value="amber" className="bg-gray-900">Amber</option>
                            </select>
                        </div>
                    </div>

                    {/* Face Structure Section */}
                    <div className="space-y-4 pt-4 border-t border-white/10">
                        <label className="block text-lg font-medium text-purple-200">Face Shape</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                { id: 'oval', label: 'Oval', desc: 'Length > width, soft jaw' },
                                { id: 'round', label: 'Round', desc: 'Width ≈ length, circular' },
                                { id: 'square', label: 'Square', desc: 'Broad forehead, sharp jaw' },
                                { id: 'diamond', label: 'Diamond', desc: 'Wide cheekbones, narrow chin' },
                                { id: 'heart', label: 'Heart', desc: 'Broad forehead, pointed chin' },
                                { id: 'oblong', label: 'Oblong', desc: 'Noticeably longer than wide' }
                            ].map(({ id, label, desc }) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, faceStructure: id }))}
                                    className={`p-4 rounded-xl border transition-all text-sm font-medium relative overflow-hidden group flex flex-col items-center gap-2 ${formData.faceStructure === id
                                        ? 'border-purple-500 bg-purple-500/20 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                                        : 'border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:border-purple-400/50'
                                        }`}
                                >
                                    <div className="relative z-10">
                                        <FaceShapeIcons type={id} className={`w-14 h-14 md:w-16 md:h-16 ${formData.faceStructure === id ? 'text-white' : 'text-gray-400 group-hover:text-white transition-colors'}`} />
                                    </div>
                                    <span className="relative z-10 font-bold capitalize mt-1">{label}</span>
                                    <span className="relative z-10 text-xs text-gray-400 text-center font-normal px-2 leading-tight">{desc}</span>
                                    {formData.faceStructure === id && (
                                        <motion.div
                                            layoutId="activeFaceShape"
                                            className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Body Type Section */}
                    <div className="space-y-4 pt-4 border-t border-white/10 relative z-0">
                        <label className="block text-lg font-medium text-purple-200">Body Type</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                { id: 'Hourglass', label: 'Hourglass', desc: 'Balanced bust & hips, defined waist' },
                                { id: 'Pear', label: 'Pear', desc: 'Hips wider than shoulders' },
                                { id: 'Apple', label: 'Apple', desc: 'Broader shoulders & bust, narrower hips' },
                                { id: 'Rectangle', label: 'Rectangle', desc: 'Straight up & down, minimal waist definition' },
                                { id: 'Inverted Triangle', label: 'Inverted Triangle', desc: 'Broad shoulders, narrow hips' },
                                { id: 'Athletic', label: 'Athletic', desc: 'Muscular, well-proportioned structure' }
                            ].map(({ id, label, desc }) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, bodyType: id }))}
                                    className={`p-4 rounded-xl border transition-all text-sm font-medium relative overflow-hidden group flex flex-col items-center gap-2 ${formData.bodyType === id
                                        ? 'border-purple-500 bg-purple-500/20 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                                        : 'border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:border-purple-400/50'
                                        }`}
                                >
                                    <div className="relative z-10">
                                        <BodyTypeIcons type={id} className={`w-14 h-14 md:w-16 md:h-16 ${formData.bodyType === id ? 'text-white' : 'text-gray-400 group-hover:text-white transition-colors'}`} />
                                    </div>
                                    <span className="relative z-10 font-bold mt-1 text-center">{label}</span>
                                    <span className="relative z-10 text-xs text-gray-400 text-center font-normal px-1 leading-tight">{desc}</span>
                                    {formData.bodyType === id && (
                                        <motion.div
                                            layoutId="activeBodyType"
                                            className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 space-y-4">
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

                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-green-500/20 border border-green-500/50 text-green-200 px-6 py-4 rounded-xl flex items-center justify-center gap-2"
                            >
                                <Sparkles size={20} />
                                {message}
                            </motion.div>
                        )}
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Profile;
