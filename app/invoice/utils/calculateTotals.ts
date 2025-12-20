export function calculateTotals(
  items: { qty: number; rate: number }[],
  tax: number,
  taxType: "percentage" | "fixed" = "percentage", // ✅ DEFAULT
  discount: number,
  shipping: number,
  paidAmount: number
) {
  const subTotal = items.reduce(
    (sum, item) => sum + item.qty * item.rate,
    0
  );

  const taxAmount =
    taxType === "percentage"
      ? (subTotal * tax) / 100
      : tax;

  const total =
    subTotal +
    taxAmount +
    shipping -
    discount;

  const due = Math.max(total - paidAmount, 0);

  const status = due === 0 ? "PAID" : "DUE";

  return {
    subTotal,
    taxAmount,
    total,
    due,
    status,
  };
}
