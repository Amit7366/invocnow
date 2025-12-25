import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import InstallAppBanner from "./components/InstallAppBanner";
import GoogleAnalytics from "./components/GoogleAnalytics";
import dynamic from "next/dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://invocnow.xyz"),
  applicationName: "Invocnow",
  title: {
    default: "Invocnow | বাংলাদেশের সেরা অনলাইন ইনভয়েস মেকার",
    template: "%s | Invocnow",
  },
  description:
    "বাংলাদেশের ব্যবসার জন্য আধুনিক অনলাইন ইনভয়েস মেকার। সহজেই বিল তৈরি করুন, পেমেন্ট ট্র্যাক করুন এবং হিসাব ম্যানেজ করুন।",
  keywords: [
    "invoice maker bangladesh",
    "bangla invoice software",
    "online invoice bangladesh",
    "billing software bangla",
    "ইনভয়েস সফটওয়্যার",
    "অনলাইন ইনভয়েস",
    "ফ্রি ইনভয়েস মেকার বাংলাদেশ",
  ],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const AnalyticsPageView = dynamic(
  () => import("./components/AnalyticsPageView"),
  { ssr: false }
);


// export const metadata: Metadata = {


//   title: "Invocnow | বাংলাদেশের সেরা অনলাইন ইনভয়েস মেকার",
//   description:
//     "সহজেই প্রফেশনাল ইনভয়েস তৈরি করুন, পেমেন্ট ট্র্যাক করুন এবং আপনার ব্যবসার হিসাব রাখুন এক জায়গায়। ফ্রি ট্রায়াল শুরু করুন।",
//   keywords: [
//     "invoice maker bangladesh",
//     "online billing software bangla",
//     "SaaS invoice maker",
//     "ইনভয়েস তৈরির সফটওয়্যার",
//   ],
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon.ico",
//     apple: "/apple-touch-icon.png", // optional
//   },
//   openGraph: {
//     title: "Invocnow - স্মার্ট ব্যবসা, সহজ ইনভয়েসিং",
//     description: "আপনার ব্যবসার বিলিং ম্যানেজমেন্ট করুন স্মার্টলি।",
//     url: "https://invocnow.xyz",
//     siteName: "Invocnow",
//     images: [{ url: "/og-image.png" }],
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn-BD">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        <AnalyticsPageView />
        <InstallAppBanner/>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
