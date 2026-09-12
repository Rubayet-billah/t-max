import React from "react";
import { Flame, Shield, Sparkles, Sun } from "lucide-react";

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-12 sm:py-16 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-emerald-700 font-bold text-xs sm:text-sm tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
            দৈনন্দিন সুস্থতায় প্রকৃতির উপহার
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-green-950 mt-3">
            প্রতিদিন এক কাপ খাঁটি গ্রিন টি কেন খাবেন?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            শ্রীমঙ্গলের পাহাড়ি আবহাওয়ায় বেড়ে ওঠা গ্রিন টি পাতায় থাকে ভরপুর অ্যান্টিঅক্সিডেন্ট ও প্রয়োজনীয় খনিজ উপাদান।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#f9fbf9] p-6 rounded-3xl border border-emerald-100/80 hover:border-emerald-300 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">মেদ হ্রাস ও মেটাবলিজম</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              প্রাকৃতিক EGCG এবং পলিফেনল শরীরের মেটাবলিজম দ্রুত বৃদ্ধি করে এবং অবাঞ্ছিত ক্যালরি ও ফ্যাট বার্ন করতে সহায়তা করে।
            </p>
          </div>

          <div className="bg-[#f9fbf9] p-6 rounded-3xl border border-emerald-100/80 hover:border-emerald-300 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">রোগ প্রতিরোধ ক্ষমতা</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              প্রচুর পরিমাণ প্রাকৃতিক অ্যান্টিঅক্সিডেন্ট শরীরের রোগ প্রতিরোধ ক্ষমতা বাড়িয়ে ক্ষতিকর ফ্রি-র‌্যাডিক্যাল থেকে দেহকে সুরক্ষিত রাখে।
            </p>
          </div>

          <div className="bg-[#f9fbf9] p-6 rounded-3xl border border-emerald-100/80 hover:border-emerald-300 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">হজম শক্তি ও স্কিন গ্লো</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              শরীর থেকে ক্ষতিকর টক্সিন বের করে পরিপাকতন্ত্র সুস্থ রাখে এবং ভেতর থেকে রক্ত পরিষ্কার করে ত্বকে এনে দেয় প্রাকৃতিক উজ্জ্বলতা।
            </p>
          </div>

          <div className="bg-[#f9fbf9] p-6 rounded-3xl border border-emerald-100/80 hover:border-emerald-300 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">মন ও মগজে সতেজ প্রশান্তি</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              গ্রিন টি-তে থাকা L-Theanine ক্লান্তি ও মানসিক চাপ দূর করে কাজের মনোযোগ বৃদ্ধি করে এবং সারাদিন আপনাকে রাখে প্রাণবন্ত।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
