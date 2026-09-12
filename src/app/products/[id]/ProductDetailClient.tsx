"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Check,
  Truck,
  ShieldCheck,
  Leaf,
  Coffee,
  Clock,
  Award,
  ShoppingBag,
  Sparkles,
  Sun,
  Shield,
  MessageCircle,
  Thermometer,
} from "lucide-react";
import { ProductOption } from "@/data/products";

interface ProductDetailClientProps {
  product: ProductOption;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedPackId, setSelectedPackId] = useState<string>(product.packs[0].id);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"desc" | "brewing" | "benefits" | "reviews">("desc");

  const selectedPack =
    product.packs.find((pk) => pk.id === selectedPackId) || product.packs[0];

  const subtotal = selectedPack.price * quantity;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Product Showcase & Purchase Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Product Image Gallery */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden bg-gray-50 border border-emerald-100/70 p-3 shadow-md">
              <div className="relative h-80 sm:h-[420px] w-full rounded-2xl overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    {product.badge}
                  </div>
                )}
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-gray-700">
                <div className="bg-emerald-50 py-1.5 rounded-lg text-emerald-800">
                  🌿 ১০০% অর্গানিক
                </div>
                <div className="bg-emerald-50 py-1.5 rounded-lg text-emerald-800">
                  🛡️ জিপলক সিল
                </div>
                <div className="bg-emerald-50 py-1.5 rounded-lg text-emerald-800">
                  ☕ সতেজ লিকার
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Ratings, Pack Selector & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-700">
                  ৪.৯/৫ ({product.reviews.length * 480}+ কাস্টমার রিভিউ)
                </span>
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  ইন-স্টক
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-green-950 leading-tight">
                {product.name}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Price Box */}
            <div className="bg-emerald-50/70 p-4 sm:p-5 rounded-2xl border border-emerald-200/70 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-gray-500 block">বর্তমান অফার মূল্য:</span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-3xl font-black text-green-900">
                    ৳{selectedPack.price}
                  </span>
                  <span className="text-base text-gray-400 line-through">
                    ৳{selectedPack.originalPrice}
                  </span>
                </div>
              </div>
              {selectedPack.savingsText && (
                <span className="px-3 py-1.5 rounded-xl bg-orange-100 text-orange-800 font-bold text-xs border border-orange-200">
                  {selectedPack.savingsText}
                </span>
              )}
            </div>

            {/* Pack Size Selector */}
            <div>
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-2.5">
                প্যাক সাইজ নির্বাচন করুন:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.packs.map((pk) => {
                  const isSelected = selectedPackId === pk.id;
                  return (
                    <button
                      key={pk.id}
                      type="button"
                      onClick={() => setSelectedPackId(pk.id)}
                      className={`p-3.5 rounded-2xl text-left border-2 transition-all flex items-center justify-between ${
                        isSelected
                          ? "border-green-700 bg-emerald-50/80 shadow-sm"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div>
                        <span className="font-bold text-sm text-gray-900 block">{pk.size}</span>
                        <span className="text-xs text-green-800 font-extrabold">৳{pk.price}</span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          isSelected ? "bg-green-700 text-white" : "border border-gray-300"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector & Subtotal */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-600">পরিমাণ:</span>
                <div className="flex items-center bg-gray-50 border border-gray-300 rounded-xl overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 text-lg active:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-base text-gray-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 text-lg active:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-gray-500 block">মোট প্রদেয় (পণ্যের মূল্য):</span>
                <span className="text-2xl font-black text-green-900">৳{subtotal}</span>
              </div>
            </div>

            {/* CTA Order Buttons */}
            <div className="space-y-3 pt-2">
              <Link
                href={`/checkout?product=${product.id}&pack=${selectedPack.id}&qty=${quantity}`}
                className="w-full py-4 px-6 rounded-2xl bg-accent hover:bg-accent-hover text-white font-black text-base sm:text-lg shadow-xl shadow-accent/30 hover:shadow-accent/50 transition-all transform active:scale-98 flex items-center justify-center gap-3 animate-glow text-center"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>এখনই অর্ডার করুন — ৳{subtotal} (ক্যাশ অন ডেলিভারি)</span>
              </Link>

              <a
                href={`https://wa.me/8801700000000?text=আমি%20${encodeURIComponent(
                  product.name
                )}%20(${encodeURIComponent(selectedPack.size)})%20সম্পর্কে%20জানতে%20চাই।`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-secondary-light hover:bg-secondary-100 text-primary-900 font-bold text-sm border border-secondary-200 transition flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle className="w-4 h-4 text-secondary" />
                <span>হোয়াটসঅ্যাপে যেকোনো প্রশ্ন করুন</span>
              </a>
            </div>

            {/* Micro Guarantees */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-[11px] text-gray-600">
              <div className="p-2 bg-gray-50 rounded-xl">
                <Truck className="w-4 h-4 text-green-700 mx-auto mb-1" />
                <span>২৪-৪৮ ঘণ্টায় ডেলিভারি</span>
              </div>
              <div className="p-2 bg-gray-50 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-green-700 mx-auto mb-1" />
                <span>ক্যাশ অন ডেলিভারি</span>
              </div>
              <div className="p-2 bg-gray-50 rounded-xl">
                <Leaf className="w-4 h-4 text-green-700 mx-auto mb-1" />
                <span>১০০% খাঁটি শ্রীমঙ্গল চা</span>
              </div>
              <div className="p-2 bg-gray-50 rounded-xl">
                <Award className="w-4 h-4 text-green-700 mx-auto mb-1" />
                <span>৭ দিনের মানিব্যাক</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail Information Tabs */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm">
        {/* Tab Headers */}
        <div className="flex flex-wrap gap-2 sm:gap-3 border-b border-gray-200 pb-4 mb-8">
          <button
            onClick={() => setActiveTab("desc")}
            className={`px-4 py-2.5 rounded-2xl font-bold text-sm transition ${
              activeTab === "desc"
                ? "bg-primary text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            🌿 বিস্তারিত বিবরণ
          </button>
          <button
            onClick={() => setActiveTab("brewing")}
            className={`px-4 py-2.5 rounded-2xl font-bold text-sm transition ${
              activeTab === "brewing"
                ? "bg-primary text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            ☕ প্রস্তুত প্রণালী
          </button>
          <button
            onClick={() => setActiveTab("benefits")}
            className={`px-4 py-2.5 rounded-2xl font-bold text-sm transition ${
              activeTab === "benefits"
                ? "bg-primary text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            🛡️ স্বাস্থ্য উপকারিতা
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-2.5 rounded-2xl font-bold text-sm transition ${
              activeTab === "reviews"
                ? "bg-primary text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            ⭐ গ্রাহক রিভিউ ({product.reviews.length})
          </button>
        </div>

        {/* Tab 1: Full Description & Taste Profile */}
        {activeTab === "desc" && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">পণ্য সম্পর্কিত তথ্য</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {product.fullDescription}
              </p>
            </div>

            {/* Highlights Grid */}
            <div>
              <h4 className="text-base font-bold text-gray-900 mb-3">মূল বৈশিষ্ট্যসমূহ:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-800">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Taste Profile Box */}
            <div className="bg-[#f9fbf9] p-6 rounded-2xl border border-emerald-100">
              <h4 className="text-base font-bold text-green-950 mb-4 flex items-center gap-2">
                <Coffee className="w-5 h-5 text-green-700" />
                চা পাতার স্বাদ ও বিশেষত্ব (Taste Profile)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
                <div className="bg-white p-3.5 rounded-xl border border-gray-100">
                  <span className="text-gray-500 block mb-1">সুগন্ধ (Aroma):</span>
                  <span className="font-bold text-gray-900">{product.tasteProfile.aroma}</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-gray-100">
                  <span className="text-gray-500 block mb-1">লিকার (Body):</span>
                  <span className="font-bold text-gray-900">{product.tasteProfile.body}</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-gray-100">
                  <span className="text-gray-500 block mb-1">ক্যাফেইন লেভেল:</span>
                  <span className="font-bold text-gray-900">{product.tasteProfile.caffeine}</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-gray-100">
                  <span className="text-gray-500 block mb-1">স্বাদের অনুভূতি:</span>
                  <span className="font-bold text-gray-900">{product.tasteProfile.flavor}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Brewing Guide */}
        {activeTab === "brewing" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                সঠিক উপায়ে চা তৈরির নিয়ম ও স্টেপস
              </h3>
              <p className="text-gray-600 text-sm">
                সঠিক তাপমাত্রার পানি এবং সঠিক সময় দিয়ে তৈরি করলে চায়ের প্রাকৃতিক স্বাদ ও পুষ্টিগুণ পুরোপুরি বজায় থাকে।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-100 text-center">
                <Thermometer className="w-8 h-8 text-green-700 mx-auto mb-2" />
                <span className="text-xs text-gray-500 block">পানির তাপমাত্রা:</span>
                <span className="font-bold text-sm text-gray-900 mt-1 block">
                  {product.brewingGuide.temp}
                </span>
              </div>

              <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-100 text-center">
                <Leaf className="w-8 h-8 text-green-700 mx-auto mb-2" />
                <span className="text-xs text-gray-500 block">পাতার পরিমাণ:</span>
                <span className="font-bold text-sm text-gray-900 mt-1 block">
                  {product.brewingGuide.leaves}
                </span>
              </div>

              <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-100 text-center">
                <Clock className="w-8 h-8 text-green-700 mx-auto mb-2" />
                <span className="text-xs text-gray-500 block">ভেজানোর সময়:</span>
                <span className="font-bold text-sm text-gray-900 mt-1 block">
                  {product.brewingGuide.steepTime}
                </span>
              </div>

              <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-100 text-center">
                <Coffee className="w-8 h-8 text-green-700 mx-auto mb-2" />
                <span className="text-xs text-gray-500 block">মোট কাপ আনুমানিক:</span>
                <span className="font-bold text-sm text-gray-900 mt-1 block">
                  {product.brewingGuide.cupsPerPack}
                </span>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs sm:text-sm text-amber-900 leading-relaxed">
              💡 <strong>বিশেষ পরামর্শ:</strong> গ্রিন টি বানানোর সময় পাতা দিয়ে কখনোই টগবগ করে ফুটাবেন না। পানি ফুটে উঠলে চুলা বন্ধ করে ১ মিনিট অপেক্ষা করুন, তারপর পাতা দিয়ে কাপ ঢেকে রাখুন। এতে কোনো তিতা স্বাদ আসবে না।
            </div>
          </div>
        )}

        {/* Tab 3: Health Benefits */}
        {activeTab === "benefits" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {product.healthBenefits.map((ben, idx) => (
              <div key={idx} className="bg-[#f9fbf9] p-6 rounded-2xl border border-emerald-100">
                <h4 className="font-bold text-base text-gray-900 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-700" />
                  {ben.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">{ben.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Reviews */}
        {activeTab === "reviews" && (
          <div className="space-y-4">
            {product.reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#f9fbf9] p-5 rounded-2xl border border-gray-200/80 flex flex-col sm:flex-row justify-between gap-4"
              >
                <div>
                  <div className="flex text-amber-400 mb-1.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-800 leading-relaxed italic mb-2">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="font-bold text-gray-900">{rev.name}</span>
                    <span>•</span>
                    <span>{rev.location}</span>
                  </div>
                </div>
                <span className="text-[11px] text-gray-400 self-start">{rev.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
