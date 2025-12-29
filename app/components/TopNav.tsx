"use client";
import { motion, AnimatePresence } from "framer-motion";
import { signIn, useSession } from 'next-auth/react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from 'react'

const TopNav = () => {
      const { data: session, status } = useSession();
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const router = useRouter();
    
      // Animation Variants
      const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
      };
    
  return (
   
      <nav className={`${session ? 'hidden'  : ''} fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100`}>
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black text-[#57BEA4] flex items-center gap-2"
          >
            <Link href={"/"}className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#57BEA4] rounded-lg rotate-12 flex items-center justify-center text-white text-sm">
                IN
              </div>
              Invocnow
            </Link>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 font-semibold text-slate-600">
             <a
               
                href={`/invoice`}
                className="text-[#57BEA4] transition-colors capitalize"
              >
                Make Invoice
              </a>
            {["features", "pricing", "review", "Contact"].map((item) => (
              // {["ফিচার", "প্রাইসিং", "রিভিউ", "যোগাযোগ"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="hover:text-[#57BEA4] transition-colors capitalize"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              {session ? (
                <Link
                  href="/dashboard"
                  className="cursor-pointer px-6 py-2 bg-slate-900 text-white rounded-full font-bold shadow-lg"
                >
                  {/* ড্যাশবোর্ড */}
                  Dashboard
                </Link>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  className="cursor-pointer px-6 py-2 bg-[#57BEA4] text-white rounded-full font-bold shadow-lg shadow-green-100"
                >
                 Login
                  {/* শুরু করুন */}
                </button>
              )}
            </div>

            {/* Hamburger Menu Icon */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="flex flex-col p-6 space-y-4 font-bold">
                <a
               
                href={`/invoice`}
                className="text-[#57BEA4] transition-colors capitalize"
              >
                Make Invoice
              </a>
                <a href="#features" onClick={() => setIsMenuOpen(false)}>
                  Feature
                </a>
                <a href="#pricing" onClick={() => setIsMenuOpen(false)}>
                  Pricing
                </a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </a>

                {session ? (
                  <Link
                    href="/dashboard"
                    className="px-6 py-2 bg-slate-900 text-white rounded-full font-bold shadow-lg"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <button
                    onClick={() => signIn("google")}
                    className="w-full py-3 bg-[#57BEA4] text-white rounded-xl"
                  >
                    Login
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
  )
}

export default TopNav
