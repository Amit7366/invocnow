"use client";

import { useInvoiceStore } from "@/app/store/useInvoiceStore";
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
          Tax, discount, shipping & payments
        </p>
      </div>

      {/* Tax Type */}
      <div className="mb-4 flex gap-6">
        <label className="flex items-center gap-2 text-xs text-gray-400">
          <input
            type="radio"
            checked={invoice.taxType === "percentage"}
            onChange={() =>
              update({ taxType: "percentage", tax: 0 })
            }
          />
          Tax %
        </label>

        <label className="flex items-center gap-2 text-xs text-gray-400">
          <input
            type="radio"
            checked={invoice.taxType === "fixed"}
            onChange={() =>
              update({ taxType: "fixed", tax: 0 })
            }
          />
          Fixed Tax
        </label>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <FloatingInput
          type="number"
          label={
            invoice.taxType === "percentage"
              ? "Tax (%)"
              : "Tax Amount"
          }
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

        {/* ✅ Paid Amount */}
        <FloatingInput
          type="number"
          label="Paid Amount"
          value={invoice.paidAmount}
          min={0}
          onChange={(e) =>
            update({ paidAmount: Number(e.target.value) })
          }
        />
      </div>
    </section>
  );
}
