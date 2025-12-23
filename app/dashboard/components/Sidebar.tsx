"use client";

import Link from "next/link";
import { LayoutDashboard, FileText, Plus } from "lucide-react";
import { usePathname } from "next/navigation";

const menu = [
  { label: "ড্যাশবোর্ড", href: "/dashboard", icon: LayoutDashboard },
  { label: "ইনভয়েসসমূহ", href: "/dashboard/invoice/all", icon: FileText },
  { label: "নতুন ইনভয়েস", href: "/dashboard/invoice", icon: Plus },
];


export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r">
      <div className="p-6 text-xl font-bold text-blue-600">
        InvocNow
      </div>

      <nav className="px-4 space-y-1">
        {menu.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 text-white rounded-lg transition
                ${active
                  ? "bg-blue-50 dark:bg-gray-700"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
