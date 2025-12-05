import React from 'react';

export const FaceShapeIcons = ({ type, className = "w-12 h-12" }) => {
    const getIcon = () => {
        switch (type) {
            case 'oval':
                return (
                    <svg viewBox="0 0 100 120" className={className} fill="none" stroke="currentColor" strokeWidth="2">
                        {/* Oval: Balanced proportions */}
                        <ellipse cx="50" cy="60" rx="35" ry="50" />
                    </svg>
                );
            case 'round':
                return (
                    <svg viewBox="0 0 100 120" className={className} fill="none" stroke="currentColor" strokeWidth="2">
                        {/* Round: Circular, soft edges */}
                        <circle cx="50" cy="60" r="40" />
                    </svg>
                );
            case 'square':
                return (
                    <svg viewBox="0 0 100 120" className={className} fill="none" stroke="currentColor" strokeWidth="2">
                        {/* Square: Angular jaw, equal width/height */}
                        <rect x="15" y="20" width="70" height="80" rx="10" />
                    </svg>
                );
            case 'diamond':
                return (
                    <svg viewBox="0 0 100 120" className={className} fill="none" stroke="currentColor" strokeWidth="2">
                        {/* Diamond: Narrow forehead/chin, wide cheekbones */}
                        <path d="M50,10 L90,60 L50,110 L10,60 Z" strokeLinejoin="round" />
                    </svg>
                );
            case 'heart':
                return (
                    <svg viewBox="0 0 100 120" className={className} fill="none" stroke="currentColor" strokeWidth="2">
                        {/* Heart: Wide forehead, narrow chin */}
                        <path d="M50,110 C50,110 10,70 10,40 C10,20 30,10 50,30 C70,10 90,20 90,40 C90,70 50,110 50,110 Z" strokeLinejoin="round" />
                    </svg>
                );
            case 'oblong':
                return (
                    <svg viewBox="0 0 100 120" className={className} fill="none" stroke="currentColor" strokeWidth="2">
                        {/* Oblong: Longer than wide */}
                        <rect x="20" y="10" width="60" height="100" rx="20" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return getIcon();
};
