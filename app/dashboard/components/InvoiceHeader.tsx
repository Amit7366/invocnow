"use client";

import StatusBadge from "../invoice/all/components/StatusBadge";

type Party = {
  name?: string;
  address?: string;
  city?: string;
  country?: string;
  logo?: string; // base64 or URL (optional)
};

type Invoice = {
  invoiceNo?: string;
  issueDate?: string;
  dueDate?: string;
  status?: "draft" | "sent" | "paid" | "due" | "overdue"; // adjust if needed
  from?: Party;
};

function formatBanglaDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);

  // If backend sends "YYYY-MM-DD", Date() can shift by timezone sometimes.
  // This keeps it stable:
  if (iso.length === 10) {
    const [y, m, day] = iso.split("-").map(Number);
    if (y && m && day) return toBangla(`${day} ${bnMonth(m)} ${y}`);
  }

  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return toBangla(`${day} ${bnMonth(month)} ${year}`);
}

function bnMonth(m: number) {
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];
  return months[m - 1] || "";
}

function toBangla(str: string) {
  const map: Record<string, string> = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };
  return str.replace(/[0-9]/g, (d) => map[d]);
}

export default function InvoiceHeader({ invoice }: { invoice: Invoice }) {
  const from = invoice.from || {};
  const logo = from.logo;

  return (
    <div className="flex flex-col md:flex-row justify-between gap-6 border-b pb-6 dark:border-gray-700">
      {/* Company */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl overflow-hidden">
          {logo ? (
            // If it's base64 or URL, this will work in most cases
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="Logo" className="w-full h-full object-cover" />
          ) : (
            "LOGO"
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {from.name || "—"}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {[from.city, from.country].filter(Boolean).join(", ") || "—"}
          </p>
        </div>
      </div>

      {/* Invoice Info */}
      <div className="text-right space-y-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          ইনভয়েস #{invoice.invoiceNo || "—"}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          ইস্যু তারিখ: {formatBanglaDate(invoice.issueDate)}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          শেষ তারিখ: {formatBanglaDate(invoice.dueDate)}
        </p>

        <StatusBadge status={(invoice.status as any) || "draft"} />
      </div>
    </div>
  );
}
