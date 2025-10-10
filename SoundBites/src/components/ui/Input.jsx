import React from "react";


const Input = React.forwardRef(({ className = "", type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={`w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-800 ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
export default Input;
