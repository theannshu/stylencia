import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = "", showText = true, textClassName = "" }) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {/* Initial Icon - minimal SL monogram in text if needed, or just the full text */}
            {/* For this request, we are moving to a text-based branding. 
                We can use a stylized 'S' or just the name. 
                Let's make a nice text-based logo. */}

            <div className={`font-logo font-bold text-white tracking-[0.2em] drop-shadow-[0_0_8px_rgba(216,180,254,0.5)] ${textClassName || "text-xl"}`}>
                STYLENCIA
            </div>
        </div>
    );
};

export default Logo;
