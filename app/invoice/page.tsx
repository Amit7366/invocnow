// app/invoice/page.tsx
"use client";

import { div } from "framer-motion/client";
import InvoiceEditor from "./components/Editor/InvoiceEditor";
import InvoicePreview from "./components/Preview/InvoicePreview";

export default function InvoicePage() {
  return (
    <>
      <div className="w-full bg-gray-800">
        <h1 className="text-center py-2 text-5xl text-[#57BEA4] font-extrabold">Invocnow</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="no-print">
          <InvoiceEditor />
        </div>

        <InvoicePreview />
      </div>
    </>
  );
}
