import { Invoice } from "../types/invoice";
import { calculateTotals } from "../utils/calculateTotals";

export default function FreshBooksTemplate({ invoice }: { invoice: Invoice }) {
  const { subTotal, taxAmount, total, due } = calculateTotals(
    invoice.items,
    invoice.tax,
    invoice.taxType,
    invoice.discount,
    invoice.shipping,
    invoice.paidAmount
  );

  return (
    <div className="mx-auto max-w-4xl rounded-xl bg-white p-10 text-sm shadow">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Invoice</h1>
        <span className="rounded bg-blue-50 px-4 py-1 text-blue-700 text-xs font-semibold">
          {due === 0 ? "Paid" : "Outstanding"}
        </span>
      </div>

      <table className="mt-8 w-full">
        <thead>
          <tr className="border-b text-gray-500">
            <th className="py-3 text-left">Service</th>
            <th className="py-3 text-right">Qty</th>
            <th className="py-3 text-right">Rate</th>
            <th className="py-3 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map(item => (
            <tr key={item.id} className="border-b">
              <td className="py-4">{item.name}</td>
              <td className="py-4 text-right">{item.qty}</td>
              <td className="py-4 text-right">{item.rate}</td>
              <td className="py-4 text-right font-medium">
                {(item.qty * item.rate).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8 flex justify-end">
        <div className="w-72 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span><span>{subTotal}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span><span>{total}</span>
          </div>
          {due > 0 && (
            <div className="flex justify-between text-xl font-bold text-blue-600">
              <span>Amount Due</span><span>{due}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
