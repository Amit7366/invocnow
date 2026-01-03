"use client";

const STYLES: Record<string, { label: string; className: string }> = {
  paid: {
    label: "Paid",
    className:
      "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-800",
  },
  partial: {
    label: "Partially paid",
    className:
      "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-800",
  },
  due: {
    label: "Due",
    className:
      "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:ring-amber-800",
  },
  overdue: {
    label: "Overdue",
    className:
      "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:ring-rose-800",
  },
  sent: {
    label: "Sent",
    className:
      "bg-indigo-50 text-indigo-700 ring-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:ring-indigo-800",
  },
  draft: {
    label: "Draft",
    className:
      "bg-gray-50 text-gray-700 ring-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700",
  },
};

export default function StatusBadge({ status }: { status: string }) {
  const key = (status || "draft").toLowerCase();
  const s = STYLES[key] || STYLES.draft;

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        s.className,
      ].join(" ")}
    >
      {s.label}
    </span>
  );
}
