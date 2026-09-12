import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  Check,
  Truck,
  ShieldCheck,
  Leaf,
  Coffee,
  Clock,
  Flame,
  Award,
  ArrowRight,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  ChevronRight,
  Sun,
  Shield,
} from "lucide-react";
import { PRODUCTS, ProductOption } from "@/data/products";
import LiveDemoBanner from "@/components/LiveDemoBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return {
      title: "প্রোডাক্ট পাওয়া যায়নি | শ্রীমঙ্গল টি ভ্যালি",
    };
  }

  return {
    title: `${product.name} | শ্রীমঙ্গল টি ভ্যালি (Sreemangal Tea Valley)`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} — শ্রীমঙ্গল টি ভ্যালি`,
      description: product.shortDescription,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8]">
      <LiveDemoBanner />
      <Navbar />

      <main className="flex-1 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-gray-100 py-3 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-gray-500 font-medium">
            <Link href="/" className="hover:text-green-800 transition">
              হোমপেজ
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link href="/#products" className="hover:text-green-800 transition">
              চা সংগ্রহ
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-900 font-semibold truncate">{product.name}</span>
          </div>
        </div>

        {/* Client Interactive Product Selector & Buying Section */}
        <ProductDetailClient product={product} />

        {/* Related Products Section */}
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                  অন্যান্য ব্লেন্ড
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">
                  আমাদের আরও কিছু বিশেষ চা
                </h3>
              </div>
              <Link
                href="/#products"
                className="text-xs sm:text-sm font-bold text-green-800 hover:text-green-950 flex items-center gap-1"
              >
                সব দেখুন <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-[#f9fbf9] rounded-3xl p-5 border border-emerald-100/80 hover:border-emerald-300 transition-all flex flex-col sm:flex-row gap-5 items-center"
                >
                  <div className="relative h-36 w-36 shrink-0 rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                      src={rel.image}
                      alt={rel.name}
                      fill
                      sizes="144px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="font-bold text-gray-900 text-base mb-1">{rel.name}</h4>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                      {rel.banglaSubtitle}
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-bold text-green-900 text-sm">
                        শুরু মাত্র ৳{rel.packs[0].price}
                      </span>
                      <Link
                        href={`/products/${rel.id}`}
                        className="px-3.5 py-1.5 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-xs shadow-sm transition"
                      >
                        বিস্তারিত দেখুন
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
