import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function CustomCursor() {
    const cursor = useRef(null);
    const follower = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useGSAP(() => {
        const xTo = gsap.quickTo(cursor.current, "x", { duration: 0.1, ease: "none" });
        const yTo = gsap.quickTo(cursor.current, "y", { duration: 0.1, ease: "none" });
        
        const xFollowerTo = gsap.quickTo(follower.current, "x", { duration: 0.3, ease: "power3" });
        const yFollowerTo = gsap.quickTo(follower.current, "y", { duration: 0.3, ease: "power3" });

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;
            xTo(clientX);
            yTo(clientY);
            xFollowerTo(clientX);
            yFollowerTo(clientY);
            if (!isVisible) setIsVisible(true);
        };

        const onMouseEnter = () => setIsVisible(true);
        const onMouseLeave = () => setIsVisible(false);

        window.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseenter", onMouseEnter);
        document.body.addEventListener("mouseleave", onMouseLeave);

        // Hover detection
        const onHoverStart = () => setIsHovering(true);
        const onHoverEnd = () => setIsHovering(false);

        const interactiveElements = document.querySelectorAll('button, a, .cursor-pointer');
        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", onHoverStart);
            el.addEventListener("mouseleave", onHoverEnd);
        });

        // Add class to body to hide browser cursor
        document.body.classList.add('custom-cursor-active');

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.body.removeEventListener("mouseenter", onMouseEnter);
            document.body.removeEventListener("mouseleave", onMouseLeave);
            document.body.classList.remove('custom-cursor-active');
        };
    }, []);

    if (typeof window === 'undefined') return null;

    return (
        <div className={`fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 carousel'}`}>
            {/* INNER DOT */}
            <div 
                ref={cursor}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
            />
            {/* OUTER RING */}
            <div 
                ref={follower}
                className={`fixed top-0 left-0 w-8 h-8 border border-white rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out ${isHovering ? 'scale-[2.5] bg-white/10' : 'scale-100'}`}
            />
        </div>
    );
}
