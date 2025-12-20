"use client";

import { useReactToPrint } from "react-to-print";
import React from "react";

export default function DownloadButton({
  printRef,
}: {
  printRef: React.RefObject<HTMLDivElement | null>;
}) {
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Invoice",
  });

  return (
    <button
      onClick={handlePrint}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      disabled={!printRef.current}
    >
      Download / Print
    </button>
  );
}
