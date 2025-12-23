export default function InvoiceSummary() {
  return (
    <div className="mt-6 flex justify-end text-white">
      <div className="w-full md:w-80 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>সাবটোটাল</span>
          <span>৳ ২,৪০০</span>
        </div>
        <div className="flex justify-between">
          <span>ভ্যাট</span>
          <span>৳ ২৪০</span>
        </div>
        <div className="flex justify-between">
          <span>ডিসকাউন্ট</span>
          <span>- ৳ ১০০</span>
        </div>

        <div className="border-t pt-2 font-bold flex justify-between text-lg">
          <span>সর্বমোট</span>
          <span>৳ ২,৫৪০</span>
        </div>
      </div>
    </div>
  );
}
