"use client";

import CompanySection from "./CompanySection";
import ClientSection from "./ClientSection";
import LineItems from "./LineItems";
import Totals from "./Totals";
import NotesTerms from "./NotesTerms";
import InvoiceDates from "./InvoiceDates";

export default function InvoiceEditor() {
  return (
    <div className="p-6 border-r bg-gray-50 dark:bg-gray-900 overflow-y-auto">
      <div className="max-w-xl mx-auto space-y-6">

        <CompanySection />
        <InvoiceDates />
        <ClientSection />
        <LineItems />
        <Totals />
        <NotesTerms />
      </div>
    </div>
  );
}
