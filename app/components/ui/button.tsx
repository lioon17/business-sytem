import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "icon";
  className?: string;
}

export function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded focus:outline-none focus:ring-2 transition";

  // Define variant styles
  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100", // Added "outline" style
    ghost: "bg-transparent text-gray-600 hover:bg-gray-200",
  };

  // Define size styles
  const sizeStyles = {
    default: "text-base",
    icon: "p-2 rounded-full", // Adjust for small icon buttons
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
