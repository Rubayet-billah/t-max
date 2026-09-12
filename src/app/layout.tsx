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
  title: "টি-ম্যাক্স (T-Max) | খাঁটি শ্রীমঙ্গল চা — প্রিমিয়াম অর্গানিক গ্রিন টি",
  description:
    "টি-ম্যাক্স (T-Max) শ্রীমঙ্গলের নিজস্ব বাগান থেকে সংগৃহীত ১০০% বিশুদ্ধ ও অর্গানিক চা। ওজন কমানো, মেটাবলিজম বৃদ্ধি ও ফ্রেশ এনার্জি পেতে আজই অর্ডার করুন। ক্যাশ অন ডেলিভারি ও মানিব্যাক গ্যারান্টি।",
  keywords: [
    "টি-ম্যাক্স",
    "টি-ম্যাক্স চা",
    "T-Max Tea",
    "T-Max",
    "শ্রীমঙ্গল গ্রিন টি",
    "Organic Green Tea BD",
    "Green Tea Bangladesh",
    "ক্যাশ অন ডেলিভারি চা",
  ],
  openGraph: {
    title: "টি-ম্যাক্স (T-Max) — খাঁটি শ্রীমঙ্গল চা",
    description:
      "শ্রীমঙ্গলের সতেজ বাগান থেকে সরাসরি আপনার ঘরে খাঁটি গ্রিন টি ও সিটিসি ব্ল্যাক টি। ক্যাশ অন ডেলিভারিতে অর্ডার করুন।",
    url: "https://sreemangal-teavalley.com",
    siteName: "টি-ম্যাক্স (T-Max)",
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: "/images/tea-garden.jpg",
        width: 1200,
        height: 675,
        alt: "টি-ম্যাক্স চা বাগান",
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
      <body className="min-h-screen bg-surface text-dark antialiased selection:bg-secondary-200 selection:text-primary-950">
        {children}
      </body>
    </html>
  );
}
