"use client";

import { useInvoiceStore } from "../../store/useInvoiceStore";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuid } from "uuid";

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
    <section className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="font-semibold mb-3">Items</h3>

      <AnimatePresence>
        {invoice.items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-12 gap-2 mb-2"
          >
            <input
              className="input col-span-6"
              placeholder="Item description"
              value={item.name}
              onChange={(e) =>
                updateItem(item.id, "name", e.target.value)
              }
            />
            <input
              type="number"
              className="input col-span-2"
              value={item.qty}
              onChange={(e) =>
                updateItem(item.id, "qty", Number(e.target.value))
              }
            />
            <input
              type="number"
              className="input col-span-3"
              value={item.rate}
              onChange={(e) =>
                updateItem(item.id, "rate", Number(e.target.value))
              }
            />
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 col-span-1"
            >
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        onClick={addItem}
        className="text-blue-600 text-sm mt-2"
      >
        + Add Line Item
      </button>
    </section>
  );
}
