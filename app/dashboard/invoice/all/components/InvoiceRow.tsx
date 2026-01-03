"use client";

import Link from "next/link";
import StatusBadge from "./StatusBadge";
import { ChevronRight } from "lucide-react";
import { computeTotal, deriveStatus } from "./invoiceUtils";

export interface InvoiceRowProps {
  id?: string;
  invoiceNo: string;
  client: string;
  userName?: string;
  date: string;
  amount?: string; // optional now
  status: string;

  // ✅ add optional fields so UI can compute paid/due status + total
  items?: { qty: number; rate: number }[];
  taxType?: "percentage" | "fixed";
  tax?: number;
  discount?: number;
  shipping?: number;
  paidAmount?: number;
  dueDate?: string;
}

export default function InvoiceRow(props: InvoiceRowProps) {
  const {
    id,
    invoiceNo,
    client,
    userName,
    date,
  } = props;

  const derivedStatus = deriveStatus(props);

  // ✅ compute total if you’re not sending inv.total from backend
  const total = computeTotal(props).total;

  return (
    <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition">
      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
        #{invoiceNo}
      </td>

      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
        {client}
      </td>

      {/* ✅ User column */}
      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
        {userName}
      </td>

      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
        {date}
      </td>

      <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
        ${total.toLocaleString("en-US")}
      </td>

      <td className="px-4 py-3">
        <StatusBadge status={derivedStatus} />
      </td>

      <td className="px-4 py-3 text-right">
        <Link
          href={`/dashboard/invoice/${id}`}
          className="
            inline-flex items-center gap-1.5
            rounded-xl px-3 py-1.5 text-sm font-medium
            text-blue-700 bg-blue-50 hover:bg-blue-100
            dark:text-blue-300 dark:bg-blue-900/30 dark:hover:bg-blue-900/45
            ring-1 ring-inset ring-blue-200 dark:ring-blue-800
            transition
          "
        >
          See details <ChevronRight size={16} />
        </Link>
      </td>
    </tr>
  );
}
