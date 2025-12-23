"use client";


import LogoUploader from "./LogoUploader";
import FloatingInput from "../ui/FloatingInput";
import { useInvoiceStore } from "@/app/store/useInvoiceStore";

export default function CompanySection() {
  const { invoice, update } = useInvoiceStore();

  return (
    <section className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-sm">
      
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-100">
            From
          </h3>
          <p className="text-xs text-gray-500">
            Company details
          </p>
        </div>

        <LogoUploader />
      </div>

      {/* Form */}
      <div className="space-y-4">
        <FloatingInput
          label="Company Name"
          value={invoice.from.name}
          onChange={(e) =>
            update({ from: { ...invoice.from, name: e.target.value } })
          }
        />

        <FloatingInput
          label="Address"
          value={invoice.from.address}
          onChange={(e) =>
            update({ from: { ...invoice.from, address: e.target.value } })
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FloatingInput
            label="City"
            value={invoice.from.city}
            onChange={(e) =>
              update({ from: { ...invoice.from, city: e.target.value } })
            }
          />

          <FloatingInput
            label="Country"
            value={invoice.from.country}
            onChange={(e) =>
              update({ from: { ...invoice.from, country: e.target.value } })
            }
          />
        </div>
      </div>
    </section>
  );
}
