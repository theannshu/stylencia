import React from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 group"
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-white flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    {product.rating}
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <span className="text-xs text-purple-400 uppercase tracking-wider font-semibold">{product.store}</span>
                        <h3 className="text-white font-medium text-sm line-clamp-1">{product.name}</h3>
                    </div>
                    <span className="text-white font-bold">{product.price}</span>
                </div>

                <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-purple-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                >
                    Buy Now <ExternalLink className="w-3 h-3" />
                </a>
            </div>
        </motion.div>
    );
};

export default ProductCard;
