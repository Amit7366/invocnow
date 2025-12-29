// app/invoice/page.tsx
"use client";

import InvoiceEditor from "./components/Editor/InvoiceEditor";
import InvoicePreview from "./components/Preview/InvoicePreview";

export default function InvoicePage() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-3 min-h-screen">
      <div className="no-print w-full md:w-2/5">
        <InvoiceEditor />
      </div>
      <div className="w-full md:w-3/5 min-h-screen">
        <InvoicePreview />
      </div>
    </div>
  );
}
