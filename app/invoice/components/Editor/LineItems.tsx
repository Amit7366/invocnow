"use client";

import { useInvoiceStore } from "../../store/useInvoiceStore";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuid } from "uuid";
import FloatingInput from "../ui/FloatingInput";

export default function LineItems() {
  const { invoice, update } = useInvoiceStore();

  const addItem = () => {
    update({
      items: [
        ...invoice.items,
        { id: uuid(), name: "", qty: 1, rate: 0 },
      ],
    });
  };

  const updateItem = (id: string, field: string, value: any) => {
    update({
      items: invoice.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const removeItem = (id: string) => {
    update({
      items: invoice.items.filter((i) => i.id !== id),
    });
  };

  return (
    <section className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-sm">
      
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-100">
            Items
          </h3>
          <p className="text-xs text-gray-500">
            Product or service details
          </p>
        </div>
      </div>

      {/* Column Labels (Desktop) */}
      <div className="mb-2 hidden grid-cols-12 gap-3 px-1 text-xs text-gray-500 sm:grid">
        <span className="col-span-6">Description</span>
        <span className="col-span-2 text-center">Qty</span>
        <span className="col-span-3 text-right">Rate</span>
        <span className="col-span-1"></span>
      </div>

      {/* Items */}
      <AnimatePresence>
        {invoice.items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="mb-3 grid grid-cols-12 gap-3"
          >
            {/* Description */}
            <div className="col-span-12 sm:col-span-6">
              <FloatingInput
                label="Item description"
                value={item.name}
                onChange={(e) =>
                  updateItem(item.id, "name", e.target.value)
                }
              />
            </div>

            {/* Qty */}
            <div className="col-span-4 sm:col-span-2">
              <FloatingInput
                type="number"
                label="Qty"
                value={item.qty}
                onChange={(e) =>
                  updateItem(item.id, "qty", Number(e.target.value))
                }
              />
            </div>

            {/* Rate */}
            <div className="col-span-6 sm:col-span-3">
              <FloatingInput
                type="number"
                label="Rate"
                value={item.rate}
                onChange={(e) =>
                  updateItem(item.id, "rate", Number(e.target.value))
                }
              />
            </div>

            {/* Remove */}
            <div className="col-span-2 flex items-center justify-end">
              <button
                onClick={() => removeItem(item.id)}
                className="rounded-md p-2 text-gray-500 transition hover:bg-red-500/10 hover:text-red-400"
              >
                ✕
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add Button */}
      <button
        onClick={addItem}
        className="mt-3 inline-flex items-center gap-1 rounded-md
                   border border-dashed border-gray-700 px-3 py-2
                   text-sm text-blue-400 transition
                   hover:border-blue-400 hover:bg-blue-500/10"
      >
        + Add line item
      </button>
    </section>
  );
}
