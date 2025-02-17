import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`border p-2 rounded-md ${className}`}
        {...props} // ✅ This spreads all props, including `id`
      />
    );
  }
);

Input.displayName = "Input";
