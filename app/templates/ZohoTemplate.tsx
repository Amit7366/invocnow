import { Invoice } from "../types/invoice";
import { calculateTotals } from "../utils/calculateTotals";

export default function ZohoTemplate({ invoice }: { invoice: Invoice }) {
  const { subTotal, taxAmount, total, due } = calculateTotals(
    invoice.items,
    invoice.tax,
    invoice.taxType,
    invoice.discount,
    invoice.shipping,
    invoice.paidAmount
  );

  return (
    <div className="mx-auto max-w-4xl bg-white p-10 text-xs text-gray-800  print-area classic-invoice"  id="invoice-print">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold">INVOICE</h1>
        <p className="mt-1">Invoice No: {invoice.invoiceNo}</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-10">
        <div>
          <p className="font-semibold">From</p>
          <p>{invoice.from.name}</p>
          <p>{invoice.from.address}</p>
        </div>

        <div>
          <p className="font-semibold">Bill To</p>
          <p>{invoice.to.name}</p>
          <p>{invoice.to.address}</p>
        </div>
      </div>

      <table className="mt-8 w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-2 text-left">Item</th>
            <th className="border px-2 py-2 text-right">Qty</th>
            <th className="border px-2 py-2 text-right">Rate</th>
            <th className="border px-2 py-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map(item => (
            <tr key={item.id}>
              <td className="border px-2 py-2">{item.name}</td>
              <td className="border px-2 py-2 text-right">{item.qty}</td>
              <td className="border px-2 py-2 text-right">{item.rate}</td>
              <td className="border px-2 py-2 text-right">
                {(item.qty * item.rate).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-end">
        <div className="w-64 border p-4">
          <div className="flex justify-between">
            <span>Subtotal</span><span>{subTotal}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span><span>{total}</span>
          </div>
          {due > 0 && (
            <div className="flex justify-between text-red-600 font-bold">
              <span>Balance Due</span><span>{due}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
