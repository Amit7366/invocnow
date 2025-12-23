"use client";

import { Menu } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import { signOut, useSession } from "next-auth/react";

export default function Topbar() {
  const { toggle } = useSidebar();
  const { data } = useSession();

  return (
    <header className="h-16 w-full bg-white dark:bg-gray-800 border-b flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          onClick={toggle}
          className="md:hidden p-2 text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Menu />
        </button>

        <h1 className="font-semibold text-lg text-gray-900 dark:text-white">
          ড্যাশবোর্ড
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
          {data?.user?.email}
        </span>
        <button
          onClick={() => signOut()}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg"
        >
          লগআউট
        </button>
      </div>
    </header>
  );
}
