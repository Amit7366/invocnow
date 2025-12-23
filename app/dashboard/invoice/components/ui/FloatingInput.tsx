"use client";

import { InputHTMLAttributes } from "react";

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FloatingInput({
  label,
  value,
  className = "",
  ...props
}: FloatingInputProps) {
  return (
    <div className="relative w-full">
      <input
        {...props}
        value={value}
        placeholder=" "
        className={`peer h-11 w-full rounded-lg border border-gray-700 
        bg-gray-900 px-3 pt-4 text-sm text-white
        focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20
        ${className}`}
      />

      <label
        className="pointer-events-none absolute left-3 top-3
        origin-left scale-100 text-xs text-white transition-all
        peer-placeholder-shown:top-3.5
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:text-sm
        peer-placeholder-shown:text-white/50
        peer-focus:top-1
        peer-focus:scale-90
        peer-focus:text-yellow-400"
      >
        {label}
      </label>
    </div>
  );
}
