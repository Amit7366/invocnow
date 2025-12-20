"use client";

import { TextareaHTMLAttributes } from "react";

interface FloatingTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export default function FloatingTextarea({
  label,
  value,
  className = "",
  ...props
}: FloatingTextareaProps) {
  return (
    <div className="relative w-full">
      <textarea
        {...props}
        value={value}
        placeholder=" "
        rows={4}
        className={`peer w-full resize-none rounded-lg border border-gray-700
        bg-gray-900 px-3 pt-5 text-sm text-gray-100
        focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20
        ${className}`}
      />

      <label
        className="pointer-events-none absolute left-3 top-3
        origin-left scale-100 text-xs text-gray-400 transition-all
        peer-placeholder-shown:top-4
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:text-sm
        peer-placeholder-shown:text-gray-500
        peer-focus:top-2
        peer-focus:scale-90
        peer-focus:text-blue-400"
      >
        {label}
      </label>
    </div>
  );
}
