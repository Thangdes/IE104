import React from "react";


const Input = React.forwardRef(({ className = "", type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={`w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-300 ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
export default Input;
