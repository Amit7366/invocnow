"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

export default function SyncUserToBackend() {
  const { data: session, status } = useSession();

  useEffect(() => {
    const run = async () => {
      if (status !== "authenticated") return;
      if (!session?.googleIdToken) return;

      // Avoid spamming on every render
      const doneKey = `synced:${session.user?.email}`;
      if (typeof window !== "undefined" && localStorage.getItem(doneKey)) return;

      await axios.post(`${API_BASE}/api/v1/auth/google`, {
        idToken: session.googleIdToken,
      });

      if (typeof window !== "undefined") localStorage.setItem(doneKey, "1");
    };

    run().catch(console.error);
  }, [session?.googleIdToken, session?.user?.email, status]);

  return null;
}
