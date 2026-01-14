import { Invoice } from "../types/invoice";
import { calculateTotals } from "../utils/calculateTotals";
import { motion } from "framer-motion";

export default function StripeTemplate({ invoice }: { invoice: Invoice }) {
  const { subTotal, taxAmount, total, due } = calculateTotals(
    invoice.items,
    invoice.tax,
    invoice.taxType,
    invoice.discount,
    invoice.shipping,
    invoice.paidAmount
  );

  const status =
    due === 0 ? "Paid" : invoice.paidAmount > 0 ? "Partially paid" : "Due";

  return (
    <div className="mx-auto max-w-4xl bg-white px-12 py-14 text-[13px] text-gray-900  print-area classic-invoice"  id="invoice-print">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-normal tracking-tight">Invoice</h1>
          <p className="mt-1 text-gray-500">#{invoice.invoiceNo}</p>
        </div>

        <span className="rounded-full bg-gray-100 px-4 py-1 text-xs font-medium text-gray-700">
          {status}
        </span>
      </div>

      {/* Dates */}
      <div className="mt-8 grid grid-cols-2 gap-12 text-xs">
        <div>
          <p className="uppercase text-gray-400">From</p>
          <p className="mt-2 font-medium">{invoice.from.name}</p>
          <p>{invoice.from.address}</p>
        </div>

        <div>
          <p className="uppercase text-gray-400">Bill to</p>
          <p className="mt-2 font-medium">{invoice.to.name}</p>
          <p>{invoice.to.address}</p>
        </div>
      </div>

      {/* Items */}
      <table className="mt-12 w-full">
        <thead>
          <tr className="border-b text-xs text-gray-500">
            <th className="py-3 text-left font-medium">Description</th>
            <th className="py-3 text-right font-medium">Qty</th>
            <th className="py-3 text-right font-medium">Unit price</th>
            <th className="py-3 text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map(item => (
            <tr key={item.id} className="border-b last:border-none">
              <td className="py-4">{item.name}</td>
              <td className="py-4 text-right">{item.qty}</td>
              <td className="py-4 text-right">
                {invoice.currency} {item.rate.toFixed(2)}
              </td>
              <td className="py-4 text-right font-medium">
                {invoice.currency} {(item.qty * item.rate).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="mt-10 flex justify-end">
        <div className="w-80 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{invoice.currency} {subTotal.toFixed(2)}</span>
          </div>

          {taxAmount > 0 && (
            <div className="flex justify-between">
              <span>Tax</span>
              <span>{invoice.currency} {taxAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between border-t pt-3 text-base font-medium">
            <span>Total</span>
            <span>{invoice.currency} {total.toFixed(2)}</span>
          </div>

          {due > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between pt-2 text-lg font-semibold"
            >
              <span>Amount due</span>
              <span>{invoice.currency} {due.toFixed(2)}</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
