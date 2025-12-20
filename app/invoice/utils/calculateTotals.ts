import { LineItem } from "../types/invoice";

export function calculateTotals(
  items: LineItem[],
  tax: number,
  discount: number,
  shipping: number
) {
  const subTotal = items.reduce(
    (sum, item) => sum + item.qty * item.rate,
    0
  );

  const taxAmount = (subTotal * tax) / 100;
  const total = subTotal + taxAmount + shipping - discount;

  return {
    subTotal,
    taxAmount,
    total,
  };
}
