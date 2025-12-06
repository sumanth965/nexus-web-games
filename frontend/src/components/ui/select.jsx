//select.jsx
import * as React from "react";
import { cn } from "../../lib/utils";

export function Select({ value, onValueChange, children }) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (val) => {
    onValueChange && onValueChange(val);
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          open,
          setOpen,
          value,
          onSelect: handleSelect,
        })
      )}
    </div>
  );
}

export function SelectTrigger({ className, open, setOpen, value, children }) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className={cn(
        "w-40 px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 flex justify-between items-center",
        className
      )}
    >
      {children}
    </button>
  );
}

export function SelectValue({ value, placeholder }) {
  return <span>{value || placeholder}</span>;
}

export function SelectContent({ open, children }) {
  if (!open) return null;
  return (
    <div className="absolute mt-2 z-50 w-40 bg-gray-900 border border-gray-700 rounded-md shadow-lg">
      <div className="p-1">{children}</div>
    </div>
  );
}

export function SelectItem({ children, onSelect, className }) {
  return (
    <div
      onClick={() => onSelect(children)}
      className={cn(
        "px-3 py-2 cursor-pointer hover:bg-gray-700 rounded",
        className
      )}
    >
      {children}
    </div>
  );
}
