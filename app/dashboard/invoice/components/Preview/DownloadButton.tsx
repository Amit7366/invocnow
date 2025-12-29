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
  const { invoice } = useInvoiceStore();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
 console.log("SESSION 👉", session);



  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: invoice.invoiceNo || "Invoice",
  });

  const handleSaveAndPrint = async () => {
    if (!session || !printRef.current) return;

    try {
      setLoading(true);

      await createInvoice(
        {
          ...invoice,
          issueDate: invoice.issueDate || new Date().toISOString(),
        },
        (session as any).accessToken // or jwt token
      );

      handlePrint?.(); // ✅ print only after save
    } catch (error) {
      alert("ইনভয়েস সংরক্ষণ করা যায়নি!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSaveAndPrint}
      disabled={loading || !printRef.current}
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
      {loading ? "সংরক্ষণ হচ্ছে..." : "ইনভয়েস সংরক্ষণ ও প্রিন্ট"}
    </button>
  );
}
