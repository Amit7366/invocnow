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
            <Link href={"/"}className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#57BEA4] rounded-lg rotate-12 flex items-center justify-center text-white text-sm">
                IN
              </div>
              Invocnow
            </Link>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 font-semibold text-slate-600">
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
            Smart Accoutant <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#57BEA4] to-emerald-600">
              Your Business
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Eliminate manual accounting. Create professional invoices, send
            automatic payment reminders, and grow your business with InvocNow.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href={"/invoice"}
              // onClick={() => signIn("google")}
              className="animate-bounce px-10 py-4 bg-slate-900 text-white rounded-2xl text-lg font-bold hover:shadow-2xl transition-all active:scale-95"
            >
              Start Free
            </Link>
            <Link href={'#features'} className="px-10 py-4 border border-slate-200 rounded-2xl text-lg font-bold hover:bg-slate-50 transition-all">
              How to work?
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- Auto-Scrolling Review Slider --- */}
      <section id="review" className="py-20 bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h2 className="text-white text-3xl font-bold">Happy Client</h2>
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
                  "Great service! My business invoicing has become much easier
                  now."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#57BEA4] rounded-full"></div>
                  <div className="text-white font-bold">User {i}</div>
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
            Choose Your Plan
          </h2>
          <p className="text-slate-500">
            No hidden charges, choose according to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PriceCard
            title="Basic"
            price="0"
            features={["5 invoices/month", "Basic template", "PDF download"]}
          />
          <PriceCard
            title="Pro"
            price="5"
            features={[
              "Unlimited Invoices",
              "Custom Branding",
              "Payment Gateway",
              "Premium Support",
            ]}
            recommended
          />
          <PriceCard
            title="Enterprise"
            price="20"
            features={["Multiple Users", "Inventory Management", "API Access"]}
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
                Save time, grow business
              </h2>
              <p className="text-slate-400 mb-10 text-lg">
                Join InvokNow today and create your first professional invoice
                in just 60 seconds.
              </p>
              <button
                onClick={() => signIn("google")}
                className="bg-[#57BEA4] hover:bg-[#46a891] text-white px-12 py-4 rounded-2xl font-black text-xl transition-all hover:shadow-[0_0_30px_rgba(87,190,164,0.4)] active:scale-95"
              >
                Open a free account
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Interactive How it Works --- */}
      <section
        id="features"
        className="py-24 bg-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight">
              In just 3 easy steps
            </h2>
            <p className="text-slate-500 mt-2">Automate your billing process</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-dashed bg-slate-100 -z-10"></div>

            {[
              {
                step: "01",
                title: "Add information",
                desc: "Set up your company logo and client details once.",
              },
              {
                step: "02",
                title: "Select items",
                desc: "Select a service or product from our dropdown and enter the quantity.",
              },
              {
                step: "03",
                title: "Watch the magic",
                desc: "Various! Your professional invoice is ready to send to your client.",
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
            Some general questions
          </h2>
          <div className="space-y-4">
            <FAQItem
              question="Is InvkNow free?"
              answer="Yes, you can use our basic plan for free for life."
            />
            <FAQItem
              question="Is my data safe?"
              answer="We use industry-standard encryption, all your information is 100% safe with us."
            />
            <FAQItem
              question="Can I use it on mobile?"
              answer="Of course! Our site works great on all devices: mobile, tablet, and PC."
            />
          </div>
        </div>
      </section>
      {/* --- Impact Stats --- */}
      <section className="py-20 bg-[#57BEA4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-white text-center">
            <div className="space-y-2">
              <div className="text-5xl font-black italic">95%</div>
              <p className="text-green-50 font-medium">
                Fast payment collection
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-black italic">$0</div>
              <p className="text-green-50 font-medium">No hidden charges.</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-black italic">24/7</div>
              <p className="text-green-50 font-medium">Cloud backup facility</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-black italic">5+</div>
              <p className="text-green-50 font-medium">Ready-made templates</p>
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
              No more tension to collect the <br />
              <span className="text-[#57BEA4]">remaining money!</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Our "Smart Reminder" system will send automatic WhatsApp and email
              reminders to clients. You don't have to call again and again.
            </p>
            <ul className="space-y-4">
              {[
                "Schedule Reminder",
                "Payment Confirmation Note",
                "Balance Summary Report",
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
              <div className="text-white font-bold">Smart Reminder Preview</div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate-700/50 rounded-2xl border border-slate-600 text-sm text-slate-300">
                "Dear Client, your payment for invoice #102 is due tomorrow..."
              </div>
              <div className="p-4 bg-[#57BEA4]/10 rounded-2xl border border-[#57BEA4]/30 text-sm text-[#57BEA4] text-right">
                Reminder sent (2:30 PM)
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
              Digitalize your business . <br /> today
            </h2>
            <p className="text-green-50 text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-90">
              Get started without a credit card. Join Bangladesh's easiest
              invoicing platform today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button
                onClick={() => signIn("google")}
                className="px-10 py-5 bg-white text-[#57BEA4] rounded-2xl text-xl font-extrabold hover:bg-slate-900 hover:text-white transition-all transform hover:scale-105 shadow-xl"
              >
                Start with Google
              </button>
              <button className="px-10 py-5 bg-emerald-700 text-white rounded-2xl text-xl font-extrabold hover:bg-emerald-800 transition-all border border-emerald-400/30">
                Watch the demo
              </button>
            </div>
            <p className="mt-8 text-green-100 text-sm font-medium">
              ⭐ No hidden fees • 24/7 customer support
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
              We dream of digital transformation for entrepreneurs in
              Bangladesh. Billing should be easy and beautiful.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">লিঙ্ক</h4>
            <ul className="space-y-4 text-slate-400">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Contact</h4>
            <p className="text-slate-400 text-sm">10 am - 10 pm</p>
            <p className="text-[#57BEA4] font-bold">invocnow@gmail.com</p>
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
        ${price}
        <span className="text-lg text-slate-400 font-medium">/month</span>
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
        Buy the pack
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
