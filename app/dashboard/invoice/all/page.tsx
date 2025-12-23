import InvoiceTable from "./components/InvoiceTable";

export default function InvoiceListPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          ইনভয়েসসমূহ
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          আপনার সব ইনভয়েস এখানে দেখুন ও পরিচালনা করুন
        </p>
      </div>

      <InvoiceTable />
    </div>
  );
}
