//switch.jsx
import React from "react";
import { cn } from "../../lib/utils";

const Switch = ({ checked, onChange }) => (
    <button
        onClick={() => onChange(!checked)}
        className={cn("w-12 h-6 rounded-full", checked ? "bg-cyan-500" : "bg-gray-600")}
    >
        <span className={cn("block w-4 h-4 bg-white rounded-full transition", checked && "translate-x-6")} />
    </button>
);

export default Switch;






// import * as React from "react";
// import { cn } from "../../lib/utils";

// export const Switch = React.forwardRef(
//     ({ className, checked, onCheckedChange, ...props }, ref) => {
//         return (
//             <button
//                 role="switch"
//                 aria-checked={checked}
//                 onClick={() => onCheckedChange && onCheckedChange(!checked)}
//                 ref={ref}
//                 className={cn(
//                     "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
//                     checked ? "bg-cyan-500" : "bg-gray-600",
//                     className
//                 )}
//                 {...props}
//             >
//                 <span
//                     className={cn(
//                         "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
//                         checked ? "translate-x-6" : "translate-x-1"
//                     )}
//                 />
//             </button>
//         );
//     }
// );

// Switch.displayName = "Switch";
