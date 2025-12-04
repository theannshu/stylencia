import React from 'react';

export const BodyTypeIcons = ({ type, className = "w-12 h-12" }) => {
    const getIcon = () => {
        switch (type) {
            case 'Hourglass':
                return (
                    <svg viewBox="0 0 100 200" className={className} fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M30,40 Q20,60 30,80 Q50,100 70,80 Q80,60 70,40 Q50,20 30,40 Z M30,80 Q20,100 20,120 Q20,160 50,160 Q80,160 80,120 Q80,100 70,80" />
                        <path d="M30,40 Q50,30 70,40" />
                    </svg>
                );
            case 'Pear':
                return (
                    <svg viewBox="0 0 100 200" className={className} fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M35,40 Q30,60 35,80 Q50,90 65,80 Q70,60 65,40 Q50,30 35,40 Z M35,80 Q20,100 15,130 Q15,160 50,160 Q85,160 85,130 Q80,100 65,80" />
                    </svg>
                );
            case 'Apple':
                return (
                    <svg viewBox="0 0 100 200" className={className} fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M30,50 Q20,80 20,110 Q20,150 50,150 Q80,150 80,110 Q80,80 70,50 Q50,30 30,50 Z" />
                        <path d="M30,50 Q50,40 70,50" />
                    </svg>
                );
            case 'Rectangle':
                return (
                    <svg viewBox="0 0 100 200" className={className} fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M30,40 L30,150 Q50,160 70,150 L70,40 Q50,30 30,40 Z" />
                    </svg>
                );
            case 'Inverted Triangle':
                return (
                    <svg viewBox="0 0 100 200" className={className} fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20,40 Q15,60 30,90 Q35,120 35,150 Q50,160 65,150 Q65,120 70,90 Q85,60 80,40 Q50,30 20,40 Z" />
                    </svg>
                );
            case 'Athletic':
                return (
                    <svg viewBox="0 0 100 200" className={className} fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M25,40 Q25,60 30,80 Q30,120 30,150 Q50,160 70,150 Q70,120 70,80 Q75,60 75,40 Q50,30 25,40 Z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return getIcon();
};
