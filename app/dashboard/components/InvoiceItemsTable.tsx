"use client";

type Item = {
  id: string;
  name: string;
  qty: number;
  rate: number;
};

function formatMoney(amount: number, currency?: string) {
  // Basic formatter. You can swap locale/currency later.
  // If you want ৳ for BDT, just set currency="BDT" in invoice.
  try {
    if (currency) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(amount);
    }
  } catch {}

  // Fallback:
  return amount.toLocaleString("en-US");
}

export default function InvoiceItemsTable({
  items,
  currency,
}: {
  items: Item[];
  currency?: string;
}) {
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full text-sm text-gray-900 dark:text-white">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left">পণ্য</th>
            <th className="px-4 py-3 text-right">পরিমাণ</th>
            <th className="px-4 py-3 text-right">দর</th>
            <th className="px-4 py-3 text-right">মোট</th>
          </tr>
        </thead>

        <tbody>
          {safeItems.length > 0 ? (
            safeItems.map((item) => {
              const lineTotal = (Number(item.qty) || 0) * (Number(item.rate) || 0);
              return (
                <tr key={item.id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-3">{item.name || "-"}</td>
                  <td className="px-4 py-3 text-right">{item.qty ?? 0}</td>
                  <td className="px-4 py-3 text-right">
                    {formatMoney(Number(item.rate) || 0, currency)}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {formatMoney(lineTotal, currency)}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="border-b dark:border-gray-700">
              <td
                colSpan={4}
                className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
              >
                কোনো পণ্য নেই।
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
