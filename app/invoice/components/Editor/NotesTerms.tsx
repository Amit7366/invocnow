"use client";

import { useInvoiceStore } from "../../store/useInvoiceStore";
import FloatingTextarea from "./FloatingTextarea";


export default function NotesTerms() {
  const { invoice, update } = useInvoiceStore();

  return (
    <section className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-sm">
      
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-100">
          Notes & Terms
        </h3>
        <p className="text-xs text-gray-500">
          Additional information for the client
        </p>
      </div>

      {/* Textareas */}
      <div className="space-y-4">
        <FloatingTextarea
          label="Notes"
          value={invoice.notes}
          onChange={(e) => update({ notes: e.target.value })}
        />

        <FloatingTextarea
          label="Terms & Conditions"
          value={invoice.terms}
          onChange={(e) => update({ terms: e.target.value })}
        />
      </div>
    </section>
  );
}
