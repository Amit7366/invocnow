"use client";

import { useInvoiceStore } from "../../store/useInvoiceStore";

export default function ClientSection() {
  const { invoice, update } = useInvoiceStore();

  return (
    <section className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="font-semibold mb-3">Bill To</h3>

      <input
        className="input"
        placeholder="Client Name"
        value={invoice.to.name}
        onChange={(e) =>
          update({ to: { ...invoice.to, name: e.target.value } })
        }
      />

      <input
        className="input"
        placeholder="Client Address"
        value={invoice.to.address}
        onChange={(e) =>
          update({ to: { ...invoice.to, address: e.target.value } })
        }
      />

      <div className="grid grid-cols-2 gap-2">
        <input
          className="input"
          placeholder="City"
          value={invoice.to.city}
          onChange={(e) =>
            update({ to: { ...invoice.to, city: e.target.value } })
          }
        />
        <input
          className="input"
          placeholder="Country"
          value={invoice.to.country}
          onChange={(e) =>
            update({ to: { ...invoice.to, country: e.target.value } })
          }
        />
      </div>
    </section>
  );
}
