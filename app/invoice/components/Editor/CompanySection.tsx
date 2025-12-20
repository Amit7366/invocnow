"use client";

import { useInvoiceStore } from "../../store/useInvoiceStore";

export default function CompanySection() {
  const { invoice, update } = useInvoiceStore();

  return (
    <section className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="font-semibold mb-3">From</h3>

      <input
        className="input"
        placeholder="Your Company Name"
        value={invoice.from.name}
        onChange={(e) =>
          update({ from: { ...invoice.from, name: e.target.value } })
        }
      />

      <input
        className="input"
        placeholder="Address"
        value={invoice.from.address}
        onChange={(e) =>
          update({ from: { ...invoice.from, address: e.target.value } })
        }
      />

      <div className="grid grid-cols-2 gap-2">
        <input
          className="input"
          placeholder="City"
          value={invoice.from.city}
          onChange={(e) =>
            update({ from: { ...invoice.from, city: e.target.value } })
          }
        />
        <input
          className="input"
          placeholder="Country"
          value={invoice.from.country}
          onChange={(e) =>
            update({ from: { ...invoice.from, country: e.target.value } })
          }
        />
      </div>
    </section>
  );
}
