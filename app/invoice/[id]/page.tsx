import InvoiceHeader from "../../components/InvoiceHeader";
import InvoiceItemsTable from "../../components/InvoiceItemsTable";
import InvoiceSummary from "../../components/InvoiceSummary";

export default function InvoiceViewPage() {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-2xl p-8 shadow-sm">
      <InvoiceHeader />
      {/* Billing Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            বিল প্রদানকারী
          </h4>
          <p className="text-gray-700 dark:text-gray-300">Rahim Traders</p>
          <p className="text-gray-600 dark:text-gray-400">
            চট্টগ্রাম, বাংলাদেশ
          </p>
        </div>

        <div className="md:text-right">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            প্রেরক
          </h4>
          <p className="text-gray-700 dark:text-gray-300">Sinan Gift Corner</p>
          <p className="text-gray-600 dark:text-gray-400">
            support@sinangift.com
          </p>
        </div>
      </div>

      <InvoiceItemsTable />
      <InvoiceSummary />

      <div className="mt-8 text-sm text-gray-600 dark:text-gray-400">
        <p>
          <strong>নোট:</strong> পণ্য ফেরতযোগ্য নয়।
        </p>
        <p className="mt-1">
          <strong>শর্তাবলী:</strong> ৭ দিনের মধ্যে পেমেন্ট সম্পন্ন করতে হবে।
        </p>
      </div>
    </div>
  );
}
