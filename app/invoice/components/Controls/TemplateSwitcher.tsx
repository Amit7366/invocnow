"use client";

import { useInvoiceStore } from "../../store/useInvoiceStore";

export default function TemplateSwitcher() {
  const { invoice, update } = useInvoiceStore();

  return (
    <div className="flex gap-2">
      {["classic", "modern", "compact"].map((t) => (
        <button
          key={t}
          onClick={() => update({ theme: t as any })}
          className={`px-3 py-1 rounded ${
            invoice.theme === t
              ? "bg-blue-600 text-white"
              : "border"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
