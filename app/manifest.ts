import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Invocnow – স্মার্ট ইনভয়েস মেকার",
    short_name: "Invocnow",
    description:
      "বাংলাদেশের সেরা অনলাইন ইনভয়েস মেকার। সহজেই ইনভয়েস তৈরি করুন, পেমেন্ট ট্র্যাক করুন।",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb", // Tailwind blue-600
    orientation: "portrait",
    lang: "bn-BD",
    categories: ["business", "finance", "productivity"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/maskable-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
