import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function WavyTransition() {
    const container = useRef(null);
    const pathRef = useRef(null);

    useGSAP(() => {
        const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
        const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

        const tl = gsap.timeline({
            defaults: { ease: "power4.inOut" }
        });

        tl.set(pathRef.current, { 
            attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" } 
        })
        .to(pathRef.current, {
            attr: { d: start },
            duration: 0.8,
            ease: "power2.in"
        })
        .to(pathRef.current, {
            attr: { d: end },
            duration: 0.8,
            ease: "power2.out"
        })
        .to(container.current, {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.5
        });
    }, []);

    return (
        <div ref={container} className="fixed inset-0 z-[10001] flex items-center justify-center pointer-events-auto overflow-hidden">
            <svg className="absolute w-full h-[100vh] top-0 left-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="wavyGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                        <stop offset="0.2" stopColor="rgb(6, 182, 212)" />
                        <stop offset="0.7" stopColor="rgb(139, 92, 246)" />
                    </linearGradient>
                </defs>
                <path 
                    ref={pathRef}
                    stroke="url(#wavyGrad)" 
                    fill="url(#wavyGrad)" 
                    strokeWidth="2px" 
                    vectorEffect="non-scaling-stroke" 
                />
            </svg>
            <div className="relative z-10 text-center">
                <h2 className="text-4xl font-black text-white uppercase tracking-[0.5em] animate-pulse">Initializing Nexus</h2>
            </div>
        </div>
    );
}
