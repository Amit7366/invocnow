"use client";

import { useReactToPrint } from "react-to-print";
import React, { useState } from "react";
import { Download } from "lucide-react";
import { useInvoiceStore } from "@/app/store/useInvoiceStore";
import { useSession } from "next-auth/react";
import { createInvoice } from "@/app/lib/api/invoice";

export default function DownloadButton({
  printRef,
}: {
  printRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { invoice, update } = useInvoiceStore(); // ✅ get update too
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: invoice.invoiceNo || "Invoice",
  });

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const handleSaveAndPrint = async () => {
    if (!session?.googleIdToken) return;
    if (!printRef.current) return;

    try {
      setLoading(true);

      const res = await createInvoice(
        {
          ...invoice,
          issueDate: invoice.issueDate || new Date().toISOString(),
        },
        session.googleIdToken
      );

      // depending on your sendSuccess shape:
      const savedInvoice = res?.data ?? res?.invoice ?? res;

      console.log(savedInvoice)

      if (savedInvoice?.invoiceNo) {
        update({ invoiceNo: savedInvoice.invoiceNo, _id: savedInvoice._id });
        // console.log(update)

        // ✅ wait for React to re-render the preview
        await sleep(0);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            handlePrint?.();
          });
        });

        return;
      } 

      // fallback if no invoiceNo returned
      handlePrint?.();
    } catch (error: any) {
      console.error(error?.response?.data || error);
       handlePrint?.();
      // alert(error?.response?.data?.message || "Invoice could not be saved!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSaveAndPrint}
      // ✅ IMPORTANT: don't disable based on printRef.current (ref changes don't rerender)
      disabled={loading || status === "loading"}
      className={`
        inline-flex items-center gap-2
        px-5 py-2.5 rounded-xl text-sm font-medium
        transition-all duration-200
        ${
          loading
            ? "bg-gray-400 cursor-wait"
            : "bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white"
        }
      `}
    >
      <Download size={18} />
      {loading ? "Saving..." : "Save and print invoices"}
    </button>
  );
}
