import { Invoice } from "../types/invoice";
import { calculateTotals } from "../utils/calculateTotals";

export default function CompactTemplate({ invoice }: { invoice: Invoice }) {
  const { subTotal, taxAmount, total } = calculateTotals(
    invoice.items,
    invoice.tax,
    invoice.discount,
    invoice.shipping
  );

  return (
    <div className="p-6 text-xs">
      <div className="flex justify-between mb-4">
        {invoice.from.logo && (
            <img
              src={invoice.from.logo}
              className="h-16 object-contain"
              alt="Logo"
            />
          )}
        <strong>INVOICE</strong>
        <span>{invoice.invoiceNo}</span>
      </div>

      <div className="grid grid-cols-2 mb-4">
        <div>
          <strong>From</strong>
          <p>{invoice.from.name}</p>
        </div>
        <div>
          <strong>To</strong>
          <p>{invoice.to.name}</p>
        </div>
      </div>

      <table className="w-full border text-xs mb-4">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-1">Item</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-1">{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.rate}</td>
              <td>{(item.qty * item.rate).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <div className="w-48">
          <p>Subtotal: {subTotal.toFixed(2)}</p>
          <p>Tax: {taxAmount.toFixed(2)}</p>
          <p className="font-bold">Total: {total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
