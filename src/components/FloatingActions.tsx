"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { RECENT_ORDERS } from "@/data/products";

interface FloatingActionsProps {
  totalPayable?: number;
  onOrderClick?: () => void;
  checkoutHref?: string;
}

export default function FloatingActions({
  totalPayable = 450,
  onOrderClick,
  checkoutHref = "/checkout",
}: FloatingActionsProps) {
  const [currentToastIdx, setCurrentToastIdx] = useState(0);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const toastTimer = setTimeout(() => setShowToast(true), 2500);
    const interval = setInterval(() => {
      setShowToast(false);
      setTimeout(() => {
        setCurrentToastIdx((prev) => (prev + 1) % RECENT_ORDERS.length);
        setShowToast(true);
      }, 1000);
    }, 9000);

    return () => {
      clearTimeout(toastTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* 1. Live Real-time Order Notification Toast */}
      {showToast && (
        <div className="fixed bottom-20 left-4 z-40 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-emerald-200 flex items-center gap-3 max-w-xs animate-float">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-gray-900">
              {RECENT_ORDERS[currentToastIdx].name} ({RECENT_ORDERS[currentToastIdx].location})
            </p>
            <p className="text-[11px] text-emerald-700 font-medium">
              {RECENT_ORDERS[currentToastIdx].pack} অর্ডার করেছেন
            </p>
            <span className="text-[9px] text-gray-400">
              {RECENT_ORDERS[currentToastIdx].time}
            </span>
          </div>
        </div>
      )}

      {/* 2. Sticky Floating WhatsApp Button */}
      <a
        href="https://wa.me/8801700000000?text=আমি%20শ্রীমঙ্গল%20গ্রিন%20টি%20সম্পর্কে%20জানতে%20চাই।"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl flex items-center gap-2 font-bold text-sm transition-all transform hover:scale-105"
        title="হোয়াটসঅ্যাপে কথা বলুন"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="hidden sm:inline">হোয়াটসঅ্যাপে কথা বলুন</span>
      </a>

      {/* 3. Mobile Sticky Bottom Checkout Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-2.5 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-gray-500 block">সর্বমোট প্রদেয়:</span>
          <span className="text-lg font-black text-orange-600">৳{totalPayable}</span>
        </div>
        {onOrderClick ? (
          <button
            onClick={onOrderClick}
            className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm shadow-md flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>অর্ডার করুন (COD)</span>
          </button>
        ) : (
          <Link
            href={checkoutHref}
            className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm shadow-md flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>অর্ডার করুন (COD)</span>
          </Link>
        )}
      </div>
    </>
  );
}
