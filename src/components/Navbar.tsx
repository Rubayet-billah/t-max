"use client";

import React from "react";
import Link from "next/link";
import { Leaf, Phone, ShoppingBag } from "lucide-react";

interface NavbarProps {
  onOrderClick?: () => void;
  showCheckoutBtn?: boolean;
}

export default function Navbar({ onOrderClick, showCheckoutBtn = true }: NavbarProps) {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-emerald-100/70 sticky top-8 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-gradient-to-br from-green-700 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-green-900/10 group-hover:scale-105 transition">
            <Leaf className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <span className="text-lg sm:text-2xl font-black tracking-tight text-green-900 block leading-tight">
              শ্রীমঙ্গল টি ভ্যালি
            </span>
            <span className="text-[11px] sm:text-xs text-emerald-700 font-semibold tracking-wide uppercase block">
              Sreemangal Tea Valley — ১০০% খাঁটি অর্গানিক চা
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/8801700000000?text=আমি%20শ্রীমঙ্গল%20গ্রিন%20টি%20সম্পর্কে%20জানতে%20চাই।"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-2 rounded-xl transition"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>হেল্পলাইন: ০১৭১১-০০০০০</span>
          </a>

          {showCheckoutBtn && (
            onOrderClick ? (
              <button
                onClick={onOrderClick}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-orange-600/30 transition active:scale-95 flex items-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>অর্ডার করুন</span>
              </button>
            ) : (
              <Link
                href="/checkout"
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-orange-600/30 transition active:scale-95 flex items-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>অর্ডার করুন</span>
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}
