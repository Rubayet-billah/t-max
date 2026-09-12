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
    <header className="bg-white/95 backdrop-blur-md border-b border-primary-100/70 sticky top-8 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-md shadow-primary-950/15 group-hover:scale-105 transition">
            <Leaf className="w-6 h-6 text-secondary-200" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-2xl font-black tracking-tight text-primary-900 block leading-tight">
                টি-ম্যাক্স
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-primary tracking-wide">
                (T-Max)
              </span>
            </div>
            <span className="text-[11px] sm:text-xs text-secondary-700 font-semibold tracking-wide uppercase block">
              টি-ম্যাক্স — ১০০% খাঁটি শ্রীমঙ্গল চা
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/8801700000000?text=আমি%20টি-ম্যাক্স%20(T-Max)%20চা%20সম্পর্কে%20জানতে%20চাই।"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-primary-900 bg-secondary-light hover:bg-secondary-100 border border-secondary-200 px-3.5 py-2 rounded-xl transition"
          >
            <Phone className="w-3.5 h-3.5 text-secondary-600" />
            <span>হেল্পলাইন: ০১৭১১-০০০০০</span>
          </a>

          {showCheckoutBtn && (
            onOrderClick ? (
              <button
                onClick={onOrderClick}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-accent/30 transition active:scale-95 flex items-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>অর্ডার করুন</span>
              </button>
            ) : (
              <Link
                href="/checkout"
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-accent/30 transition active:scale-95 flex items-center gap-1.5"
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
