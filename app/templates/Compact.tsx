import { Invoice } from "../types/invoice";
import { calculateTotals } from "../utils/calculateTotals";

export default function CompactTemplate({ invoice }: { invoice: Invoice }) {
  const { subTotal, taxAmount, total, due } = calculateTotals(
    invoice.items,
    invoice.tax,
    invoice.taxType,
    invoice.discount,
    invoice.shipping,
    invoice.paidAmount
  );

  return (
    <div className="bg-white p-8 text-xs text-gray-800">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">INVOICE</h1>
        <div className="text-right">
          <p>#{invoice.invoiceNo}</p>
          <p>{invoice.issueDate}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div>
          <strong>From:</strong>
          <p>{invoice.from.name}</p>
          <p>{invoice.from.address}</p>
        </div>
        <div>
          <strong>To:</strong>
          <p>{invoice.to.name}</p>
          <p>{invoice.to.address}</p>
        </div>
      </div>

      <table className="mt-6 w-full border text-xs">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1 text-left">Item</th>
            <th className="border px-2 py-1 text-right">Qty</th>
            <th className="border px-2 py-1 text-right">Rate</th>
            <th className="border px-2 py-1 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map(item => (
            <tr key={item.id}>
              <td className="border px-2 py-1">{item.name}</td>
              <td className="border px-2 py-1 text-right">{item.qty}</td>
              <td className="border px-2 py-1 text-right">{item.rate}</td>
              <td className="border px-2 py-1 text-right">
                {(item.qty * item.rate).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-end">
        <div className="w-60">
          <div className="flex justify-between"><span>Subtotal</span><span>{subTotal}</span></div>
          <div className="flex justify-between font-bold"><span>Total</span><span>{total}</span></div>
          {due > 0 && (
            <div className="flex justify-between text-red-600 font-bold">
              <span>Due</span><span>{due}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
