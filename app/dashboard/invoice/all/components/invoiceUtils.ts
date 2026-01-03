export type InvoiceLike = {
  items?: { qty: number; rate: number }[];
  taxType?: "percentage" | "fixed";
  tax?: number;
  discount?: number;
  shipping?: number;
  paidAmount?: number;
  dueDate?: string;
  status?: string;
};

export function computeTotal(inv: InvoiceLike) {
  const items = Array.isArray(inv.items) ? inv.items : [];
  const subtotal = items.reduce((sum, it) => sum + (Number(it.qty) || 0) * (Number(it.rate) || 0), 0);

  const taxValue = Number(inv.tax) || 0;
  const taxAmount =
    inv.taxType === "fixed" ? taxValue : (subtotal * taxValue) / 100;

  const discount = Number(inv.discount) || 0;
  const shipping = Number(inv.shipping) || 0;

  const total = Math.max(0, subtotal + taxAmount + shipping - discount);
  return { subtotal, taxAmount, discount, shipping, total };
}

export function deriveStatus(inv: InvoiceLike) {
  const { total } = computeTotal(inv);
  const paid = Number(inv.paidAmount) || 0;

  // If fully paid
  if (total > 0 && paid >= total) return "paid";

  // If partially paid
  if (paid > 0 && paid < total) return "partial";

  // Handle due/overdue using dueDate
  const due = inv.dueDate ? new Date(inv.dueDate) : null;
  if (due && !isNaN(due.getTime())) {
    const now = new Date();
    if (now > due) return "overdue";
    return "due";
  }

  // fallback to backend status if nothing else
  return inv.status || "draft";
}
