"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Eye, ShoppingBag } from "lucide-react";
import { PRODUCTS } from "@/data/products";

interface ProductSelectorProps {
  selectedProductId: string;
  selectedPackId: string;
  quantity: number;
  onProductChange: (prodId: string) => void;
  onPackChange: (packId: string) => void;
  onQuantityChange: (qty: number) => void;
  onOrderClick?: () => void;
}

export default function ProductSelector({
  selectedProductId,
  selectedPackId,
  quantity,
  onProductChange,
  onPackChange,
  onQuantityChange,
}: ProductSelectorProps) {
  const currentProduct =
    PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const currentPack =
    currentProduct.packs.find((pk) => pk.id === selectedPackId) || currentProduct.packs[0];
  const subtotal = currentPack.price * quantity;

  return (
    <section id="products" className="py-12 sm:py-16 bg-[#f3f7f4] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-primary-800 font-bold text-xs sm:text-sm tracking-wider uppercase bg-secondary-light px-3 py-1 rounded-full border border-secondary-200">
            প্যাকেজ পছন্দ করুন
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-primary-950 mt-3">
            শ্রীমঙ্গলের সেরা চা সংগ্রহ ও সাইজ সিলেক্টর
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            পছন্দের চা ভ্যারাইটি নির্বাচন করে সরাসরি বিস্তারিত দেখুন অথবা নিচে প্যাক সাইজ বেছে নিয়ে এখনই অর্ডার করুন।
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {PRODUCTS.map((prod) => {
            const isSelected = selectedProductId === prod.id;
            return (
              <div
                key={prod.id}
                onClick={() => onProductChange(prod.id)}
                className={`cursor-pointer rounded-3xl p-5 sm:p-6 transition-all relative border-2 flex flex-col justify-between ${isSelected
                    ? "bg-white border-primary shadow-xl ring-4 ring-primary/10 scale-[1.02]"
                    : "bg-white/80 border-gray-200 hover:border-secondary hover:bg-white"
                  }`}
              >
                {prod.badge && (
                  <span
                    className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-extrabold shadow-sm z-10 ${prod.isPopular ? "bg-accent text-white" : "bg-primary text-white"
                      }`}
                  >
                    {prod.badge}
                  </span>
                )}

                <div>
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4 bg-gray-100">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div className="absolute bottom-2 left-3 text-white text-xs font-bold">
                      টি-ম্যাক্স (T-Max) স্পেশাল
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 text-lg mb-1">{prod.name}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                    {prod.banglaSubtitle}
                  </p>
                </div>

                <div>
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[11px] text-gray-500 block">শুরু মূল্য:</span>
                      <span className="text-lg font-black text-primary-900">
                        ৳{prod.packs[0].price}
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${isSelected
                          ? "bg-primary text-white"
                          : "border border-gray-300 text-transparent"
                        }`}
                    >
                      <Check className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Actions: View Details & Select */}
                  <div className="grid grid-cols-2 gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
                    <Link
                      href={`/products/${prod.id}`}
                      className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-secondary-light hover:bg-secondary-100 text-primary-900 font-bold text-xs border border-secondary-200 transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>বিস্তারিত</span>
                    </Link>

                    <Link
                      href={`/checkout?product=${prod.id}&pack=${prod.packs[0].id}`}
                      className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-xs shadow-sm transition"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>অর্ডার</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Pack Size & Quantity Controller */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-primary-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Pack selector pills */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                ১. প্যাক সাইজ নির্বাচন করুন ({currentProduct.name}):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentProduct.packs.map((pk) => {
                  const isPackSelected = selectedPackId === pk.id;
                  return (
                    <button
                      key={pk.id}
                      type="button"
                      onClick={() => onPackChange(pk.id)}
                      className={`p-3.5 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${isPackSelected
                          ? "border-primary bg-secondary-light shadow-sm"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-gray-900">{pk.size}</span>
                        {pk.savingsText && (
                          <span className="text-[10px] font-bold text-primary-800 bg-secondary-light px-2 py-0.5 rounded-md border border-secondary-200">
                            {pk.savingsText}
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-lg font-black text-primary-900">৳{pk.price}</span>
                        <span className="text-xs text-gray-400 line-through">
                          ৳{pk.originalPrice}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Counter & Subtotal */}
            <div className="lg:col-span-5 bg-secondary-light p-4 sm:p-5 rounded-2xl border border-secondary-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-gray-600 block mb-1">
                  ২. পরিমাণ (Quantity):
                </span>
                <div className="flex items-center bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 text-lg active:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-base text-gray-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onQuantityChange(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 text-lg active:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-center sm:text-right">
                <span className="text-xs font-medium text-gray-600 block">পণ্যের মোট মূল্য:</span>
                <span className="text-2xl font-black text-primary-900">৳{subtotal}</span>
                <span className="text-[11px] text-primary block font-semibold">
                  (ডেলিভারি চার্জ ছাড়া)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
