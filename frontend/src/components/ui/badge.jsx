// //badge.jsx
import React from "react";
import { cn } from "../../lib/utils";

const Badge = ({ children, className = "" }) => (
    <span className={cn("px-3 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-full", className)}>
        {children}
    </span>
);

export default Badge;















// import React from "react";
// import { cn } from "../../lib/utils";

// export function Badge({ children, variant = "default", className = "" }) {
//     const variants = {
//         default: "bg-primary/20 text-primary border border-primary/30",
//         outline: "border border-primary/50 text-primary",
//         neon:
//             "text-cyan-300 border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)]",
//     };

//     return (
//         <span
//             className={cn(
//                 "inline-flex items-center px-2 py-1 text-xs font-medium rounded-md select-none transition-all",
//                 variants[variant] || variants.default,
//                 className
//             )}
//         >
//             {children}
//         </span>
//     );
// }
