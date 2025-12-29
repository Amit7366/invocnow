"use client";

import { useInvoiceStore } from "@/app/store/useInvoiceStore";

const templates = [
  { key: "classic", label: "classic" },
  { key: "modern", label: "modern" },
  { key: "compact", label: "compact" },
  { key: "stripe", label: "stripe" },
  { key: "zoho", label: "Zoho" },
  { key: "freshbook", label: "FreshBooks" },
];

export default function TemplateSwitcher() {
  const { invoice, update } = useInvoiceStore();

  return (
    <div className="flex flex-wrap gap-3">
      {templates.map((t) => {
        const active = invoice.theme === t.key;

        return (
          <button
            key={t.key}
            onClick={() => update({ theme: t.key as any })}
            className={`
              px-4 py-1.5  rounded-full text-sm font-medium
              cursor-pointer
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${
                active
                  ? "bg-emerald-600 text-white shadow-md scale-105 focus:ring-emerald-500"
                  : `
                    border border-gray-300 dark:border-gray-600
                    text-black 
                    hover:bg-emerald-50 dark:hover:bg-gray-700
                    hover:border-emerald-500
                    hover:text-white
                    hover:shadow-sm
                    hover:-translate-y-0.5
                  `
              }
            `}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
