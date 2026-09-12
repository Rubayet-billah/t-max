import React from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-950 text-emerald-100 py-10 px-4 sm:px-6 border-t border-green-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <Leaf className="w-6 h-6 text-emerald-400" />
            <span className="text-xl font-black text-white">শ্রীমঙ্গল টি ভ্যালি</span>
          </div>
          <p className="text-xs text-emerald-300 leading-relaxed max-w-sm">
            শ্রীমঙ্গলের পাহাড়ি বাগানের সতেজ চা সরাসরি আপনার চায়ের কাপে। বিশুদ্ধতা, সতেজতা ও বিশ্বস্ততার নিশ্চয়তা।
          </p>
          <div className="mt-3 flex gap-3 text-xs">
            <Link href="/" className="text-emerald-400 hover:underline">
              হোম
            </Link>
            <span className="text-emerald-700">•</span>
            <Link href="/checkout" className="text-emerald-400 hover:underline">
              চেকআউট
            </Link>
            <span className="text-emerald-700">•</span>
            <Link href="/products/organic-green-tea" className="text-emerald-400 hover:underline">
              গ্রিন টি
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-3">হেল্পলাইন ও কাস্টমার কেয়ার</h4>
          <div className="text-xs text-emerald-300 space-y-1">
            <span className="block">📞 ফোন: +880 1700-000000 (সকাল ৯টা - রাত ১০টা)</span>
            <span className="block">💬 হোয়াটসঅ্যাপ: +880 1700-000000</span>
            <span className="block">📍 বাগান ও প্যাকেজিং: শ্রীমঙ্গল, মৌলভীবাজার, সিলেট।</span>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-3">নিরাপত্তা ও গ্যারান্টি</h4>
          <p className="text-xs text-emerald-300 leading-relaxed">
            আমরা ১০০% ক্যাশ অন ডেলিভারি প্রদান করি যাতে আপনি কোনো ধরনের ঝুঁকি ছাড়াই পণ্য হাতে পেয়ে যাচাই করে মূল্য দিতে পারেন।
          </p>
          <div className="mt-3 text-[11px] text-emerald-400">
            © 2026 শ্রীমঙ্গল টি ভ্যালি (Sreemangal Tea Valley). সর্বস্বত্ব সংরক্ষিত।
          </div>
        </div>
      </div>
    </footer>
  );
}
