import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function SourcingStory() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-emerald-100 h-80 sm:h-96">
              <Image
                src="/images/tea-garden.jpg"
                alt="শ্রীমঙ্গলের সতেজ চা বাগান"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-950/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  আমাদের গল্প ও ঐতিহ্য
                </span>
                <h3 className="text-xl font-bold mt-1">শ্রীমঙ্গল: চায়ের রাজধানী থেকে সোজা আপনার ঘরে</h3>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
              কেন আমাদের চা সেরা?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              কোনো মধ্যস্বত্বভোগী নেই, কোনো কৃত্রিম কেমিক্যাল নেই
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              বাজারে পাওয়া বেশিরভাগ চা-এ নানা রঙ, ক্ষতিকর সেন্ট বা পুরনো ভাঙা পাতা মেশানো থাকে। &ldquo;শ্রীমঙ্গল টি ভ্যালি&rdquo; সরাসরি শ্রীমঙ্গলের বিশ্বখ্যাত চা বাগান থেকে প্রিমিয়াম অর্গানিক চা সংগ্রহ করে বিশেষ ফুড-গ্রেড ভ্যাকুয়াম জিপলক প্যাকে গ্রাহকের কাছে পৌঁছে দেয়, যাতে চায়ের প্রাকৃতিক অ্যান্টিঅক্সিডেন্ট ও ঘ্রাণ থাকে ১০০% অক্ষুণ্ণ।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">হাতে তোলা কচি কুঁড়ি</h4>
                  <p className="text-xs text-gray-500">যন্ত্রের ভাঙা পাতা নয়, নিখুঁত পাতার ব্লেন্ড।</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">আসল ন্যাচারাল টেস্ট</h4>
                  <p className="text-xs text-gray-500">কোনো কৃত্রিম সুগন্ধি বা রাসায়নিক রং নেই।</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">ফুড গ্রেড জিপলক প্যাক</h4>
                  <p className="text-xs text-gray-500">বাতাসমুক্ত আর্দ্রতাবিহীন ফ্রেশনেস নিশ্চিত।</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">ক্যাশ অন ডেলিভারি</h4>
                  <p className="text-xs text-gray-500">হাতে পেয়ে পরখ করে মূল্য পরিশোধ করার সুবিধা।</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
