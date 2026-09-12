"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronRight, ArrowLeft, ShieldCheck, Truck, Clock } from "lucide-react";
import LiveDemoBanner from "@/components/LiveDemoBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CheckoutForm from "@/components/CheckoutForm";
import { PRODUCTS } from "@/data/products";

function CheckoutContent() {
  const searchParams = useSearchParams();

  const productId = searchParams.get("product") || "organic-green-tea";
  const packId = searchParams.get("pack") || "pack-100g";
  const qty = Number(searchParams.get("qty")) || 1;

  const currentProduct = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-green-800 hover:text-green-950 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোমপেজে ফিরে যান</span>
        </Link>
        <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
          ক্যাশ অন ডেলিভারি চেকআউট
        </span>
      </div>

      <div className="text-center max-w-xl mx-auto mb-8">
        <h1 className="text-2xl sm:text-4xl font-black text-green-950">
          অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          নিচের ফর্মে আপনার নাম, ঠিকানা ও মোবাইল নাম্বার দিন। কোনো অগ্রিম পেমেন্ট ছাড়া পণ্য হাতে পেয়ে চেক করে মূল্য দিন।
        </p>
      </div>

      {/* Main Checkout Form Component */}
      <CheckoutForm
        initialProductId={currentProduct.id}
        initialPackId={packId}
        initialQuantity={qty}
        allowProductSwitch={true}
      />

      {/* Additional Trust Indicators */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <Truck className="w-6 h-6 text-green-700 mx-auto mb-1.5" />
          <h4 className="font-bold text-xs sm:text-sm text-gray-900">ফাস্ট হোম ডেলিভারি</h4>
          <p className="text-[11px] text-gray-500 mt-0.5">
            ঢাকা সিটিতে ২৪-৪৮ ঘণ্টা, ঢাকার বাইরে ২-৩ দিন
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <ShieldCheck className="w-6 h-6 text-green-700 mx-auto mb-1.5" />
          <h4 className="font-bold text-xs sm:text-sm text-gray-900">ক্যাশ অন ডেলিভারি</h4>
          <p className="text-[11px] text-gray-500 mt-0.5">
            পণ্য দেখে যাচাই করে ডেলিভারিম্যানকে টাকা দিন
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <Clock className="w-6 h-6 text-green-700 mx-auto mb-1.5" />
          <h4 className="font-bold text-xs sm:text-sm text-gray-900">৭ দিনের মানিব্যাক গ্যারান্টি</h4>
          <p className="text-[11px] text-gray-500 mt-0.5">
            গুণগত মান পছন্দ না হলে সম্পূর্ণ মূল্য ফেরত
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8]">
      <LiveDemoBanner />
      <Navbar showCheckoutBtn={false} />

      <main className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-[50vh] flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-700"></div>
            </div>
          }
        >
          <CheckoutContent />
        </Suspense>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
