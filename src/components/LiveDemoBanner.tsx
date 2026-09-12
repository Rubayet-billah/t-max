import React from "react";

export default function LiveDemoBanner() {
  return (
    <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white text-xs sm:text-sm py-2 px-4 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-center font-medium">
        <span className="flex h-2.5 w-2.5 relative shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <span>
          🔴 লাইভ ডেমো স্টোর: টি-ম্যাক্স (T-Max) টেস্ট ফানেল। অর্ডার সাবমিট করলে টেস্ট ডেটা প্রসেস হবে।
        </span>
      </div>
    </div>
  );
}
