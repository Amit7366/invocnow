"use client";
import StatCard from "./components/StatCard";
import RevenueChart from "./components/RevenueChart";
import InvoiceStatusChart from "./components/InvoiceStatusChart";
import { DollarSign, FileText, Clock } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../lib/api/analytics";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState({
    todayIncome: 0,
    monthInvoices: 0,
    duePayment: 0,
  });

  useEffect(() => {
    const run = async () => {
      if (status === "loading") return;
      if (!session?.googleIdToken) return;

      const res = await getDashboardStats(session.googleIdToken);
      const payload = res?.data ?? res; // sendSuccess wrapper
      setStats(payload || stats);
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.googleIdToken, status]);
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Summary of Today's business
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Today's Total Income"
          value={`$ ${stats.todayIncome.toLocaleString("en-US")}`}
          icon={<DollarSign />}
          accent="bg-green-500"
        />
        <StatCard
          title="Total invoice of month"
          value={`${stats.monthInvoices}`}
          icon={<FileText />}
          accent="bg-blue-500"
        />
        <StatCard
          title="Due Payment"
          value={`$ ${stats.duePayment.toLocaleString("en-US")}`}
          icon={<Clock />}
          accent="bg-orange-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <InvoiceStatusChart />
      </div>
    </div>
  );
}
