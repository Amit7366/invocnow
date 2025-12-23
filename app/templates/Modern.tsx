import { Invoice } from "../types/invoice";
import { calculateTotals } from "../utils/calculateTotals";
import { motion } from "framer-motion";

export default function ModernTemplate({ invoice }: { invoice: Invoice }) {
  const { subTotal, taxAmount, total, due } = calculateTotals(
    invoice.items,
    invoice.tax,
    invoice.taxType,
    invoice.discount,
    invoice.shipping,
    invoice.paidAmount
  );

  const paymentStatus =
    due === 0 ? "PAID" : invoice.paidAmount > 0 ? "PARTIALLY PAID" : "DUE";

  return (
    <div className="mx-auto max-w-4xl bg-white px-10 py-12 text-sm text-gray-900">
      {/* Header */}
      <div className="flex items-start justify-between border-b pb-6">
        <div>
          <h1 className="text-4xl font-light tracking-tight">Invoice</h1>
          <p className="mt-1 text-xs text-gray-500">
            #{invoice.invoiceNo}
          </p>
        </div>

        <span
          className={`rounded-full px-4 py-1 text-xs font-semibold
            ${paymentStatus === "PAID"
              ? "bg-emerald-50 text-emerald-700"
              : paymentStatus === "PARTIALLY PAID"
              ? "bg-amber-50 text-amber-700"
              : "bg-rose-50 text-rose-700"
            }`}
        >
          {paymentStatus}
        </span>
      </div>

      {/* Meta */}
      <div className="mt-6 grid grid-cols-2 gap-12 text-xs">
        <div>
          <p className="font-semibold uppercase text-gray-500">From</p>
          <p className="mt-2 font-medium">{invoice.from.name}</p>
          <p>{invoice.from.address}</p>
          <p>{invoice.from.city}, {invoice.from.country}</p>
        </div>

        <div>
          <p className="font-semibold uppercase text-gray-500">Bill To</p>
          <p className="mt-2 font-medium">{invoice.to.name}</p>
          <p>{invoice.to.address}</p>
          <p>{invoice.to.city}, {invoice.to.country}</p>
        </div>
      </div>

      {/* Items */}
      <table className="mt-10 w-full text-sm">
        <thead>
          <tr className="border-b text-xs uppercase text-gray-500">
            <th className="py-3 text-left">Item</th>
            <th className="py-3 text-right">Qty</th>
            <th className="py-3 text-right">Rate</th>
            <th className="py-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map(item => (
            <tr key={item.id} className="border-b last:border-none">
              <td className="py-4">{item.name}</td>
              <td className="py-4 text-right">{item.qty}</td>
              <td className="py-4 text-right">{invoice.currency} {item.rate.toFixed(2)}</td>
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

          <div className="flex justify-between border-t pt-3 text-lg font-semibold">
            <span>Total</span>
            <span>{invoice.currency} {total.toFixed(2)}</span>
          </div>

          {due > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between text-xl font-bold text-rose-600"
            >
              <span>Amount Due</span>
              <span>{invoice.currency} {due.toFixed(2)}</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
