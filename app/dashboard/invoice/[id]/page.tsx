"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

import InvoiceHeader from "../../components/InvoiceHeader";
import InvoiceItemsTable from "../../components/InvoiceItemsTable";
import InvoiceSummary from "../../components/InvoiceSummary";
import { getInvoiceById } from "@/app/lib/api/invoice";

export default function InvoiceViewPage() {
  const params = useParams<{ id: string }>();
  const { data: session, status } = useSession();
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      if (status === "loading") return;
      if (!session?.googleIdToken) return;

      try {
        setLoading(true);
        const res = await getInvoiceById(params.id, session.googleIdToken);
        const inv = res?.data ?? res; // handle sendSuccess wrapper
        setInvoice(inv);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [params.id, session?.googleIdToken, status]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-2xl p-8 shadow-sm">
        Loading...
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-2xl p-8 shadow-sm">
        Invoice not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-2xl p-8 shadow-sm">
      {/* ✅ pass invoice to your components */}
      <InvoiceHeader invoice={invoice} />

      {/* Billing Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            বিল প্রদানকারী
          </h4>
          <p className="text-gray-700 dark:text-gray-300">{invoice.to?.name || "-"}</p>
          <p className="text-gray-600 dark:text-gray-400">
            {[invoice.to?.city, invoice.to?.country].filter(Boolean).join(", ") || "-"}
          </p>
          <p className="text-gray-600 dark:text-gray-400">{invoice.to?.address || ""}</p>
        </div>

        <div className="md:text-right">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            প্রেরক
          </h4>
          <p className="text-gray-700 dark:text-gray-300">{invoice.from?.name || "-"}</p>
          <p className="text-gray-600 dark:text-gray-400">{invoice.userEmail || ""}</p>
          <p className="text-gray-600 dark:text-gray-400">
            {[invoice.from?.city, invoice.from?.country].filter(Boolean).join(", ") || "-"}
          </p>
          <p className="text-gray-600 dark:text-gray-400">{invoice.from?.address || ""}</p>
        </div>
      </div>

      <InvoiceItemsTable items={invoice.items || []} currency={invoice.currency} />
      <InvoiceSummary invoice={invoice} />

      <div className="mt-8 text-sm text-gray-600 dark:text-gray-400">
        <p>
          <strong>নোট:</strong> {invoice.notes || "—"}
        </p>
        <p className="mt-1">
          <strong>শর্তাবলী:</strong> {invoice.terms || "—"}
        </p>
      </div>
    </div>
  );
}
