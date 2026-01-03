// app/invoice/store/useInvoiceStore.ts
import { create } from "zustand";
import { Invoice } from "../types/invoice";

type InvoiceState = {
  invoice: Invoice & { _id?: string }; // allow backend id
  update: (data: Partial<InvoiceState["invoice"]>) => void;
  resetNew: () => void;
};

const initialInvoice = (): InvoiceState["invoice"] => ({
  invoiceNo: "", // ✅ let server decide
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
  taxType: "percentage",
  paidAmount: 0,
  currency: "USD",
  theme: "classic",
  color: "#2563eb",
});

export const useInvoiceStore = create<InvoiceState>((set) => ({
  invoice: initialInvoice(),
  update: (data) => set((state) => ({ invoice: { ...state.invoice, ...data } })),
  resetNew: () => set({ invoice: initialInvoice() }),
}));
