//avatar.jsx
import React from "react";

const Avatar = ({ children }) => (
    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-2xl">
        {children}
    </div>
);

export default Avatar;
