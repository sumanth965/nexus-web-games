//label.jsx
import React from "react";
import { cn } from "../../lib/utils";

const Label = ({ children, className = "" }) => (
    <label className={cn("text-sm text-gray-300", className)}>{children}</label>
);

export default Label;














// import * as React from "react";
// import { cn } from "../../lib/utils"; // <-- adjust path if needed

// const Label = React.forwardRef(({ className, ...props }, ref) => {
//     return (
//         <label
//             ref={ref}
//             className={cn(
//                 "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
//                 className
//             )}
//             {...props}
//         />
//     );
// });

// Label.displayName = "Label";

// export { Label };
