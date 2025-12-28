import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'motion/react';

const CurvedLoop = ({
    marqueeText = 'Welcome to React Bits ✦',
    speed = 3,
    curveAmount = 500,
    direction = 'right',
    interactive = true,
    className = '',
}) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const containerRef = useRef(null);

    // Track scroll for basic parallax or movement
    const { scrollYProgress } = useScroll();

    // Animation state
    const x = useMotionValue(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowWidth(window.innerWidth);
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    // Loop animation logic
    const contentWidth = marqueeText.length * 15; // approximate width char
    const repeatCount = Math.ceil((windowWidth * 2) / contentWidth) + 2;
    const repeatedText = Array(Math.max(1, repeatCount)).fill(marqueeText).join(' ');

    useAnimationFrame((t, delta) => {
        // Basic infinite scroll
        let moveBy = direction === 'right' ? speed * -1 : speed; // reverse logic for natural feel or strict
        if (direction === 'right') moveBy = speed;
        else moveBy = -speed;

        // adjust speed with delta for consistency
        const deltaAdjustedMove = (moveBy * (delta / 16));

        let newX = x.get() + deltaAdjustedMove;

        // Reset logic is tricky on a curve without knowing exact path length
        // simplified: just let it run. For a true loop, we need exact measurements.
        // CSS animation might be smoother for infinite loop, but let's try motion value for control.

        // For a perfect loop, we usually wrap around
        // textPath needs startOffset.

        // Let's use startOffset control
    });

    // Use simple CSS animation for the textPath startOffset is easier for infinite loop

    const pathId = `curved-path-${Math.random().toString(36).substr(2, 9)}`;
    const curveY = curveAmount;

    // Create a Quadratic Bezier Curve
    // M 0 50 Q 50% 50+curve, 100% 50
    // Adjust control point based on curveAmount

    // Responsive path
    const width = windowWidth || 1000;
    const height = Math.abs(curveAmount) + 100;
    const centerY = height / 2;

    // Curve Logic:
    // If curveAmount is positive, curve down. If negative, curve up.
    // M 0 centerY Q width/2 (centerY + curveAmount) width centerY

    const d = `M -200 ${centerY} Q ${width / 2} ${centerY + curveAmount} ${width + 200} ${centerY}`;

    return (
        <div
            ref={containerRef}
            className={`relative w-full overflow-hidden flex items-center justify-center ${className}`}
            style={{ height: height }}
        >
            <svg className="w-full h-full absolute top-0 left-0 pointer-events-none" viewBox={`0 0 ${width} ${height}`}>
                <path id={pathId} d={d} fill="none" stroke="transparent" />
                <text className="text-4xl font-bold uppercase tracking-wider fill-current text-slate-900" style={{ fontSize: '2rem' }}>
                    <textPath
                        href={`#${pathId}`}
                        startOffset="0%"
                    >
                        <animate
                            attributeName="startOffset"
                            from={direction === 'right' ? "100%" : "-100%"}
                            to={direction === 'right' ? "-100%" : "100%"}
                            dur={`${30 / speed}s`}
                            repeatCount="indefinite"
                        />
                        {Array(4).fill(marqueeText).join(' . ')}
                        {/* Add plenty of text */}
                    </textPath>
                </text>
            </svg>

            {/* Interactive hover effect could go here if interactive=true */}
        </div>
    );
};

export default CurvedLoop;
