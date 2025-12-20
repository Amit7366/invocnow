"use client";

import { useInvoiceStore } from "../../store/useInvoiceStore";
import FloatingInput from "../ui/FloatingInput";

export default function Totals() {
  const { invoice, update } = useInvoiceStore();

  return (
    <section className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-sm">
      
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-100">
          Adjustments
        </h3>
        <p className="text-xs text-gray-500">
          Tax, discount & additional charges
        </p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FloatingInput
          type="number"
          label="Tax (%)"
          value={invoice.tax}
          min={0}
          onChange={(e) =>
            update({ tax: Number(e.target.value) })
          }
        />

        <FloatingInput
          type="number"
          label="Discount"
          value={invoice.discount}
          min={0}
          onChange={(e) =>
            update({ discount: Number(e.target.value) })
          }
        />

        <FloatingInput
          type="number"
          label="Shipping"
          value={invoice.shipping}
          min={0}
          onChange={(e) =>
            update({ shipping: Number(e.target.value) })
          }
        />
      </div>
    </section>
  );
}
