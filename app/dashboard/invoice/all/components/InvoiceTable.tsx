import InvoiceRow from "./InvoiceRow";



const invoices = [
  {
    invoiceNo: "INV-001",
    client: "Rahim Traders",
    date: "2025-01-12",
    amount: "4,500",
    status: "paid",
  },
  {
    invoiceNo: "INV-002",
    client: "Karim Enterprise",
    date: "2025-01-15",
    amount: "2,300",
    status: "due",
  },
  {
    invoiceNo: "INV-003",
    client: "Hasan Store",
    date: "2025-01-05",
    amount: "6,800",
    status: "overdue",
  },
];

export default function InvoiceTable() {
  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          ইনভয়েস তালিকা
        </h2>

        <input
          type="text"
          placeholder="ইনভয়েস বা ক্লায়েন্ট খুঁজুন..."
          className="
            w-full md:w-64
            px-3 py-2 rounded-lg
            bg-gray-50 dark:bg-gray-700
            text-gray-900 dark:text-white
            placeholder-gray-400
            border border-gray-200 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">ইনভয়েস</th>
              <th className="px-4 py-3 text-left">ক্লায়েন্ট</th>
              <th className="px-4 py-3 text-left">তারিখ</th>
              <th className="px-4 py-3 text-left">মোট</th>
              <th className="px-4 py-3 text-left">স্ট্যাটাস</th>
              <th className="px-4 py-3 text-right">অ্যাকশন</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv) => (
              <InvoiceRow key={inv.invoiceNo} {...inv} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
