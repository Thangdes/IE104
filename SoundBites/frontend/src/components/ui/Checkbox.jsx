import React from "react";

export default function Checkbox({ checked = false, onChange, className = "", ...props }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange && onChange(e.target.checked)}
      className={`w-4 h-4 rounded border-gray-600 bg-gray-800 accent-[#626267] focus:outline-none duration-300 hover:scale-[1.2] ${className}`}
      {...props}
    />
  );
}
