export default function InvoiceItemsTable() {
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full text-sm text-white">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left">পণ্য</th>
            <th className="px-4 py-3 text-right">পরিমাণ</th>
            <th className="px-4 py-3 text-right">দর</th>
            <th className="px-4 py-3 text-right">মোট</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b dark:border-gray-700">
            <td className="px-4 py-3">Islamic Dress</td>
            <td className="px-4 py-3 text-right">2</td>
            <td className="px-4 py-3 text-right">৳ ১,২০০</td>
            <td className="px-4 py-3 text-right font-semibold">
              ৳ ২,৪০০
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
