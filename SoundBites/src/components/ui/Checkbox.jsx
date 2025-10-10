import React from "react";

export default function Checkbox({ checked = false, onChange, className = "", ...props }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange && onChange(e.target.checked)}
      className={
        `w-4 h-4 rounded accent-orange-400 border-gray-300 focus:outline-none ${className}`
      }
      {...props}
    />
  );
}
