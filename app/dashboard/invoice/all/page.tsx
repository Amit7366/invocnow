"use client";

import { useEffect, useMemo, useState } from "react";

import { useSession } from "next-auth/react";
import { getInvoices } from "@/app/lib/api/invoice";
import InvoiceRow from "./components/InvoiceRow";

export default function InvoiceTable() {
  const [query, setQuery] = useState("");
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    const run = async () => {
      if (!session?.googleIdToken) return;
      try {
        setLoading(true);
        const res = await getInvoices(session.googleIdToken);

        // your sendSuccess likely returns { data: [...] }
        const list = res?.data ?? res;
        setInvoices(Array.isArray(list) ? list : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    if (status !== "loading") run();
  }, [session?.googleIdToken, status]);

  const filteredInvoices = useMemo(() => {
    if (!query.trim()) return invoices;
    const q = query.toLowerCase();

    return invoices.filter((inv) => {
      const invoiceNo = (inv.invoiceNo || "").toLowerCase();
      const client = (inv.to?.name || "").toLowerCase();
      const status = (inv.status || "").toLowerCase();
      const userName = (inv.userName || "").toLowerCase();

      return (
        invoiceNo.includes(q) ||
        client.includes(q) ||
        status.includes(q) ||
        userName.includes(q)
      );
    });
  }, [query, invoices]);

  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-sm">
      <div className="p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Invoice list
        </h2>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find Invoice/Client/User/Status"
          className="
            w-full sm:w-72 px-3 py-2 rounded-lg
            bg-gray-50 dark:bg-gray-700
            text-gray-900 dark:text-white
            placeholder-gray-400
            border border-gray-200 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />
      </div>

      <div className="relative w-full overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">Invoice</th>
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">User</th> {/* ✅ NEW */}
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : filteredInvoices.length > 0 ? (
              filteredInvoices.map((inv) => (
                <InvoiceRow
                  key={inv._id}
                  id={inv._id}
                  invoiceNo={inv.invoiceNo}
                  client={inv.to?.name || "-"}
                  userName={inv.userName || "-"} // ✅ NEW
                  date={inv.issueDate?.slice(0, 10) || "-"}
                  amount={String(inv.total ?? "")} // you can compute or send from backend
                  status={inv.status}
                  // ✅ pass these so status + totals are correct
                  items={inv.items}
                  taxType={inv.taxType}
                  tax={inv.tax}
                  discount={inv.discount}
                  shipping={inv.shipping}
                  paidAmount={inv.paidAmount}
                  dueDate={inv.dueDate}
                />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-2 text-xs text-gray-400 dark:text-gray-500 sm:hidden">
        ← Scroll left/right to see the table
      </div>
    </div>
  );
}
