"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getMonthlyRevenue } from "@/app/lib/api/analytics";

type Point = { month: string; revenue: number };

export default function RevenueChart() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<Point[]>([]);
  const [loading, setLoading] = useState(true);

  const year = new Date().getFullYear();

  useEffect(() => {
    const run = async () => {
      if (status === "loading") return;
      if (!session?.googleIdToken) return;

      try {
        setLoading(true);
        const res = await getMonthlyRevenue(year, session.googleIdToken);

        // sendSuccess shape: { data: { year, data } }
        const payload = res?.data ?? res;
        const list = payload?.data ?? payload;

        setData(Array.isArray(list) ? list : []);
      } catch (e) {
        console.error(e);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [session?.googleIdToken, status, year]);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Monthly Income ({year})
        </h3>
        {loading && (
          <span className="text-sm text-gray-500 dark:text-gray-400">Loading…</span>
        )}
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
