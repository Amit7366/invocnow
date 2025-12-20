"use client";

import { useInvoiceStore } from "../../store/useInvoiceStore";

export default function NotesTerms() {
  const { invoice, update } = useInvoiceStore();

  return (
    <section className="bg-white rounded-xl p-4 shadow-sm">
      <textarea
        className="input h-20"
        placeholder="Notes"
        value={invoice.notes}
        onChange={(e) => update({ notes: e.target.value })}
      />

      <textarea
        className="input h-20 mt-2"
        placeholder="Terms & Conditions"
        value={invoice.terms}
        onChange={(e) => update({ terms: e.target.value })}
      />
    </section>
  );
}
