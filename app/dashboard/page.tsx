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
          ড্যাশবোর্ড
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          আজকের ব্যবসার সারসংক্ষেপ
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="আজকের মোট আয়"
          value="৳ ২,৪৫০"
          icon={<DollarSign />}
          accent="bg-green-500"
        />
        <StatCard
          title="এই মাসের ইনভয়েস"
          value="৩৪ টি"
          icon={<FileText />}
          accent="bg-blue-500"
        />
        <StatCard
          title="বকেয়া পেমেন্ট"
          value="৳ ১,২০০"
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
