import React from 'react';
import { Shirt, Sparkles, User, Palette, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Section3D from './Section3D';

const features = [
    {
        icon: <Shirt className="w-8 h-8 text-primary" />,
        title: "Digital Wardrobe",
        description: "Catalog your own clothes. Add tops, bottoms, and shoes to your personal digital closet for easy management."
    },
    {
        icon: <Sparkles className="w-8 h-8 text-secondary" />,
        title: "Mix & Match",
        description: "Don't know what to wear? Our AI suggests outfits by mixing your existing wardrobe with new trendy pieces."
    },
    {
        icon: <User className="w-8 h-8 text-purple-400" />,
        title: "Personalized Profile",
        description: "Get recommendations tailored to your unique body type, skin tone, and height. Fashion that fits YOU."
    },
    {
        icon: <Palette className="w-8 h-8 text-pink-400" />,
        title: "Color Analysis",
        description: "Discover the colors that make you glow. Our AI analyzes your skin tone to find your perfect palette."
    },
    {
        icon: <Zap className="w-8 h-8 text-yellow-400" />,
        title: "Instant Styling",
        description: "Get outfit ideas in seconds for any occasion, weather, or mood. Look great without the stress."
    },
    {
        icon: <Shield className="w-8 h-8 text-green-400" />,
        title: "Private & Secure",
        description: "Your photos and data are yours. We use enterprise-grade security to keep your personal style private."
    }
];

const Features = () => {
    const location = useLocation();
    const isFeaturesPage = location.pathname === '/features';

    return (
        <section id="features" className="relative py-32 text-white overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] right-[5%] w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] left-[5%] w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
            </div>

            <Section3D animated={!isFeaturesPage} className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-6 backdrop-blur-sm"
                    >
                        Feature Rich
                    </motion.div>
                    <h2 className="font-logo text-4xl md:text-5xl lg:text-6xl text-white mb-6">Why Choose Stylencia?</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light">Experience the future of fashion with powerful AI features designed to make you look your best, effortlessly.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            className="group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-primary/30 transition-all duration-300 shadow-xl hover:shadow-primary/10"
                        >
                            <div className="mb-6 p-4 bg-[#050510]/50 rounded-2xl inline-block group-hover:scale-110 transition-transform duration-300 border border-white/5">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary transition-colors">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed font-light">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </Section3D>
        </section>
    );
};

export default Features;
