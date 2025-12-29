// lib/api/invoice.ts
import { Invoice } from "@/app/types/invoice";
import axios from "axios";

export async function createInvoice(
  invoice: Invoice,
  token: string
) {
  const res = await axios.post(
    "http://localhost:5000/api/v1/invoices",
    invoice,
    {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ USE TOKEN
      },
    }
  );

  return res.data;
}
