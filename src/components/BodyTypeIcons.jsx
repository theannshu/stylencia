import React from 'react';

export const BodyTypeIcons = ({ type, className = "w-12 h-12" }) => {
    const getIcon = () => {
        switch (type) {
            case 'Hourglass':
                return (
                    <svg viewBox="0 0 100 200" className={className} fill="none" stroke="currentColor" strokeWidth="2">
                        {/* Hourglass: Balanced bust/hips, defined waist */}
                        <path d="M30,40 Q20,60 35,80 Q50,95 65,80 Q80,60 70,40 Q50,20 30,40 Z M35,80 Q25,100 25,120 Q25,160 50,160 Q75,160 75,120 Q75,100 65,80" />
                        <line x1="20" y1="100" x2="80" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
                    </svg>
                );
            case 'Pear':
                return (
                    <svg viewBox="0 0 100 200" className={className} fill="none" stroke="currentColor" strokeWidth="2">
                        {/* Pear: Narrower shoulders, wider hips */}
                        <path d="M35,40 Q30,60 38,80 Q50,90 62,80 Q70,60 65,40 Q50,30 35,40 Z M38,80 Q20,100 15,130 Q15,160 50,160 Q85,160 85,130 Q80,100 62,80" />
                    </svg>
                );
            case 'Apple':
                return (
                    <svg viewBox="0 0 100 200" className={className} fill="none" stroke="currentColor" strokeWidth="2">
                        {/* Apple: Broader torso, less defined waist */}
                        <path d="M30,50 Q20,80 20,110 Q20,150 50,150 Q80,150 80,110 Q80,80 70,50 Q50,30 30,50 Z" />
                        <ellipse cx="50" cy="100" rx="25" ry="20" stroke="currentColor" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
                    </svg>
                );
            case 'Rectangle':
                return (
                    <svg viewBox="0 0 100 200" className={className} fill="none" stroke="currentColor" strokeWidth="2">
                        {/* Rectangle: Straight up and down */}
                        <rect x="30" y="40" width="40" height="110" rx="5" />
                        <line x1="30" y1="100" x2="70" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
                    </svg>
                );
            case 'Inverted Triangle':
                return (
                    <svg viewBox="0 0 100 200" className={className} fill="none" stroke="currentColor" strokeWidth="2">
                        {/* Inverted Triangle: Broad shoulders, narrow hips */}
                        <path d="M20,40 Q15,60 35,90 Q40,120 40,150 Q50,160 60,150 Q60,120 65,90 Q85,60 80,40 Q50,30 20,40 Z" />
                        <line x1="20" y1="45" x2="80" y2="45" stroke="currentColor" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
                    </svg>
                );
            case 'Athletic':
                return (
                    <svg viewBox="0 0 100 200" className={className} fill="none" stroke="currentColor" strokeWidth="2">
                        {/* Athletic: Broad shoulders, muscular build */}
                        <path d="M25,40 Q25,60 30,80 Q30,120 35,150 Q50,160 65,150 Q70,120 70,80 Q75,60 75,40 Q50,30 25,40 Z" />
                        <path d="M25,50 Q50,60 75,50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return getIcon();
};
