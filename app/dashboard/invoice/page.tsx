// app/invoice/page.tsx
"use client";

import InvoiceEditor from "./components/Editor/InvoiceEditor";
import InvoicePreview from "./components/Preview/InvoicePreview";


export default function InvoicePage() {
  return (

      
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="no-print">
          <InvoiceEditor />
        </div>

        <InvoicePreview />
      </div>
   
  );
}
