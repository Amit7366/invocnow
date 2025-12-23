"use client";

import { useInvoiceStore } from "@/app/store/useInvoiceStore";
import FloatingDateInput from "../ui/FloatingDateInput";

export default function InvoiceDates() {
  const { invoice, update } = useInvoiceStore();

  return (
    <section className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-sm">
      
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-100">
          Invoice Dates
        </h3>
        <p className="text-xs text-gray-500">
          Issue & payment timeline
        </p>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FloatingDateInput
          label="Issue Date"
          value={invoice.issueDate}
          onChange={(e) => update({ issueDate: e.target.value })}
        />

        <FloatingDateInput
          label="Due Date"
          value={invoice.dueDate}
          onChange={(e) => update({ dueDate: e.target.value })}
        />
      </div>
    </section>
  );
}
