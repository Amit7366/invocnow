import { ReactNode } from "react";

export default function StatCard({
  title,
  value,
  icon,
  accent,
}: {
  title: string;
  value: string;
  icon: ReactNode;
  accent?: string;
}) {
  return (
    <div
      className="
        relative overflow-hidden
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        rounded-2xl p-6
        shadow-sm hover:shadow-md
        transition-all
      "
    >
      {/* Accent Bar */}
      <div
        className={`absolute left-0 top-0 h-full w-1 ${accent || "bg-blue-500"}`}
      />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
            {value}
          </p>
        </div>

        <div className="text-3xl text-gray-400 dark:text-gray-300">
          {icon}
        </div>
      </div>
    </div>
  );
}
