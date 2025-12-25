"use client";

import { usePWAInstall } from "../hooks/usePWAInstall";



export default function InstallAppBanner() {
  const { canInstall, install } = usePWAInstall();

  if (!canInstall) return null;

  return (
    <div className="fixed w-56 h-56 bottom-4 right-4 z-999 rounded-xl bg-[#57BEA4] text-white p-4 shadow-lg flex flex-col items-center justify-between">
      <div>
        <p className="font-semibold">Invocnow ইনস্টল করুন</p>
        <p className="text-sm opacity-90">
          দ্রুত ইনভয়েস তৈরি করুন, অফলাইনে কাজ করুন
        </p>
      </div>
      <button
        onClick={install}
        className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium"
      >
        Install
      </button>
    </div>
  );
}
