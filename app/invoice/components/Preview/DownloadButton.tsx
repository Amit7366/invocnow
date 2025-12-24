"use client";

import { useReactToPrint } from "react-to-print";
import React from "react";
import { Download } from "lucide-react";

export default function DownloadButton({
  printRef,
}: {
  printRef: React.RefObject<HTMLDivElement | null>;
}) {
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Invoice",
  });

  const disabled = !printRef.current;

  return (
    <button
      onClick={handlePrint}
      disabled={disabled}
      className={`
        cursor-pointer
        inline-flex items-center gap-2
        px-5 py-2.5 rounded-xl text-sm font-medium
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${
          disabled
            ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white focus:ring-emerald-500"
        }
      `}
    >
      <Download size={18} />
      ইনভয়েস ডাউনলোড / প্রিন্ট
    </button>
  );
}
