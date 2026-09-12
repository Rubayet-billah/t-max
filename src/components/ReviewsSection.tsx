import React from "react";
import { Star, Check } from "lucide-react";

export default function ReviewsSection() {
  const reviews = [
    {
      id: "rev-1",
      name: "তানভীর আহমেদ",
      location: "উত্তরা, ঢাকা",
      comment:
        "চা পাতার ঘ্রাণটাই অন্যরকম। প্রতিদিন সকালে খাওয়ার পর সত্যিই ফ্রেশ লাগে। কোনো কেমিক্যাল বা কৃত্রিম সেন্ট নেই। ২ দিনে উত্তরায় ডেলিভারি পেয়েছি!",
    },
    {
      id: "rev-2",
      name: "ফারহানা হক",
      location: "ধানমন্ডি, ঢাকা",
      comment:
        "ওজন নিয়ন্ত্রণ আর ডায়েটের জন্য নিয়মিত খাচ্ছি। অন্যান্য গ্রিন টির মতো অতিরিক্ত তিতা লাগে না, খুব রিফ্রেশিং স্বাদ। প্যাকেজিং কোয়ালিটিও দুর্দান্ত!",
    },
    {
      id: "rev-3",
      name: "মাহমুদুল হাসান",
      location: "সিলেট সদর",
      comment:
        "শ্রীমঙ্গলের আসল চা পাতার স্বাদ পাই এখানে। ডেলিভারিম্যান সামনে রেখে প্যাকেট চেক করে ক্যাশ অন ডেলিভারিতে নিতে পেরেছি। ১০০% রিকমেন্ডেড!",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#f8faf8] border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            ভেরিফায়েড রিভিউ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
            সম্মানিত কাস্টমারদের বাস্তব অভিজ্ঞতা
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            সারা বাংলাদেশ থেকে ১,৪৫০+ এর বেশি সন্তুষ্ট গ্রাহক আমাদের চায়ের প্রশংসা করেছেন।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm relative flex flex-col justify-between"
            >
              <div>
                <div className="flex text-amber-400 mb-3">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed italic mb-4">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{rev.name}</h4>
                  <p className="text-xs text-gray-500">{rev.location}</p>
                </div>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Check className="w-3 h-3" /> ভেরিফায়েড ক্রেতা
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
