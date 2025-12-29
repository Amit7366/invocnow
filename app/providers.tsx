"use client";

import { SessionProvider } from "next-auth/react";
import TopNav from "./components/TopNav";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TopNav />
      <>{children}</>
    </SessionProvider>
  );
}
