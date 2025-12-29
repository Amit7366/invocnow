"use client";

import { useInvoiceStore } from "@/app/store/useInvoiceStore";
import FloatingInput from "../ui/FloatingInput";



export default function ClientSection() {
  const { invoice, update } = useInvoiceStore();

  return (
    <section className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-sm">
      
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-100">
          Bill To
        </h3>
        <p className="text-xs text-gray-500">
          Client information
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <FloatingInput
          label="Client Name"
          value={invoice.to.name}
          onChange={(e) =>
            update({ to: { ...invoice.to, name: e.target.value } })
          }
        />

        <FloatingInput
          label="Client Address"
          value={invoice.to.address}
          onChange={(e) =>
            update({ to: { ...invoice.to, address: e.target.value } })
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FloatingInput
            label="City"
            value={invoice.to.city}
            onChange={(e) =>
              update({ to: { ...invoice.to, city: e.target.value } })
            }
          />

          <FloatingInput
            label="Country"
            value={invoice.to.country}
            onChange={(e) =>
              update({ to: { ...invoice.to, country: e.target.value } })
            }
          />
        </div>
      </div>
    </section>
  );
}
