import React from "react";

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "destructive";
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant = "default", className = "", children }: BadgeProps) {
  const baseStyles = "px-2 py-1 rounded text-sm font-medium";

  // Define styles for each variant
  const variantStyles = {
    default: "bg-gray-200 text-gray-800",
    success: "bg-green-500 text-white",   // ✅ Added success variant
    warning: "bg-yellow-500 text-white",  // ✅ Added warning variant
    destructive: "bg-red-500 text-white", // ✅ Added destructive variant
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
