import InvoiceTable from "./components/InvoiceTable";

export default function InvoiceListPage() {
  return (
    <div className="space-y-6 overflow-x-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Invoices
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage all your invoices here.
        </p>
      </div>

      <div className="max-w-full">
        <InvoiceTable />
      </div>
    </div>
  );
}
