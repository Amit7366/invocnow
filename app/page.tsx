"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HomePage() {
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

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  return (
    <div className="min-h-screen bg-[#FBFDFB] font-sans text-slate-900 overflow-x-hidden">
      {/* --- Modern Mobile Navbar --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black text-[#57BEA4] flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-[#57BEA4] rounded-lg rotate-12 flex items-center justify-center text-white text-sm">
              IN
            </div>
            Invocnow
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 font-semibold text-slate-600">
            {["ফিচার", "প্রাইসিং", "রিভিউ", "যোগাযোগ"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="hover:text-[#57BEA4] transition-colors"
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
                  ড্যাশবোর্ড
                </Link>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  className="cursor-pointer px-6 py-2 bg-[#57BEA4] text-white rounded-full font-bold shadow-lg shadow-green-100"
                >
                  শুরু করুন
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
                <a href="#features" onClick={() => setIsMenuOpen(false)}>
                  ফিচার
                </a>
                <a href="#pricing" onClick={() => setIsMenuOpen(false)}>
                  প্রাইসিং
                </a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                  যোগাযোগ
                </a>

                {session ? (
                  <Link
                    href="/dashboard"
                    className="px-6 py-2 bg-slate-900 text-white rounded-full font-bold shadow-lg"
                  >
                    ড্যাশবোর্ড
                  </Link>
                ) : (
                  <button
                    onClick={() => signIn("google")}
                    className="w-full py-3 bg-[#57BEA4] text-white rounded-xl"
                  >
                    লগইন করুন
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- Hero Section with Motion --- */}
      <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-[#57BEA4] uppercase bg-green-50 rounded-full">
              Trusted by 500+ Businesses
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-8xl font-black mb-8 tracking-tighter"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            আপনার ব্যবসার <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#57BEA4] to-emerald-600">
              স্মার্ট একাউন্ট্যান্ট
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            ম্যানুয়াল হিসাব বাদ দিন। ইনভকনৌ দিয়ে প্রফেশনাল ইনভয়েস তৈরি করুন,
            অটোমেটিক পেমেন্ট রিমাইন্ডার পাঠান এবং ব্যবসা বড় করুন।
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => signIn("google")}
              className="px-10 py-4 bg-slate-900 text-white rounded-2xl text-lg font-bold hover:shadow-2xl transition-all active:scale-95"
            >
              ফ্রি শুরু করুন
            </button>
            <button className="px-10 py-4 border border-slate-200 rounded-2xl text-lg font-bold hover:bg-slate-50 transition-all">
              কিভাবে কাজ করে?
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- Auto-Scrolling Review Slider --- */}
      <section className="py-20 bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h2 className="text-white text-3xl font-bold">
            আমাদের হ্যাপি ক্লায়েন্ট
          </h2>
        </div>

        <div className="flex w-full">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="inline-block p-8 bg-slate-800 border border-slate-700 rounded-[2rem] min-w-[350px]"
              >
                <div className="flex gap-1 text-yellow-400 mb-4">★★★★★</div>
                <p className="text-slate-300 italic mb-6 whitespace-normal">
                  "অসাধারণ সার্ভিস! আমার ব্যবসার ইনভয়েসিং এখন অনেক সহজ হয়ে
                  গেছে।"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#57BEA4] rounded-full"></div>
                  <div className="text-white font-bold">ইউজার {i}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- Pricing Section (Added New) --- */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl font-black mb-4 tracking-tight">
            সঠিক প্ল্যানটি বেছে নিন
          </h2>
          <p className="text-slate-500">
            কোনো হিডেন চার্জ নেই, আপনার প্রয়োজন অনুযায়ী বেছে নিন
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PriceCard
            title="বেসিক"
            price="০"
            features={["৫টি ইনভয়েস/মাস", "বেসিক টেম্পলেট", "PDF ডাউনলোড"]}
          />
          <PriceCard
            title="প্রো"
            price="৯৯৯"
            features={[
              "আনলিমিটেড ইনভয়েস",
              "কাস্টম ব্রান্ডিং",
              "পেমেন্ট গেটওয়ে",
              "প্রিমিয়াম সাপোর্ট",
            ]}
            recommended
          />
          <PriceCard
            title="এন্টারপ্রাইজ"
            price="২৯৯৯"
            features={[
              "মাল্টিপল ইউজার",
              "ইনভেন্টরি ম্যানেজমেন্ট",
              "API এক্সেস",
            ]}
          />
        </div>
      </section>
      {/* --- Performance Optimized CTA Section --- */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden group">
            {/* গ্লো ইফেক্ট */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#57BEA4]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                সময় বাঁচান, ব্যবসা বড় করুন
              </h2>
              <p className="text-slate-400 mb-10 text-lg">
                আজই ইনভকনৌ-তে যোগ দিন এবং আপনার প্রথম প্রফেশনাল ইনভয়েস তৈরি করুন
                মাত্র ৬০ সেকেন্ডে।
              </p>
              <button
                onClick={() => signIn("google")}
                className="bg-[#57BEA4] hover:bg-[#46a891] text-white px-12 py-4 rounded-2xl font-black text-xl transition-all hover:shadow-[0_0_30px_rgba(87,190,164,0.4)] active:scale-95"
              >
                ফ্রি একাউন্ট খুলুন
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Interactive How it Works --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight">
              মাত্র ৩টি সহজ ধাপে
            </h2>
            <p className="text-slate-500 mt-2">
              আপনার বিলিং প্রক্রিয়াকে অটোমেট করুন
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-dashed bg-slate-100 -z-10"></div>

            {[
              {
                step: "০১",
                title: "তথ্য যোগ করুন",
                desc: "আপনার কোম্পানির লোগো এবং ক্লায়েন্ট ডিটেইলস একবার সেটআপ করুন।",
              },
              {
                step: "০২",
                title: "আইটেম নির্বাচন করুন",
                desc: "আমাদের ড্রপডাউন থেকে সার্ভিস বা প্রোডাক্ট সিলেক্ট করে পরিমাণ লিখুন।",
              },
              {
                step: "০৩",
                title: "ম্যাজিক দেখুন",
                desc: "ব্যাস! আপনার প্রফেশনাল ইনভয়েস রেডি ক্লায়েন্টকে পাঠানোর জন্য।",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="relative bg-slate-50 p-10 rounded-[3rem] border border-white shadow-sm"
              >
                <div className="absolute -top-6 left-10 w-12 h-12 bg-[#57BEA4] text-white flex items-center justify-center rounded-2xl font-black shadow-lg shadow-green-200">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-4 mt-2">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ Section (Added New) --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            সাধারণ কিছু প্রশ্ন
          </h2>
          <div className="space-y-4">
            <FAQItem
              question="ইনভকনৌ কি ফ্রি?"
              answer="হ্যাঁ, আপনি আমাদের বেসিক প্ল্যানটি সারাজীবন ফ্রি ব্যবহার করতে পারবেন।"
            />
            <FAQItem
              question="আমার ডাটা কি নিরাপদ?"
              answer="আমরা ইন্ডাস্ট্রি-স্ট্যান্ডার্ড এনক্রিপশন ব্যবহার করি, আপনার সব তথ্য আমাদের কাছে ১০০% নিরাপদ।"
            />
            <FAQItem
              question="আমি কি মোবাইলে ব্যবহার করতে পারব?"
              answer="অবশ্যই! আমাদের সাইটটি মোবাইল, ট্যাবলেট এবং পিসি সব ডিভাইসে চমৎকার কাজ করে।"
            />
          </div>
        </div>
      </section>
      {/* --- Impact Stats --- */}
      <section className="py-20 bg-[#57BEA4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-white text-center">
            <div className="space-y-2">
              <div className="text-5xl font-black italic">৯৫%</div>
              <p className="text-green-50 font-medium">দ্রুত পেমেন্ট কালেকশন</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-black italic">৳০</div>
              <p className="text-green-50 font-medium">হিডেন কোনো চার্জ নেই</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-black italic">২৪/৭</div>
              <p className="text-green-50 font-medium">ক্লাউড ব্যাকআপ সুবিধা</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-black italic">৫০+</div>
              <p className="text-green-50 font-medium">রেডিমেড টেম্পলেট</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Special Feature: Smart Reminder --- */}
      <section className="py-24 bg-slate-900 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#57BEA4]/20 blur-[100px] rounded-full"></div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              বাকি টাকা আদায়ে আর <br />
              <span className="text-[#57BEA4]">টেনশন নেই!</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              আমাদের "Smart Reminder" সিস্টেম ক্লায়েন্টকে অটোমেটিক হোয়াটসঅ্যাপ
              এবং ইমেইল রিমাইন্ডার পাঠাবে। আপনাকে আর বারবার ফোন করতে হবে না।
            </p>
            <ul className="space-y-4">
              {[
                "শিডিউল রিমাইন্ডার",
                "পেমেন্ট কনফার্মেশন নোট",
                "বাকি টাকার সামারি রিপোর্ট",
              ].map((text) => (
                <li
                  key={text}
                  className="flex items-center gap-3 text-slate-200"
                >
                  <span className="w-5 h-5 bg-[#57BEA4]/20 rounded-full flex items-center justify-center text-[#57BEA4] text-xs">
                    ✔
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-[3rem] border border-slate-700 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
              <div className="text-white font-bold">
                স্মার্ট রিমাইন্ডার প্রিভিউ
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate-700/50 rounded-2xl border border-slate-600 text-sm text-slate-300">
                "প্রিয় ক্লায়েন্ট, আপনার ইনভয়েস #১০২ এর পেমেন্ট আগামীকাল ডিউ..."
              </div>
              <div className="p-4 bg-[#57BEA4]/10 rounded-2xl border border-[#57BEA4]/30 text-sm text-[#57BEA4] text-right">
                রিমাইন্ডার পাঠানো হয়েছে (২:৩০ PM)
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Conversion Focused CTA --- */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-7xl mx-auto bg-gradient-to-r from-[#57BEA4] to-emerald-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-green-200"
        >
          {/* Background Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
              আপনার ব্যবসাকে আজই <br /> ডিজিটাল করুন
            </h2>
            <p className="text-green-50 text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-90">
              কোনো ক্রেডিট কার্ড ছাড়াই শুরু করুন। আজই যোগ দিন বাংলাদেশের সবচেয়ে
              সহজ ইনভয়েসিং প্ল্যাটফর্মে।
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button
                onClick={() => signIn("google")}
                className="px-10 py-5 bg-white text-[#57BEA4] rounded-2xl text-xl font-extrabold hover:bg-slate-900 hover:text-white transition-all transform hover:scale-105 shadow-xl"
              >
                গুগল দিয়ে শুরু করুন
              </button>
              <button className="px-10 py-5 bg-emerald-700 text-white rounded-2xl text-xl font-extrabold hover:bg-emerald-800 transition-all border border-emerald-400/30">
                ডেমো দেখুন
              </button>
            </div>
            <p className="mt-8 text-green-100 text-sm font-medium">
              ⭐ কোনো লুকানো ফি নেই • ২৪/৭ কাস্টমার সাপোর্ট
            </p>
          </div>
        </motion.div>
      </section>
      {/* --- Footer --- */}
      <footer className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="text-2xl font-black text-[#57BEA4] mb-6">
              Invocnow
            </div>
            <p className="text-slate-400 max-w-sm">
              আমরা বাংলাদেশের উদ্যোক্তাদের ডিজিটাল রূপান্তরের স্বপ্ন দেখি। বিলিং
              হোক সহজ এবং সুন্দর।
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">লিঙ্ক</h4>
            <ul className="space-y-4 text-slate-400">
              <li>
                <a href="#">প্রাইভেসি পলিসি</a>
              </li>
              <li>
                <a href="#">টার্মস অফ সার্ভিস</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">যোগাযোগ</h4>
            <p className="text-slate-400 text-sm">সকাল ১০টা - রাত ১০টা</p>
            <p className="text-[#57BEA4] font-bold">support@invocnow.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Sub-components
function PriceCard({ title, price, features, recommended = false }: any) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`p-10 rounded-[2.5rem] border ${
        recommended
          ? "border-[#57BEA4] bg-green-50/30 ring-4 ring-[#57BEA4]/5"
          : "border-slate-100 bg-white"
      }`}
    >
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="text-4xl font-black mb-6">
        ৳{price}
        <span className="text-lg text-slate-400 font-medium">/মাস</span>
      </div>
      <ul className="text-left space-y-4 mb-8">
        {features.map((f: string) => (
          <li key={f} className="flex gap-2 text-slate-600">
            ✓ {f}
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-4 rounded-2xl font-bold transition-all ${
          recommended
            ? "bg-[#57BEA4] text-white shadow-xl shadow-green-200"
            : "bg-slate-100 text-slate-800"
        }`}
      >
        প্যাকটি কিনুন
      </button>
    </motion.div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="p-6 flex justify-between items-center font-bold">
        {question}
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="px-6 pb-6 text-slate-500"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
