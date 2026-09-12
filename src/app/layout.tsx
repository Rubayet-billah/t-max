import type { Metadata } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sreemangal-teavalley.com"),
  title: "শ্রীমঙ্গল টি ভ্যালি | Sreemangal Tea Valley — খাঁটি অর্গানিক গ্রিন টি",
  description:
    "শ্রীমঙ্গলের নিজস্ব বাগান থেকে সংগৃহীত ১০০% বিশুদ্ধ ও অর্গানিক গ্রিন টি। ওজন কমানো, মেটাবলিজম বৃদ্ধি ও ফ্রেশ এনার্জি পেতে আজই অর্ডার করুন। ক্যাশ অন ডেলিভারি ও মানিব্যাক গ্যারান্টি।",
  keywords: [
    "শ্রীমঙ্গল গ্রিন টি",
    "Sreemangal Tea Valley",
    "Organic Green Tea BD",
    "Green Tea Bangladesh",
    "চা পাতা",
    "অর্গানিক চা",
    "ক্যাশ অন ডেলিভারি চা",
  ],
  openGraph: {
    title: "শ্রীমঙ্গল টি ভ্যালি — খাঁটি অর্গানিক গ্রিন টি (Sreemangal Tea Valley)",
    description:
      "শ্রীমঙ্গলের সতেজ বাগান থেকে সরাসরি আপনার ঘরে খাঁটি গ্রিন টি। ক্যাশ অন ডেলিভারিতে অর্ডার করুন।",
    url: "https://sreemangal-teavalley.com",
    siteName: "Sreemangal Tea Valley",
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: "/images/tea-garden.jpg",
        width: 1200,
        height: 675,
        alt: "Sreemangal Tea Garden",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[#f8faf8] text-[#1a2e1f] antialiased selection:bg-emerald-200 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
