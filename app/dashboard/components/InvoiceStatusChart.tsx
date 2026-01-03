"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { getInvoiceStatusBreakdown } from "@/app/lib/api/analytics";

type Slice = { name: "Paid" | "Due" | "Expired"; value: number };

const COLORS: Record<Slice["name"], string> = {
  Paid: "#22C55E",
  Due: "#FACC15",
  Expired: "#EF4444",
};

export default function InvoiceStatusChart() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<Slice[]>([
    { name: "Paid", value: 0 },
    { name: "Due", value: 0 },
    { name: "Expired", value: 0 },
  ]);
  const [loading, setLoading] = useState(true);

  const year = new Date().getFullYear();

  useEffect(() => {
    const run = async () => {
      if (status === "loading") return;
      if (!session?.googleIdToken) return;

      try {
        setLoading(true);
        const res = await getInvoiceStatusBreakdown(year, session.googleIdToken);

        const payload = res?.data ?? res; // sendSuccess wrapper
        const list = payload?.data ?? payload;

        setData(Array.isArray(list) ? list : data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.googleIdToken, status, year]);

  const hasAny = useMemo(() => data.some((d) => d.value > 0), [data]);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Invoice Status ({year})
        </h3>
        {loading && (
          <span className="text-sm text-gray-500 dark:text-gray-400">Loading…</span>
        )}
      </div>

      <div className="h-[260px]">
        {hasAny ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
            No invoices yet.
          </div>
        )}
      </div>

      {/* Small legend */}
      <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-700 dark:text-gray-300">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ background: COLORS[d.name] }}
            />
            <span>
              {d.name}: <span className="font-semibold">{d.value}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
