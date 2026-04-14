import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Magnetic({ children, strength = 0.5 }) {
    const magnetic = useRef(null);

    useGSAP(() => {
        const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const mouseMove = (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = magnetic.current.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x * strength);
            yTo(y * strength);
        };

        const mouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        magnetic.current.addEventListener("mousemove", mouseMove);
        magnetic.current.addEventListener("mouseleave", mouseLeave);

        return () => {
            // Cleanup check - useGSAP cleanup is automatic for refs if handled inside
            // But manual listeners need manual removal
            if (magnetic.current) {
                magnetic.current.removeEventListener("mousemove", mouseMove);
                magnetic.current.removeEventListener("mouseleave", mouseLeave);
            }
        };
    }, { scope: magnetic });

    return React.cloneElement(children, { ref: magnetic });
}
