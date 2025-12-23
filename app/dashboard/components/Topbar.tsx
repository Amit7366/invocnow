"use client";

import { signOut, useSession } from "next-auth/react";

export default function Topbar() {
  const { data } = useSession();

  return (
    <header className="h-16 bg-white text-white dark:bg-gray-800 border-b flex items-center justify-between px-6">
      <h1 className="font-semibold text-lg">Dashboard</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm">{data?.user?.email}</span>
        <button
          onClick={() => signOut()}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
