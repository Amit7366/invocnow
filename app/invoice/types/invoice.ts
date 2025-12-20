// app/invoice/types/invoice.ts
export interface LineItem {
  id: string;
  name: string;
  qty: number;
  rate: number;
}

export interface Party {
  name: string;
  address: string;
  city: string;
  country: string;
}

export interface Invoice {
  invoiceNo: string;
  issueDate: string;
  dueDate: string;
  from: Party;
  to: Party;
  items: LineItem[];
  tax: number;
  discount: number;
  shipping: number;
  notes: string;
  terms: string;
  currency: string;
  theme: "classic" | "modern" | "compact";
  color: string;
}
