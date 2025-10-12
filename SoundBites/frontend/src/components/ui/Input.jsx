import React from "react";


const Input = React.forwardRef(({ className = "", type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={`w-full border border-gray-700 rounded px-6 py-3 text-[16px] text-white placeholder-gray-400 leading-snug transition-colors duration-300 hover:border-[#FFFFFF] focus:border-[#FFFFFF] focus:outline-none ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
export default Input;
