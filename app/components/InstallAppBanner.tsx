"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePWAInstall } from "../hooks/usePWAInstall";

export default function InstallAppBanner() {
  const { canInstall, install } = usePWAInstall();
  const [visible, setVisible] = useState(true);

  if (!canInstall) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="
            fixed bottom-4 right-4 z-50
            h-16 rounded-xl
            bg-[#57BEA4] text-white
            p-4 shadow-lg
            flex items-center gap-4
          "
        >
          {/* Close Button */}
          <button
            onClick={() => setVisible(false)}
            className="
              absolute -top-2 -right-2
              bg-white text-red-500
              w-6 h-6 rounded-full
              flex items-center justify-center
              text-xs font-bold
              shadow
            "
          >
            ✕
          </button>

          {/* Text */}
          <div className="flex-1">
            <p className="font-semibold text-sm">Invocnow Install Now</p>
            <p className="text-sm opacity-90 text-base">
              Create invoices quickly, <span className="underline">Work offline</span>
            </p>
          </div>

          {/* Install Button */}
          <button
            onClick={install}
            className="
            animate-pulse
            text-xs
            text-black
              bg-white 
              px-4 py-2 rounded-lg
              font-medium
              hover:bg-gray-100
              transition
            "
          >
            Install
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
