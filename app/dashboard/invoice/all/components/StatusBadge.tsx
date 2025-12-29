export default function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    paid: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    due: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    overdue: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${
        styles[status] || ""
      }`}
    >
      {status === "paid"
        ? "PAID"
        : status === "DUE"
        ? "DUE"
        : "EXPIRED"}
    </span>
  );
}
