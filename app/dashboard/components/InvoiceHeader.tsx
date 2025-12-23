import StatusBadge from "../invoice/all/components/StatusBadge";


export default function InvoiceHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-6 border-b pb-6 dark:border-gray-700">
      {/* Company */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">
          LOGO
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Sinan Gift Corner
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ঢাকা, বাংলাদেশ
          </p>
        </div>
      </div>

      {/* Invoice Info */}
      <div className="text-right space-y-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          ইনভয়েস #INV-001
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          ইস্যু তারিখ: ১২ জানুয়ারি ২০২৫
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          শেষ তারিখ: ২০ জানুয়ারি ২০২৫
        </p>
        <StatusBadge status="due" />
      </div>
    </div>
  );
}
