"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      className="cursor-pointer inline-block px-5 py-1 bg-white text-gray-800 rounded-md font-medium hover:bg-gray-100 transition-colors"
      onClick={() => signOut()}
    >
      Logout
    </button>
  );
}