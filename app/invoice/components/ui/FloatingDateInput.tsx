"use client";

import { InputHTMLAttributes } from "react";

interface FloatingDateInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FloatingDateInput({
  label,
  value,
  className = "",
  ...props
}: FloatingDateInputProps) {
  return (
    <div className="relative w-full">
      <input
        {...props}
        type="date"
        value={value}
        className={`peer h-11 w-full rounded-lg border border-gray-700 
        bg-gray-900 px-3 pt-4 text-sm text-gray-100
        focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20
        ${className}`}
      />

      <label
        className="pointer-events-none absolute left-3 top-1
        text-xs font-medium text-gray-400 transition-all
        peer-focus:text-blue-400"
      >
        {label}
      </label>
    </div>
  );
}
