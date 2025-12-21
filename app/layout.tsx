import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Invocnow | বাংলাদেশের সেরা অনলাইন ইনভয়েস মেকার",
  description: "সহজেই প্রফেশনাল ইনভয়েস তৈরি করুন, পেমেন্ট ট্র্যাক করুন এবং আপনার ব্যবসার হিসাব রাখুন এক জায়গায়। ফ্রি ট্রায়াল শুরু করুন।",
  keywords: ["invoice maker bangladesh", "online billing software bangla", "SaaS invoice maker", "ইনভয়েস তৈরির সফটওয়্যার"],
  openGraph: {
    title: "Invocnow - স্মার্ট ব্যবসা, সহজ ইনভয়েসিং",
    description: "আপনার ব্যবসার বিলিং ম্যানেজমেন্ট করুন স্মার্টলি।",
    url: "https://invocnow.vercel.app",
    siteName: "Invocnow",
    images: [{ url: "/og-image.png" }], // সামাজিক যোগাযোগ মাধ্যমে শেয়ার করলে এই ছবি দেখাবে
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
