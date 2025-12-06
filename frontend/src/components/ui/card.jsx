// src/components/ui/card.jsx
import React from "react";
import { cn } from "../../lib/utils";

export default function Card({ children, className = "" }) {
    return (
        <div className={cn("bg-gray-900/60 border border-gray-700 rounded-xl", className)}>
            {children}
        </div>
    );
}

export function CardHeader({ children, className = "" }) {
    return (
        <div className={cn("p-6 border-b border-gray-700", className)}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className = "" }) {
    return (
        <h3 className={cn("text-lg font-bold text-cyan-400", className)}>
            {children}
        </h3>
    );
}

export function CardContent({ children, className = "" }) {
    return (
        <div className={cn("p-6", className)}>
            {children}
        </div>
    );
}









// import React from "react";
// import { cn } from "../../lib/utils";

// export function Card({ className, ...props }) {
//     return (
//         <div
//             className={cn(
//                 "glass-card rounded-xl border shadow-lg transition-all duration-300 hover:shadow-[var(--shadow-neon-purple)]",
//                 className
//             )}
//             {...props}
//         />
//     );
// }

// export function CardHeader({ className, ...props }) {
//     return (
//         <div
//             className={cn(
//                 "p-6 pb-2 flex flex-col gap-1",
//                 className
//             )}
//             {...props}
//         />
//     );
// }

// export function CardTitle({ className, ...props }) {
//     return (
//         <h3
//             className={cn(
//                 "text-2xl font-bold tracking-wide text-foreground neon-title-glow",
//                 className
//             )}
//             {...props}
//         />
//     );
// }

// export function CardDescription({ className, ...props }) {
//     return (
//         <p
//             className={cn(
//                 "text-sm text-muted-foreground",
//                 className
//             )}
//             {...props}
//         />
//     );
// }

// export function CardContent({ className, ...props }) {
//     return (
//         <div
//             className={cn("p-6 pt-2", className)}
//             {...props}
//         />
//     );
// }
