import { Invoice } from "../types/invoice";
import { calculateTotals } from "../utils/calculateTotals";
import { motion } from "framer-motion";


export default function ClassicTemplate({ invoice }: { invoice: Invoice }) {
  const { subTotal, taxAmount, total, due, status } = calculateTotals(
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
    <div className="bg-white p-12 text-sm text-gray-800">
      {/* HEADER */}
      <header className="mb-12 flex items-start justify-between">
        <div className="flex items-center gap-5">
          {invoice.from.logo && (
            <img
              src={invoice.from.logo}
              className="h-14 w-14 object-contain"
              alt="Logo"
            />
          )}

          <div>
            <h1
              className="text-3xl font-light tracking-wide"
              style={{ color: invoice.color }}
            >
              INVOICE
            </h1>
            <p className="mt-1 text-xs text-gray-500">
              Invoice #{invoice.invoiceNo}
            </p>
          </div>
        </div>

        <div className="text-right text-xs text-gray-600">
          <p>
            <span className="font-medium text-gray-500">Issue Date:</span>{" "}
            {invoice.issueDate}
          </p>

          {invoice.dueDate && (
            <p className="mt-1">
              <span className="font-medium text-gray-500">Due Date:</span>{" "}
              {invoice.dueDate}
            </p>
          )}
        </div>
      </header>
      <div className="flex justify-end mb-4">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold
      ${
        paymentStatus === "PAID"
          ? "bg-green-100 text-green-700"
          : paymentStatus === "PARTIALLY PAID"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"
      }`}
        >
          {paymentStatus}
        </span>
      </div>

      {/* FROM / TO */}
      <section className="mb-12 grid grid-cols-2 gap-16">
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            From
          </h4>
          <p className="font-medium">{invoice.from.name}</p>
          <p className="text-gray-600">{invoice.from.address}</p>
          <p className="text-gray-600">
            {invoice.from.city}, {invoice.from.country}
          </p>
        </div>

        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Bill To
          </h4>
          <p className="font-medium">{invoice.to.name}</p>
          <p className="text-gray-600">{invoice.to.address}</p>
          <p className="text-gray-600">
            {invoice.to.city}, {invoice.to.country}
          </p>
        </div>
      </section>

      {/* ITEMS TABLE */}
      <section className="mb-10">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
              <th className="py-3 text-left font-medium">Description</th>
              <th className="py-3 text-right font-medium">Qty</th>
              <th className="py-3 text-right font-medium">Rate</th>
              <th className="py-3 text-right font-medium">Amount</th>
            </tr>
          </thead>

          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-3">{item.name}</td>
                <td className="py-3 text-right">{item.qty}</td>
                <td className="py-3 text-right">
                  {invoice.currency} {item.rate.toFixed(2)}
                </td>
                <td className="py-3 text-right font-medium">
                  {invoice.currency} {(item.qty * item.rate).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* TOTALS */}
      <section className="flex justify-end">
        <div className="flex justify-end mt-8">
          <div className="w-72 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                {invoice.currency} {subTotal.toFixed(2)}
              </span>
            </div>

            {taxAmount > 0 && (
              <div className="flex justify-between">
                <span>
                  Tax {invoice.taxType === "percentage" && `(${invoice.tax}%)`}
                </span>
                <span>
                  {invoice.currency} {taxAmount.toFixed(2)}
                </span>
              </div>
            )}

            {invoice.shipping > 0 && (
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {invoice.currency} {invoice.shipping.toFixed(2)}
                </span>
              </div>
            )}

            {invoice.discount > 0 && (
              <div className="flex justify-between">
                <span>Discount</span>
                <span>
                  - {invoice.currency} {invoice.discount.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex justify-between border-t pt-2 font-semibold">
              <span>Total</span>
              <span>
                {invoice.currency} {total.toFixed(2)}
              </span>
            </div>

            {/* ✅ Paid */}
            {invoice.paidAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Paid</span>
                <span>
                  - {invoice.currency} {invoice.paidAmount.toFixed(2)}
                </span>
              </div>
            )}

            {/* ✅ Due */}

            {due > 0 && (
              <div className="flex justify-between border-t pt-2 text-lg font-bold text-red-600">
                <span>Amount Due</span>
                <motion.span
                  key={due}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {invoice.currency} {due.toFixed(2)}
                </motion.span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* NOTES */}
      {invoice.notes && (
        <section className="mt-12">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Notes
          </h4>
          <p className="text-sm text-gray-700">{invoice.notes}</p>
        </section>
      )}

      {/* TERMS */}
      {invoice.terms && (
        <section className="mt-8 text-xs text-gray-500">
          <h4 className="mb-1 font-semibold uppercase tracking-wide">
            Terms & Conditions
          </h4>
          <p>{invoice.terms}</p>
        </section>
      )}
    </div>
  );
}
