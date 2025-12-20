"use client";

import { useInvoiceStore } from "../../store/useInvoiceStore";

export default function Totals() {
  const { invoice, update } = useInvoiceStore();

  return (
    <section className="bg-white rounded-xl p-4 shadow-sm">
      <div className="grid grid-cols-3 gap-2">
        <input
          type="number"
          className="input"
          placeholder="Tax %"
          value={invoice.tax}
          onChange={(e) => update({ tax: Number(e.target.value) })}
        />
        <input
          type="number"
          className="input"
          placeholder="Discount"
          value={invoice.discount}
          onChange={(e) => update({ discount: Number(e.target.value) })}
        />
        <input
          type="number"
          className="input"
          placeholder="Shipping"
          value={invoice.shipping}
          onChange={(e) => update({ shipping: Number(e.target.value) })}
        />
      </div>
    </section>
  );
}
