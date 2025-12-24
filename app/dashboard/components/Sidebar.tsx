"use client";

import Link from "next/link";
import { LayoutDashboard, FileText, Plus, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";

const menu = [
  { label: "ড্যাশবোর্ড", href: "/dashboard", icon: LayoutDashboard },
  { label: "ইনভয়েসসমূহ", href: "/dashboard/invoice/all", icon: FileText },
  { label: "নতুন ইনভয়েস", href: "/dashboard/invoice", icon: Plus },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { open, close } = useSidebar();

  return (
    <>
      {/* Overlay (mobile only) */}
      {open && (
        <div
          onClick={close}
          className="fixed left-0 h-screen overflow-y-auto inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed z-50
          h-screen w-64
          bg-white dark:bg-gray-800
          border-r dark:border-gray-700
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            InvocNow
          </span>

          {/* Close button (mobile) */}
          <button
            onClick={close}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X />
          </button>
        </div>

        {/* Menu */}
        <nav className="px-4 space-y-1">
          {menu.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={`
                  flex items-center gap-3 px-4 py-2 rounded-lg transition
                  text-gray-700 dark:text-gray-200
                  ${
                    active
                      ? "bg-blue-100 text-blue-700 dark:bg-gray-700"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                `}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
