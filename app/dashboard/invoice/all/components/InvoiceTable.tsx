"use client";

import { useMemo, useState } from "react";
import InvoiceRow from "./InvoiceRow";

const invoices = [
  {
    invoiceNo: "INV-001",
    client: "Rahim Traders",
    date: "2025-01-12",
    amount: "4,500",
    status: "paid",
  },
  {
    invoiceNo: "INV-002",
    client: "Karim Enterprise",
    date: "2025-01-15",
    amount: "2,300",
    status: "due",
  },
  {
    invoiceNo: "INV-003",
    client: "Hasan Store",
    date: "2025-01-05",
    amount: "6,800",
    status: "overdue",
  },
];

export default function InvoiceTable() {
  const [query, setQuery] = useState("");

  /** 🔍 Filter logic */
  const filteredInvoices = useMemo(() => {
    if (!query.trim()) return invoices;

    const q = query.toLowerCase();

    return invoices.filter(
      (inv) =>
        inv.invoiceNo.toLowerCase().includes(q) ||
        inv.client.toLowerCase().includes(q) ||
        inv.status.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Invoice list
        </h2>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find Invoice/Client/Status"
          className="
            w-full sm:w-72
            px-3 py-2 rounded-lg
            bg-gray-50 dark:bg-gray-700
            text-gray-900 dark:text-white
            placeholder-gray-400
            border border-gray-200 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />
      </div>

      {/* Table Wrapper */}
      <div className="relative w-full md:w-auto overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">Invoice</th>
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((inv) => (
                <InvoiceRow key={inv.invoiceNo} {...inv} />
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile hint */}
      <div className="px-4 py-2 text-xs text-gray-400 dark:text-gray-500 sm:hidden">
        ← Scroll left/right to see the table
      </div>
    </div>
  );
}
