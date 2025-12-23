import Link from "next/link";
import StatusBadge from "./StatusBadge";

export interface InvoiceRowProps {
  invoiceNo: string;
  client: string;
  date: string;
  amount: string;
  status: string;
}

export default function InvoiceRow({
  invoiceNo,
  client,
  date,
  amount,
  status,
}: InvoiceRowProps) {
  return (
    <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
        #{invoiceNo}
      </td>
      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
        {client}
      </td>
      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
        {date}
      </td>
      <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
        ৳ {amount}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={status} />
      </td>
      <td className="px-4 py-3 text-right">
        <Link href={'/dashboard/invoice/1'} className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
          দেখুন
        </Link>
      </td>
    </tr>
  );
}
