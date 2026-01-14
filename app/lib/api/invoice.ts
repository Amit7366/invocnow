import axios from "axios";
import { Invoice } from "@/app/types/invoice";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not set in .env.local");
}

export async function createInvoice(invoice: Invoice, googleIdToken: string) {
  const res = await axios.post(`${API_BASE}/api/v1/invoices`, invoice, {
    headers: {
      Authorization: `Bearer ${googleIdToken}`,
    },
  });

  return res.data;
}

export async function getInvoices(token: string) {
  const res = await axios.get(`${API_BASE}/api/v1/invoices`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function getInvoiceById(id: string, token: string) {
  const res = await axios.get(`${API_BASE}/api/v1/invoices/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

