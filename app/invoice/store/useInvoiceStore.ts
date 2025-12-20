// app/invoice/store/useInvoiceStore.ts
import { create } from "zustand";
import { Invoice } from "../types/invoice";

export const useInvoiceStore = create<{
  invoice: Invoice;
  update: (data: Partial<Invoice>) => void;
}>((set) => ({
  invoice: {
    invoiceNo: "INV-001",
    issueDate: new Date().toISOString().slice(0, 10),
    dueDate: "",
    from: { name: "", address: "", city: "", country: "" },
    to: { name: "", address: "", city: "", country: "" },
    items: [],
    tax: 0,
    discount: 0,
    shipping: 0,
    notes: "",
    terms: "",
    currency: "USD",
    theme: "classic",
    color: "#2563eb",
  },
  update: (data) =>
    set((state) => ({ invoice: { ...state.invoice, ...data } })),
}));
