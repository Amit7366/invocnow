import StatCard from "./components/StatCard";
import RevenueChart from "./components/RevenueChart";
import InvoiceStatusChart from "./components/InvoiceStatusChart";
import { DollarSign, FileText, Clock } from "lucide-react";

export default function DashboardPage() {
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
          value="$ 2,450"
          icon={<DollarSign />}
          accent="bg-green-500"
        />
        <StatCard
          title="Total invoice of month"
          value="34"
          icon={<FileText />}
          accent="bg-blue-500"
        />
        <StatCard
          title="Due Payment"
          value="$ 1200"
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
