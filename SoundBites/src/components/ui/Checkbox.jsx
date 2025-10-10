import React from "react";

export default function Checkbox({ checked = false, onChange, className = "", ...props }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange && onChange(e.target.checked)}
      className={`w-4 h-4 rounded border-gray-600 bg-gray-800 accent-teal-900 focus:outline-none ${className}`}
      {...props}
    />
  );
}
