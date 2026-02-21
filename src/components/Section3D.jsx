import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Section3D = ({ children, className = "", animated = true }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start center"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
    const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

    if (!animated) {
        return (
            <div ref={ref} className={`perspective-1000 ${className}`}>
                {children}
            </div>
        );
    }

    return (
        <motion.div
            ref={ref}
            style={{ scale, rotateX, opacity, y }}
            className={`perspective-1000 ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default Section3D;
