import React from 'react';

const Logo = ({ className = "w-10 h-10", showText = false }) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                <defs>
                    <linearGradient id="logoGradientBright" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#E879F9" /> {/* Bright Neon Purple */}
                        <stop offset="50%" stopColor="#F472B6" /> {/* Bright Pink */}
                        <stop offset="100%" stopColor="#C084FC" /> {/* Light Violet */}
                    </linearGradient>
                    <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feComposite in="coloredBlur" in2="SourceGraphic" operator="over" />
                    </filter>
                </defs>

                {/* Outer Glow Layer */}
                <path
                    d="M50 15 
                   C50 15, 65 15, 65 22 
                   C65 28, 55 35, 45 40 
                   C35 45, 25 55, 30 70 
                   C35 85, 50 90, 60 85 
                   L65 82"
                    stroke="url(#logoGradientBright)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#neonGlow)"
                    opacity="0.6"
                />

                {/* Main Stroke */}
                <path
                    d="M50 15 
                   C50 15, 65 15, 65 22 
                   C65 28, 55 35, 45 40 
                   C35 45, 25 55, 30 70 
                   C35 85, 50 90, 60 85 
                   L65 82"
                    stroke="url(#logoGradientBright)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                />

                {/* Hook Top Detail */}
                <path
                    d="M50 15 C45 10, 50 5, 55 5 C60 5, 60 10, 60 10"
                    stroke="url(#logoGradientBright)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                />

                {/* White Highlight for pop */}
                <circle cx="65" cy="82" r="3" fill="#FFFFFF" />
            </svg>
            {showText && (
                <span className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
                    Stylencia
                </span>
            )}
        </div>
    );
};

export default Logo;
