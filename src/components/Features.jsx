import React from 'react';
import { motion } from 'framer-motion';
import { Shirt, Calendar, ShoppingBag } from 'lucide-react';

const features = [
    {
        icon: <Shirt className="w-8 h-8 text-purple-400" />,
        title: "Smart Outfit Matching",
        description: "AI recommends upper, lower, and accessories tailored to your specific occasion and style preferences."
    },
    {
        icon: <Calendar className="w-8 h-8 text-pink-400" />,
        title: "Occasion-Based Styling",
        description: "Be it weddings, office, or casual outings — Stylencia understands the context and dresses you accordingly."
    },
    {
        icon: <ShoppingBag className="w-8 h-8 text-blue-400" />,
        title: "Direct Purchase Links",
        description: "Buy recommended outfits instantly with trusted shopping partners. No more endless searching."
    }
];

const Features = () => {
    return (
        <section id="features" className="py-20 bg-[#1a1638] text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Stylencia?</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Experience the future of fashion with features designed to make you look your best.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 px-4 md:px-10">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="mb-6 p-3 bg-white/5 rounded-xl inline-block">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
