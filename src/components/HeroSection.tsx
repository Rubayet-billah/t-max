"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Flame,
  ShoppingBag,
  ArrowRight,
  Leaf,
  Sparkles,
  Truck,
  ShieldCheck,
  Award,
  CheckCircle2,
} from "lucide-react";

interface HeroSectionProps {
  onOrderClick?: () => void;
}

export default function HeroSection({ onOrderClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-emerald-50/70 via-[#f8faf8] to-[#f8faf8]">
      {/* Background accent blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-200/40 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-green-200/30 blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            {/* Trust Badge / Rating */}
            <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-200/80 px-3.5 py-1.5 rounded-full text-emerald-900 text-xs sm:text-sm font-semibold">
              <div className="flex text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span>৪.৯/৫ (১,৪৫০+ কাস্টমার রিভিউ)</span>
              <span className="hidden sm:inline text-emerald-600">|</span>
              <span className="hidden sm:inline text-emerald-800 font-bold">১২,৮০০+ প্যাক ডেলিভার্ড</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black text-green-950 tracking-tight leading-[1.18]">
              শ্রীমঙ্গলের খাঁটি{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 underline decoration-amber-400 decoration-wavy decoration-2">
                অর্গানিক গ্রিন টি
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-xl text-gray-700 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              ওজন কমানো, মেটাবলিজম বৃদ্ধি ও সারাদিনের ফ্রেশ এনার্জি—কোনো প্রিজারভেটিভ বা ক্ষতিকর কেমিক্যাল ছাড়া। সতেজ বাগানের প্রথম কুঁড়ির স্বাদ এখন আপনার কাপে।
            </p>

            {/* Urgency Highlight Box */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-600">
                <Flame className="w-6 h-6 fill-amber-500" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-amber-900 block">
                  সীমিত স্টক অফার! আজই অর্ডার করলে পাচ্ছেন বিশেষ ডিসকাউন্ট
                </span>
                <span className="text-[11px] sm:text-xs text-amber-700">
                  ক্যাশ অন ডেলিভারি (COD) — পার্সেল হাতে পেয়ে মূল্য পরিশোধ করুন।
                </span>
              </div>
            </div>

            {/* Primary CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              {onOrderClick ? (
                <button
                  onClick={onOrderClick}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-orange-600/30 hover:shadow-orange-600/50 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 animate-glow"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>অর্ডার করুন — ক্যাশ অন ডেলিভারি</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <Link
                  href="/checkout?product=organic-green-tea&pack=pack-100g"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-orange-600/30 hover:shadow-orange-600/50 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 animate-glow"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>অর্ডার করুন — ক্যাশ অন ডেলিভারি</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}

              <Link
                href="/products/organic-green-tea"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold text-sm sm:text-base shadow-sm transition text-center"
              >
                প্রোডাক্ট বিস্তারিত দেখুন
              </Link>
            </div>

            {/* 4 Core Trust Badges Grid */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100 shadow-sm flex flex-col items-center justify-center">
                <Leaf className="w-5 h-5 text-green-700 mb-1" />
                <span className="text-xs font-bold text-green-950">১০০% অর্গানিক</span>
                <span className="text-[10px] text-gray-500">কেমিক্যাল মুক্ত</span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100 shadow-sm flex flex-col items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="text-xs font-bold text-green-950">শ্রীমঙ্গল বাগান</span>
                <span className="text-[10px] text-gray-500">হাতে তোলা কচি পাতা</span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100 shadow-sm flex flex-col items-center justify-center">
                <Truck className="w-5 h-5 text-blue-600 mb-1" />
                <span className="text-xs font-bold text-green-950">ক্যাশ অন ডেলিভারি</span>
                <span className="text-[10px] text-gray-500">দেখে টাকা দিন</span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100 shadow-sm flex flex-col items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-orange-600 mb-1" />
                <span className="text-xs font-bold text-green-950">মানিব্যাক গ্যারান্টি</span>
                <span className="text-[10px] text-gray-500">৭ দিনের নিশ্চয়তা</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Product Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden bg-white p-3 shadow-2xl border border-emerald-100/80">
                <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-emerald-950/5">
                  <Image
                    src="/images/green-tea-pack.jpg"
                    alt="শ্রীমঙ্গল অর্গানিক গ্রিন টি প্যাক"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-green-800/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <Award className="w-3.5 h-3.5 text-amber-300" />
                    <span>প্রিমিয়াম কোয়ালিটি</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-green-900 text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-md border border-emerald-200">
                    শুরু মাত্র ৳৩৮০ থেকে
                  </div>
                </div>

                {/* Micro feature pills below photo */}
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-gray-700">
                  <div className="bg-emerald-50 py-1.5 rounded-lg text-emerald-800">
                    🌿 ফ্রেশ হোল লিফ
                  </div>
                  <div className="bg-emerald-50 py-1.5 rounded-lg text-emerald-800">
                    🛡️ জিপলক সিল
                  </div>
                  <div className="bg-emerald-50 py-1.5 rounded-lg text-emerald-800">
                    ☕ কোমল সুবাস
                  </div>
                </div>
              </div>

              {/* Floating Social Badge */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-white/95 backdrop-blur-md border border-emerald-200 p-3 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-900">১০০% খাঁটি ও নির্ভেজাল</p>
                  <p className="text-[10px] text-gray-500">বাগান থেকে সোজা গ্রাহকের হাতে</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
