"use client";

type Invoice = {
  items: { qty: number; rate: number }[];
  currency?: string;

  taxType?: "percentage" | "fixed";
  tax?: number;
  discount?: number;
  shipping?: number;
  paidAmount?: number;
};

function formatMoney(amount: number, currency?: string) {
  try {
    if (currency) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(amount);
    }
  } catch {}
  return amount.toLocaleString("en-US");
}

export default function InvoiceSummary({ invoice }: { invoice: Invoice }) {
  const items = Array.isArray(invoice.items) ? invoice.items : [];

  const subtotal = items.reduce((sum, it) => {
    const qty = Number(it.qty) || 0;
    const rate = Number(it.rate) || 0;
    return sum + qty * rate;
  }, 0);

  const taxValueRaw = Number(invoice.tax) || 0;
  const discount = Number(invoice.discount) || 0;
  const shipping = Number(invoice.shipping) || 0;
  const paidAmount = Number(invoice.paidAmount) || 0;

  const taxAmount =
    invoice.taxType === "fixed"
      ? taxValueRaw
      : (subtotal * taxValueRaw) / 100;

  const total = Math.max(0, subtotal + taxAmount + shipping - discount);
  const due = Math.max(0, total - paidAmount);

  return (
    <div className="mt-6 flex justify-end text-gray-900 dark:text-white">
      <div className="w-full md:w-80 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>সাবটোটাল</span>
          <span>{formatMoney(subtotal, invoice.currency)}</span>
        </div>

        <div className="flex justify-between">
          <span>
            ভ্যাট{" "}
            {invoice.taxType === "percentage" ? `(${taxValueRaw}%)` : ""}
          </span>
          <span>{formatMoney(taxAmount, invoice.currency)}</span>
        </div>

        <div className="flex justify-between">
          <span>শিপিং</span>
          <span>{formatMoney(shipping, invoice.currency)}</span>
        </div>

        <div className="flex justify-between">
          <span>ডিসকাউন্ট</span>
          <span>- {formatMoney(discount, invoice.currency)}</span>
        </div>

        <div className="border-t pt-2 font-bold flex justify-between text-lg">
          <span>সর্বমোট</span>
          <span>{formatMoney(total, invoice.currency)}</span>
        </div>

        {/* Optional: show paid + due if you want */}
        <div className="pt-2 space-y-1 text-sm">
          <div className="flex justify-between">
            <span>পরিশোধ</span>
            <span>{formatMoney(paidAmount, invoice.currency)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>বকেয়া</span>
            <span>{formatMoney(due, invoice.currency)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
