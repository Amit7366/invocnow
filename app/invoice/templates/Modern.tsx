import { Invoice } from "../types/invoice";
import { calculateTotals } from "../utils/calculateTotals";

export default function ModernTemplate({ invoice }: { invoice: Invoice }) {
  const { subTotal, taxAmount, total } = calculateTotals(
    invoice.items,
    invoice.tax,
    invoice.discount,
    invoice.shipping
  );

  return (
    <div className="p-12 text-sm">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-12">
        <h1
          className="text-4xl font-bold"
          style={{ color: invoice.color }}
        >
          Invoice
        </h1>
        <div className="text-right text-gray-600">
          <p>#{invoice.invoiceNo}</p>
          <p>{invoice.issueDate}</p>
        </div>
      </header>

      {/* FROM / TO */}
      <div className="grid grid-cols-2 gap-12 mb-12">
        <div>
          <p className="uppercase text-xs text-gray-400">From</p>
          <p className="font-semibold">{invoice.from.name}</p>
          <p>{invoice.from.address}</p>
        </div>

        <div>
          <p className="uppercase text-xs text-gray-400">Bill To</p>
          <p className="font-semibold">{invoice.to.name}</p>
          <p>{invoice.to.address}</p>
        </div>
      </div>

      {/* ITEMS */}
      <table className="w-full mb-10">
        <thead>
          <tr className="border-b text-left text-gray-500">
            <th className="py-2">Item</th>
            <th>Qty</th>
            <th>Rate</th>
            <th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-3">{item.name}</td>
              <td>{item.qty}</td>
              <td>{invoice.currency} {item.rate}</td>
              <td className="text-right">
                {(item.qty * item.rate).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTAL */}
      <div className="flex justify-end">
        <div className="w-72 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>{taxAmount.toFixed(2)}</span>
          </div>
          <div
            className="flex justify-between text-xl font-bold border-t pt-3"
            style={{ color: invoice.color }}
          >
            <span>Total</span>
            <span>{invoice.currency} {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
