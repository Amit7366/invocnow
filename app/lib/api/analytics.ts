import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function getMonthlyRevenue(year: number, token: string) {
  const res = await axios.get(`${API_BASE}/api/v1/analytics/revenue`, {
    params: { year },
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
}

export async function getInvoiceStatusBreakdown(year: number, token: string) {
  const res = await axios.get(`${API_BASE}/api/v1/analytics/invoice-status`, {
    params: { year },
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function getDashboardStats(token: string) {
  const res = await axios.get(`${API_BASE}/api/v1/analytics/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}