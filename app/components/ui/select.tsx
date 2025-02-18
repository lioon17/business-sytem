"use client";

import { useState, ReactNode } from "react";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}

export function Select({ value, onValueChange, children }: SelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-2 border rounded bg-white text-gray-700"
      >
        {value || "Select"}
      </button>

      {/* Dropdown Content */}
      {open && (
        <div className="absolute w-full mt-1 border rounded bg-white shadow-md">
          {children}
        </div>
      )}
    </div>
  );
}

export function SelectTrigger({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function SelectValue({ placeholder }: { placeholder: string }) {
  return <span className="text-gray-500">{placeholder}</span>;
}

interface SelectItemProps {
  value: string;
  onSelect: (value: string) => void;
  children: ReactNode;
}

export function SelectItem({ value, onSelect, children }: SelectItemProps) {
  return (
    <div
      className="p-2 hover:bg-gray-200 cursor-pointer"
      onClick={() => onSelect(value)} // ✅ Updates selection properly
    >
      {children}
    </div>
  );
}

export function SelectContent({ children }: { children: ReactNode }) {
  return <div className="p-2">{children}</div>;
}
