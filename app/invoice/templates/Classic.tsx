import { Invoice } from "../types/invoice";
import { calculateTotals } from "../utils/calculateTotals";

export default function ClassicTemplate({ invoice }: { invoice: Invoice }) {
  const { subTotal, taxAmount, total } = calculateTotals(
    invoice.items,
    invoice.tax,
    invoice.discount,
    invoice.shipping
  );

  return (
    <div className="p-10 text-sm" style={{ color: invoice.color }}>
      {/* HEADER */}
      <header className="flex justify-between mb-10">
        <div>
          <h1 className="text-3xl font-light">INVOICE</h1>
          <p className="text-gray-500">{invoice.invoiceNo}</p>
        </div>
        <div className="text-right">
          <p>Issue Date: {invoice.issueDate}</p>
          <p>Due Date: {invoice.dueDate}</p>
        </div>
      </header>

      {/* PARTIES */}
      <div className="grid grid-cols-2 gap-10 mb-10">
        <div>
          <h4 className="font-semibold mb-1">From</h4>
          <p>{invoice.from.name}</p>
          <p>{invoice.from.address}</p>
          <p>
            {invoice.from.city}, {invoice.from.country}
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-1">Bill To</h4>
          <p>{invoice.to.name}</p>
          <p>{invoice.to.address}</p>
          <p>
            {invoice.to.city}, {invoice.to.country}
          </p>
        </div>
      </div>

      {/* ITEMS */}
      <table className="w-full mb-8 border-t">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Item</th>
            <th>Qty</th>
            <th>Rate</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-2">{item.name}</td>
              <td>{item.qty}</td>
              <td>{invoice.currency} {item.rate.toFixed(2)}</td>
              <td className="text-right">
                {(item.qty * item.rate).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTALS */}
      <div className="flex justify-end">
        <div className="w-64 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{invoice.currency} {subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax ({invoice.tax}%)</span>
            <span>{taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total</span>
            <span>{invoice.currency} {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* NOTES */}
      {invoice.notes && (
        <div className="mt-10">
          <h4 className="font-semibold">Notes</h4>
          <p>{invoice.notes}</p>
        </div>
      )}

      {/* TERMS */}
      {invoice.terms && (
        <div className="mt-6 text-xs text-gray-600">
          <h4 className="font-semibold">Terms</h4>
          <p>{invoice.terms}</p>
        </div>
      )}
    </div>
  );
}
