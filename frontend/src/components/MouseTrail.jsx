import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function MouseTrail() {
    const containerRef = useRef(null);
    const flairsRef = useRef([]);

    // Gaming-themed flair icons/emojis
    const flairIcons = ['🎮', '🎯', '⚡', '⭐', '🔥', '💎', '🚀', '👾', '🕹️', '⚔️'];

    useGSAP(() => {
        const flairElements = gsap.utils.toArray(".trail-flair");
        const wrapper = gsap.utils.wrap(0, flairElements.length);
        let index = 0;
        let lastMousePos = { x: 0, y: 0 };
        let mousePos = { x: 0, y: 0 };
        const gap = 120; // Distance between flair spawns

        const playAnimation = (shape) => {
            let tl = gsap.timeline();
            tl.fromTo(shape, 
                { opacity: 0, scale: 0, rotation: 0 },
                { 
                    opacity: 1, 
                    scale: 1, 
                    rotation: gsap.utils.random(-360, 360),
                    ease: "elastic.out(1, 0.3)",
                    duration: 1
                }
            )
            .to(shape, {
                y: "+=150",
                opacity: 0,
                scale: 0.5,
                ease: "power2.in",
                duration: 1,
            }, "-=0.2");
        };

        const onMouseMove = (e) => {
            mousePos = { x: e.clientX, y: e.clientY };
        };

        const tick = () => {
            const travelDistance = Math.hypot(
                lastMousePos.x - mousePos.x,
                lastMousePos.y - mousePos.y
            );

            if (travelDistance > gap) {
                const wrappedIndex = wrapper(index);
                const el = flairElements[wrappedIndex];
                
                gsap.killTweensOf(el);
                gsap.set(el, {
                    left: mousePos.x,
                    top: mousePos.y,
                    xPercent: -50,
                    yPercent: -50,
                    opacity: 0,
                    scale: 1
                });

                playAnimation(el);
                
                lastMousePos = { ...mousePos };
                index++;
            }
        };

        window.addEventListener("mousemove", onMouseMove);
        gsap.ticker.add(tick);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            gsap.ticker.remove(tick);
        };
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
                <div 
                    key={i} 
                    className="trail-flair absolute opacity-0 text-3xl select-none pointer-events-none filter drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                >
                    {flairIcons[i % flairIcons.length]}
                </div>
            ))}
        </div>
    );
}
