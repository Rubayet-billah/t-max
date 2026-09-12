"use client";

import React, { useState, useId, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  Leaf,
  Sparkles,
  Award,
  Clock,
  ChevronDown,
  Check,
  Star,
  Phone,
  MapPin,
  User,
  ShoppingBag,
  ArrowRight,
  HelpCircle,
  Flame,
  CheckCircle2,
  AlertCircle,
  Heart,
  Coffee,
  Sun,
  Shield,
  MessageCircle,
} from "lucide-react";

// Product Catalog
interface ProductOption {
  id: string;
  name: string;
  banglaSubtitle: string;
  badge?: string;
  isPopular?: boolean;
  image: string;
  packs: {
    id: string;
    size: string;
    price: number;
    originalPrice: number;
    savingsText?: string;
  }[];
}

const PRODUCTS: ProductOption[] = [
  {
    id: "organic-green-tea",
    name: "প্রিমিয়াম খাঁটি অর্গানিক গ্রিন টি",
    banglaSubtitle: "শ্রীমঙ্গলের পাহাড়ি ঢালের কোমল কচি দুটি পাতা একটি কুঁড়ি থেকে প্রস্তুত।",
    badge: "সবচেয়ে জনপ্রিয় / সেরা পছন্দ",
    isPopular: true,
    image: "/images/green-tea-pack.jpg",
    packs: [
      {
        id: "pack-100g",
        size: "১০০ গ্রাম ট্রায়াল প্যাক",
        price: 380,
        originalPrice: 450,
        savingsText: "৳৭০ ছাড়",
      },
      {
        id: "pack-250g",
        size: "২৫০ গ্রাম ফ্যামিলি প্যাক",
        price: 750,
        originalPrice: 950,
        savingsText: "৳২০০ ছাড় (সেরা ভ্যালু)",
      },
    ],
  },
  {
    id: "classic-ctc-black",
    name: "ক্লাসিক সিটিসি ব্ল্যাক টি (দুধ-চায়ের সেরা ব্লেন্ড)",
    banglaSubtitle: "কড়া লিকার, মন মাতানো সোনালী বর্ণ ও রাজকীয় সুবাসের নিখুঁত ব্লেন্ড।",
    badge: "কড়া লিকার স্পেশাল",
    isPopular: false,
    image: "/images/tea-cup.jpg",
    packs: [
      {
        id: "pack-ctc-250g",
        size: "২৫০ গ্রাম প্যাক",
        price: 320,
        originalPrice: 380,
        savingsText: "৳৬০ ছাড়",
      },
      {
        id: "pack-ctc-500g",
        size: "৫০০ গ্রাম মেগা প্যাক",
        price: 590,
        originalPrice: 720,
        savingsText: "৳১৩০ ছাড়",
      },
    ],
  },
  {
    id: "masala-chai-blend",
    name: "অ্যারোমা স্পেশাল মসলা চাই ব্লেন্ড",
    banglaSubtitle: "এলাচ, দারুচিনি, লবঙ্গ ও আদার প্রাকৃতিক নির্যাসে সমৃদ্ধ রিফ্রেশিং মসলা চা।",
    badge: "ভেষজ মসলা যুক্ত",
    isPopular: false,
    image: "/images/tea-garden.jpg",
    packs: [
      {
        id: "pack-masala-200g",
        size: "২০০ গ্রাম স্পেশাল প্যাক",
        price: 420,
        originalPrice: 500,
        savingsText: "৳৮০ ছাড়",
      },
    ],
  },
];

// Live Social Proof Notification Queue
const RECENT_ORDERS = [
  { name: "কাজী আসিফ", location: "চট্টগ্রাম সদর", pack: "২৫০ গ্রাম গ্রিন টি", time: "৩ মিনিট আগে" },
  { name: "তানজিনা সুলতানা", location: "উত্তরা, ঢাকা", pack: "১০০ গ্রাম ট্রায়াল প্যাক", time: "৬ মিনিট আগে" },
  { name: "মাহমুদুর রহমান", location: "রাজশাহী", pack: "২৫০ গ্রাম ফ্যামিলি প্যাক", time: "১০ মিনিট আগে" },
  { name: "সাদিয়া আফরোজ", location: "মিরপুর, ঢাকা", pack: "২০০ গ্রাম মসলা চাই", time: "১২ মিনিট আগে" },
];

export default function LandingPage() {
  // Product state
  const [selectedProductId, setSelectedProductId] = useState<string>("organic-green-tea");
  const [selectedPackId, setSelectedPackId] = useState<string>("pack-100g");
  const [quantity, setQuantity] = useState<number>(1);

  // Checkout Form state
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryArea, setDeliveryArea] = useState<"inside_dhaka" | "outside_dhaka">("inside_dhaka");
  const [customerNote, setCustomerNote] = useState("");

  // Validation & UI states
  const [phoneError, setPhoneError] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Social Proof Toast state
  const [currentToastIdx, setCurrentToastIdx] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const router = useRouter();

  // Derived current product and pack
  const currentProduct =
    PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const currentPack =
    currentProduct.packs.find((pk) => pk.id === selectedPackId) || currentProduct.packs[0];

  const deliveryCharge = deliveryArea === "inside_dhaka" ? 70 : 130;
  const subtotal = currentPack.price * quantity;
  const totalPayable = subtotal + deliveryCharge;

  // Real-time Social proof notification cycling
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

  // When product changes, reset pack to first pack of that product
  const handleProductChange = (prodId: string) => {
    setSelectedProductId(prodId);
    const prod = PRODUCTS.find((p) => p.id === prodId);
    if (prod && prod.packs.length > 0) {
      setSelectedPackId(prod.packs[0].id);
    }
  };

  // Strict Phone Validation helper
  const validatePhone = (num: string) => {
    const clean = num.replace(/\s+/g, "");
    if (!clean) {
      setPhoneError("মোবাইল নাম্বার দিন");
      return false;
    }
    const bdRegex = /^01[3-9]\d{8}$/;
    if (!bdRegex.test(clean)) {
      setPhoneError("১১ ডিজিটের সঠিক নাম্বার দিন (যেমন: 01712345678)");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomerPhone(val);
    if (val.length >= 11) {
      validatePhone(val);
    } else if (phoneError) {
      setPhoneError("");
    }
  };

  // Smooth scroll to checkout section
  const scrollToCheckout = () => {
    const checkoutEl = document.getElementById("checkout");
    if (checkoutEl) {
      checkoutEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle Form Submission
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!customerName.trim()) {
      setFormError("অনুগ্রহ করে আপনার নাম লিখুন।");
      return;
    }

    if (!validatePhone(customerPhone)) {
      setFormError("অনুগ্রহ করে সঠিক ১১ ডিজিটের বাংলাদেশী মোবাইল নাম্বার দিন।");
      return;
    }

    if (!address.trim() || address.trim().length < 5) {
      setFormError("অনুগ্রহ করে সম্পূর্ণ ডেলিভারি ঠিকানা দিন (বাসা/রোড/থানা/জেলা)।");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        address: address.trim(),
        deliveryArea,
        deliveryCharge,
        selectedProduct: {
          id: currentProduct.id,
          name: currentProduct.name,
          pack: currentPack.size,
          unitPrice: currentPack.price,
        },
        quantity,
        totalAmount: totalPayable,
        customerNote: customerNote.trim(),
      };

      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Save into sessionStorage for complete inspection on success page
        if (typeof window !== "undefined") {
          sessionStorage.setItem(
            "lastOrderDetails",
            JSON.stringify({
              orderId: data.orderId,
              customerName: payload.customerName,
              customerPhone: payload.customerPhone,
              address: payload.address,
              product: payload.selectedProduct.name,
              pack: payload.selectedProduct.pack,
              unitPrice: payload.selectedProduct.unitPrice,
              quantity: payload.quantity,
              deliveryCharge: payload.deliveryCharge,
              totalAmount: payload.totalAmount,
              deliveryArea:
                payload.deliveryArea === "inside_dhaka"
                  ? "ঢাকা সিটির ভেতরে (৳৭০)"
                  : "ঢাকা সিটির বাইরে (৳১৩০)",
              triggers: data.triggers,
            })
          );
        }

        // Navigate to success page
        router.push(
          `/success?orderId=${data.orderId}&name=${encodeURIComponent(
            payload.customerName
          )}&phone=${payload.customerPhone}&total=${payload.totalAmount}&product=${encodeURIComponent(
            payload.selectedProduct.name
          )}&pack=${encodeURIComponent(payload.selectedProduct.pack)}`
        );
      } else {
        setFormError(data.error || "অর্ডার প্রসেস করতে ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setFormError("সার্ভারের সাথে সংযোগ বিচ্ছিন্ন হয়েছে। অনুগ্রহ করে ইন্টারনেট চেক করুন।");
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "শ্রীমঙ্গল টি ভ্যালির গ্রিন টি কেন বাজারের সাধারণ গ্রিন টি থেকে আলাদা?",
      a: "আমাদের চা কোনো কৃত্রিম সুবাস বা কেমিক্যাল ছাড়াই সরাসরি শ্রীমঙ্গলের বিশ্বখ্যাত চা বাগানের নতুন কচি দুটি পাতা ও একটি কুঁড়ি দিয়ে সনাতন ও স্বাস্থ্যসম্মত উপায়ে শুকিয়ে তৈরি করা হয়। এতে কোনো তিতা ভাব থাকে না এবং প্রতিটি কাপে থাকে প্রাকৃতিক সতেজ সুবাস।",
    },
    {
      q: "গ্রিন টি খাওয়ার সঠিক নিয়ম কি?",
      a: "এক কাপ ফোটানো গরম পানিতে ১ চা-চামচ পাতা দিয়ে ২-৩ মিনিট ঢেকে রাখুন। এরপর ছেঁকে পান করুন। আপনি চাইলে এতে কয়েক ফোঁটা লেবুর রস অথবা খাঁটি মধু মেশাতে পারেন। দিনে ২ থেকে ৩ বার খাবারের ৩০ মিনিট পর বা সকালে ও বিকালে পান করা সেরা ফল দেয়।",
    },
    {
      q: "ডেলিভারি পেতে কতদিন সময় লাগবে?",
      a: "ঢাকা সিটির ভেতরে অর্ডার কনফার্মেশনের ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ২ থেকে ৩ কর্মদিবসের মধ্যে আপনার দোরগোড়ায় ডেলিভারি পৌঁছে দেওয়া হবে।",
    },
    {
      q: "পণ্য হাতে পেয়ে চেক করে টাকা দেওয়া যাবে কি?",
      a: "হ্যাঁ, অবশ্যই! আমাদের সম্পূর্ণ ক্যাশ অন ডেলিভারি সুবিধা রয়েছে। ডেলিভারিম্যান থেকে প্যাকেটটি হাতে পেয়ে দেখে নিশ্চিন্ত হয়ে মূল্য পরিশোধ করবেন। কোনো অগ্রিম পেমেন্টের ঝামেলা নেই।",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8]">
      {/* 1. TOP LIVE DEMO BANNER */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white text-xs sm:text-sm py-2 px-4 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-center font-medium">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <span>
            🔴 লাইভ ডেমো স্টোর: এটি একটি লাইভ টেস্ট ফানেল। অর্ডার সাবমিট করলে টেস্ট ডেটা প্রসেস হবে।
          </span>
        </div>
      </div>

      {/* 2. HEADER & HELPLINE BAR */}
      <header className="bg-white/95 backdrop-blur-md border-b border-emerald-100/70 sticky top-8 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-gradient-to-br from-green-700 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-green-900/10">
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
          </div>

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
            <button
              onClick={scrollToCheckout}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-orange-600/30 transition active:scale-95 flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>অর্ডার করুন</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-emerald-50/70 via-[#f8faf8] to-[#f8faf8]">
        {/* Background accent blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-200/40 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-green-200/30 blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Copy & CTAs */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-5">
              {/* Trust Badge / Rating */}
              <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-200/80 px-3.5 py-1.5 rounded-full text-emerald-900 text-xs sm:text-sm font-semibold">
                <div className="flex text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span>৪.৯/৫ (১,৪৫০+ কাস্টমার রিভিউ)</span>
                <span className="hidden sm:inline text-emerald-600">|</span>
                <span className="hidden sm:inline text-emerald-800 font-bold">১২,৮০০+ প্যাক ডেলিভার্ড</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black text-green-950 tracking-tight leading-[1.18]">
                শ্রীমঙ্গলের খাঁটি{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 underline decoration-amber-400 decoration-wavy decoration-2">
                  অর্গানিক গ্রিন টি
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-xl text-gray-700 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                ওজন কমানো, মেটাবলিজম বৃদ্ধি ও সারাদিনের ফ্রেশ এনার্জি—কোনো প্রিজারভেটিভ বা ক্ষতিকর কেমিক্যাল ছাড়া। সতেজ বাগানের প্রথম কুঁড়ির স্বাদ এখন আপনার কাপে।
              </p>

              {/* Urgency Highlight Box */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-600">
                  <Flame className="w-6 h-6 fill-amber-500" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-amber-900 block">
                    সীমিত স্টক অফার! আজই অর্ডার করলে পাচ্ছেন বিশেষ ডিসকাউন্ট
                  </span>
                  <span className="text-[11px] sm:text-xs text-amber-700">
                    ক্যাশ অন ডেলিভারি (COD) — পার্সেল হাতে পেয়ে মূল্য পরিশোধ করুন।
                  </span>
                </div>
              </div>

              {/* Primary CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <button
                  onClick={scrollToCheckout}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-orange-600/30 hover:shadow-orange-600/50 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 animate-glow"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>অর্ডার করুন — ক্যাশ অন ডেলিভারি</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <a
                  href="#benefits"
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold text-sm sm:text-base shadow-sm transition text-center"
                >
                  উপকারিতা ও প্রস্তুত প্রণালী
                </a>
              </div>

              {/* 4 Core Trust Badges Grid */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100 shadow-sm flex flex-col items-center justify-center">
                  <Leaf className="w-5 h-5 text-green-700 mb-1" />
                  <span className="text-xs font-bold text-green-950">১০০% অর্গানিক</span>
                  <span className="text-[10px] text-gray-500">কেমিক্যাল মুক্ত</span>
                </div>
                <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100 shadow-sm flex flex-col items-center justify-center">
                  <Sparkles className="w-5 h-5 text-emerald-600 mb-1" />
                  <span className="text-xs font-bold text-green-950">শ্রীমঙ্গল বাগান</span>
                  <span className="text-[10px] text-gray-500">হাতে তোলা কচি পাতা</span>
                </div>
                <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100 shadow-sm flex flex-col items-center justify-center">
                  <Truck className="w-5 h-5 text-blue-600 mb-1" />
                  <span className="text-xs font-bold text-green-950">ক্যাশ অন ডেলিভারি</span>
                  <span className="text-[10px] text-gray-500">দেখে টাকা দিন</span>
                </div>
                <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100 shadow-sm flex flex-col items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-orange-600 mb-1" />
                  <span className="text-xs font-bold text-green-950">মানিব্যাক গ্যারান্টি</span>
                  <span className="text-[10px] text-gray-500">৭ দিনের নিশ্চয়তা</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Product Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Hero Visual Card with organic pouch packaging */}
                <div className="relative rounded-3xl overflow-hidden bg-white p-3 shadow-2xl border border-emerald-100/80">
                  <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-emerald-950/5">
                    <Image
                      src="/images/green-tea-pack.jpg"
                      alt="শ্রীমঙ্গল অর্গানিক গ্রিন টি প্যাক"
                      fill
                      priority
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-green-800/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                      <Award className="w-3.5 h-3.5 text-amber-300" />
                      <span>প্রিমিয়াম কোয়ালিটি</span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-green-900 text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-md border border-emerald-200">
                      শুরু মাত্র ৳৩৮০ থেকে
                    </div>
                  </div>

                  {/* Micro feature pills below photo */}
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-gray-700">
                    <div className="bg-emerald-50 py-1.5 rounded-lg text-emerald-800">
                      🌿 ফ্রেশ হোল লিফ
                    </div>
                    <div className="bg-emerald-50 py-1.5 rounded-lg text-emerald-800">
                      🛡️ জিপলক সিল
                    </div>
                    <div className="bg-emerald-50 py-1.5 rounded-lg text-emerald-800">
                      ☕ কোমল সুবাস
                    </div>
                  </div>
                </div>

                {/* Floating Social Badge */}
                <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-white/95 backdrop-blur-md border border-emerald-200 p-3 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-gray-900">১০০% খাঁটি ও নির্ভেজাল</p>
                    <p className="text-[10px] text-gray-500">বাগান থেকে সোজা গ্রাহকের হাতে</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HEALTH & WELLNESS BENEFITS GRID */}
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
            {/* Benefit 1 */}
            <div className="bg-[#f9fbf9] p-6 rounded-3xl border border-emerald-100/80 hover:border-emerald-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">মেদ হ্রাস ও মেটাবলিজম</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                প্রাকৃতিক EGCG এবং পলিফেনল শরীরের মেটাবলিজম দ্রুত বৃদ্ধি করে এবং অবাঞ্ছিত ক্যালরি ও ফ্যাট বার্ন করতে সহায়তা করে।
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-[#f9fbf9] p-6 rounded-3xl border border-emerald-100/80 hover:border-emerald-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">রোগ প্রতিরোধ ক্ষমতা</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                প্রচুর পরিমাণ প্রাকৃতিক অ্যান্টিঅক্সিডেন্ট শরীরের রোগ প্রতিরোধ ক্ষমতা বাড়িয়ে ক্ষতিকর ফ্রি-র‌্যাডিক্যাল থেকে দেহকে সুরক্ষিত রাখে।
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-[#f9fbf9] p-6 rounded-3xl border border-emerald-100/80 hover:border-emerald-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">হজম শক্তি ও স্কিন গ্লো</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                শরীর থেকে ক্ষতিকর টক্সিন বের করে পরিপাকতন্ত্র সুস্থ রাখে এবং ভেতর থেকে রক্ত পরিষ্কার করে ত্বকে এনে দেয় প্রাকৃতিক উজ্জ্বলতা।
              </p>
            </div>

            {/* Benefit 4 */}
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

      {/* 5. INTERACTIVE PRODUCT VARIETY / TIER SELECTION */}
      <section className="py-12 sm:py-16 bg-[#f3f7f4] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-emerald-800 font-bold text-xs sm:text-sm tracking-wider uppercase bg-emerald-100 px-3 py-1 rounded-full">
              প্যাকেজ পছন্দ করুন
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-green-950 mt-3">
              আমাদের সেরা চা সংগ্রহ ও সাইজ সিলেক্টর
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              আপনার পছন্দের ভ্যারাইটি এবং প্যাক সাইজ সিলেক্ট করুন—নিচের চেকআউট ফর্মে মূল্য স্বয়ংক্রিয়ভাবে আপডেট হবে।
            </p>
          </div>

          {/* Product Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {PRODUCTS.map((prod) => {
              const isSelected = selectedProductId === prod.id;
              return (
                <div
                  key={prod.id}
                  onClick={() => handleProductChange(prod.id)}
                  className={`cursor-pointer rounded-3xl p-5 sm:p-6 transition-all relative border-2 ${
                    isSelected
                      ? "bg-white border-green-700 shadow-xl ring-4 ring-green-700/10 scale-[1.02]"
                      : "bg-white/80 border-gray-200 hover:border-emerald-300 hover:bg-white"
                  }`}
                >
                  {/* Popular Badge */}
                  {prod.badge && (
                    <span
                      className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-extrabold shadow-sm ${
                        prod.isPopular
                          ? "bg-orange-600 text-white"
                          : "bg-emerald-700 text-white"
                      }`}
                    >
                      {prod.badge}
                    </span>
                  )}

                  <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4 bg-gray-100">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div className="absolute bottom-2 left-3 text-white text-xs font-bold">
                      শ্রীমঙ্গল গার্ডেন স্পেশাল
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 text-lg mb-1">{prod.name}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                    {prod.banglaSubtitle}
                  </p>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-gray-500 block">শুরু মূল্য:</span>
                      <span className="text-lg font-black text-green-800">
                        ৳{prod.packs[0].price}
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-green-700 text-white"
                          : "border border-gray-300 text-transparent"
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Pack Size & Quantity Controller */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-md">
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
                        onClick={() => setSelectedPackId(pk.id)}
                        className={`p-3.5 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                          isPackSelected
                            ? "border-green-700 bg-emerald-50/70 shadow-sm"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm text-gray-900">{pk.size}</span>
                          {pk.savingsText && (
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                              {pk.savingsText}
                            </span>
                          )}
                        </div>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-lg font-black text-green-900">৳{pk.price}</span>
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
              <div className="lg:col-span-5 bg-emerald-50/60 p-4 sm:p-5 rounded-2xl border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-gray-600 block mb-1">
                    ২. পরিমাণ (Quantity):
                  </span>
                  <div className="flex items-center bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
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

                <div className="text-center sm:text-right">
                  <span className="text-xs font-medium text-gray-600 block">পণ্যের মোট মূল্য:</span>
                  <span className="text-2xl font-black text-green-900">৳{subtotal}</span>
                  <span className="text-[11px] text-emerald-700 block font-semibold">
                    (ডেলিভারি চার্জ ছাড়া)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SOCIAL PROOF & SOURCING STORY */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-emerald-100 h-80 sm:h-96">
                <Image
                  src="/images/tea-garden.jpg"
                  alt="শ্রীমঙ্গলের সতেজ চা বাগান"
                  fill
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

          {/* 3 Authentic Bangla Customer Review Cards */}
          <div className="mt-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6">
              সম্মানিত কাস্টমারদের মতামত
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Review 1 */}
              <div className="bg-[#f9fbf9] p-6 rounded-3xl border border-gray-200/80 shadow-sm relative flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-3">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed italic mb-4">
                    &ldquo;চা পাতার ঘ্রাণটাই অন্যরকম। প্রতিদিন সকালে খাওয়ার পর সত্যিই ফ্রেশ লাগে। কোনো কেমিক্যাল বা কৃত্রিম সেন্ট নেই। ২ দিনে উত্তরায় ডেলিভারি পেয়েছি!&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">তানভীর আহমেদ</h4>
                    <p className="text-xs text-gray-500">উত্তরা, ঢাকা</p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" /> ভেরিফায়েড ক্রেতা
                  </span>
                </div>
              </div>

              {/* Review 2 */}
              <div className="bg-[#f9fbf9] p-6 rounded-3xl border border-gray-200/80 shadow-sm relative flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-3">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed italic mb-4">
                    &ldquo;ওজন নিয়ন্ত্রণ আর ডায়েটের জন্য নিয়মিত খাচ্ছি। অন্যান্য গ্রিন টির মতো অতিরিক্ত তিতা লাগে না, খুব রিফ্রেশিং স্বাদ। প্যাকেজিং কোয়ালিটিও দুর্দান্ত!&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">ফারহানা হক</h4>
                    <p className="text-xs text-gray-500">ধানমন্ডি, ঢাকা</p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" /> ভেরিফায়েড ক্রেতা
                  </span>
                </div>
              </div>

              {/* Review 3 */}
              <div className="bg-[#f9fbf9] p-6 rounded-3xl border border-gray-200/80 shadow-sm relative flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-3">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed italic mb-4">
                    &ldquo;শ্রীমঙ্গলের আসল চা পাতার স্বাদ পাই এখানে। ডেলিভারিম্যান সামনে রেখে প্যাকেট চেক করে ক্যাশ অন ডেলিভারিতে নিতে পেরেছি। ১০০% রিকমেন্ডেড!&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">মাহমুদুল হাসান</h4>
                    <p className="text-xs text-gray-500">সিলেট সদর</p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" /> ভেরিফায়েড ক্রেতা
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 1-STEP CASH ON DELIVERY (COD) CHECKOUT FORM */}
      <section id="checkout" className="py-12 sm:py-16 bg-[#ebf3ed] scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-700 bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
              সহজ ১-স্টেপ চেকআউট
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-green-950 mt-2">
              ক্যাশ অন ডেলিভারিতে এখনই অর্ডার করুন
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              কোনো অগ্রিম পেমেন্টের প্রয়োজন নেই। পণ্য হাতে পেয়ে সম্পূর্ণ দেখে মূল্য দিন।
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-emerald-200 overflow-hidden">
            {/* Top Checkout Header Banner */}
            <div className="bg-gradient-to-r from-green-800 via-emerald-800 to-green-900 p-4 sm:p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-amber-300" />
                <span className="font-bold text-sm sm:text-base">
                  আপনার অর্ডারের বিবরণ ও ডেলিভারি তথ্য
                </span>
              </div>
              <span className="text-xs bg-emerald-700/60 px-3 py-1 rounded-full border border-emerald-500/30">
                🔒 ১০০% নিরাপদ চেকআউট
              </span>
            </div>

            <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
              {/* Error Banner */}
              {formError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-800 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Selected Product Summary Snapshot */}
              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold text-emerald-800 block">
                    নির্বাচিত পণ্য:
                  </span>
                  <h4 className="font-bold text-gray-900 text-base">
                    {currentProduct.name} ({currentPack.size})
                  </h4>
                  <p className="text-xs text-gray-600">
                    পরিমাণ: {quantity} টি × ৳{currentPack.price} = ৳{subtotal}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("benefits");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs font-bold text-green-800 hover:text-green-950 underline"
                >
                  প্যাকেজ পরিবর্তন করুন
                </button>
              </div>

              {/* Form Input Fields */}
              <div className="space-y-4">
                {/* 1. Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-1.5 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-green-700" />
                    <span>আপনার পুরো নাম লিখুন <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="যেমন: তানভীর আহমেদ"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm text-gray-900 transition"
                  />
                </div>

                {/* 2. Phone */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-green-700" />
                      <span>১১ ডিজিটের মোবাইল নাম্বার <span className="text-red-500">*</span></span>
                    </span>
                    <span className="text-[11px] text-gray-500 font-normal">
                      কল করে অর্ডার কনফার্ম করা হবে
                    </span>
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={11}
                    value={customerPhone}
                    onChange={handlePhoneChange}
                    placeholder="01XXXXXXXXX"
                    className={`w-full px-4 py-3.5 rounded-2xl border text-sm text-gray-900 transition font-mono tracking-wider focus:outline-none ${
                      phoneError
                        ? "border-red-400 bg-red-50/30 focus:ring-2 focus:ring-red-500"
                        : "border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    }`}
                  />
                  {phoneError && (
                    <p className="text-xs text-red-600 mt-1 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {phoneError}
                    </p>
                  )}
                </div>

                {/* 3. Address */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-green-700" />
                    <span>সম্পূর্ণ ডেলিভারি ঠিকানা <span className="text-red-500">*</span></span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="বাসা নং, রোড নং, এলাকা/থানা এবং জেলার নাম লিখুন..."
                    className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm text-gray-900 transition"
                  ></textarea>
                </div>

                {/* 4. Delivery Area Selection */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    ডেলিভারি এরিয়া নির্বাচন করুন:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                        deliveryArea === "inside_dhaka"
                          ? "border-green-700 bg-emerald-50/80 shadow-sm"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="deliveryArea"
                          checked={deliveryArea === "inside_dhaka"}
                          onChange={() => setDeliveryArea("inside_dhaka")}
                          className="w-4 h-4 text-green-700 focus:ring-green-600"
                        />
                        <div>
                          <span className="font-bold text-sm text-gray-900 block">
                            ঢাকা সিটির ভেতরে
                          </span>
                          <span className="text-xs text-gray-500">২৪ থেকে ৪৮ ঘণ্টায় ডেলিভারি</span>
                        </div>
                      </div>
                      <span className="font-bold text-green-900 text-sm">+৳৭০</span>
                    </label>

                    <label
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                        deliveryArea === "outside_dhaka"
                          ? "border-green-700 bg-emerald-50/80 shadow-sm"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="deliveryArea"
                          checked={deliveryArea === "outside_dhaka"}
                          onChange={() => setDeliveryArea("outside_dhaka")}
                          className="w-4 h-4 text-green-700 focus:ring-green-600"
                        />
                        <div>
                          <span className="font-bold text-sm text-gray-900 block">
                            ঢাকা সিটির বাইরে
                          </span>
                          <span className="text-xs text-gray-500">২-৩ দিনে সারা বাংলাদেশ</span>
                        </div>
                      </div>
                      <span className="font-bold text-green-900 text-sm">+৳১৩০</span>
                    </label>
                  </div>
                </div>

                {/* 5. Optional Note */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    বিশেষ নির্দেশনা (অপশনাল):
                  </label>
                  <input
                    type="text"
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    placeholder="যেমন: বিকেলে ডেলিভারি দিন..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800"
                  />
                </div>
              </div>

              {/* Dynamic Order Summary Box */}
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2 text-sm">
                <h4 className="font-bold text-gray-900 pb-2 border-b border-gray-200 text-base flex items-center justify-between">
                  <span>সর্বমোট হিসাব</span>
                  <span className="text-xs font-normal text-gray-500">
                    ক্যাশ অন ডেলিভারি
                  </span>
                </h4>
                <div className="flex justify-between text-gray-600">
                  <span>পণ্যের মূল্য ({quantity} টি):</span>
                  <span className="font-semibold text-gray-900">৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>ডেলিভারি চার্জ:</span>
                  <span className="font-semibold text-gray-900">৳{deliveryCharge}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200 text-lg font-black text-gray-900">
                  <span className="text-green-900">সর্বমোট প্রদেয় বিল:</span>
                  <span className="text-2xl text-orange-600 font-extrabold">৳{totalPayable}</span>
                </div>
              </div>

              {/* High-Contrast Confirm Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-lg sm:text-xl shadow-xl shadow-orange-600/30 hover:shadow-orange-600/50 transition-all transform active:scale-98 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-3 animate-glow"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>অর্ডার প্রসেস হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-6 h-6" />
                    <span>অর্ডার কনফার্ম করুন — ৳{totalPayable}</span>
                  </>
                )}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-green-700" />
                  পণ্য হাতে পেয়ে মূল্য পরিশোধ
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-green-700" />
                  ফাস্ট ডেলিভারি
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-green-700" />
                  ৭ দিনের মানিব্যাক গ্যারান্টি
                </span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION SECTION */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
              সাধারণ জিজ্ঞাসা
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-green-950 mt-2">
              সচরাচর জিজ্ঞাসিত প্রশ্ন ও উত্তর (FAQ)
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-200 overflow-hidden transition-all bg-[#fbfdfb]"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-gray-900 flex items-center justify-between gap-3 hover:bg-emerald-50/50 transition"
                  >
                    <span className="text-sm sm:text-base flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-green-700 shrink-0" />
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        isOpen ? "rotate-180 text-green-700" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">হেল্পলাইন ও কাস্টমার কেয়ার</h4>
            <p className="text-xs text-emerald-300 space-y-1">
              <span className="block">📞 ফোন: +880 1700-000000 (সকাল ৯টা - রাত ১০টা)</span>
              <span className="block">💬 হোয়াটসঅ্যাপ: +880 1700-000000</span>
              <span className="block">📍 বাগান ও প্যাকেজিং: শ্রীমঙ্গল, মৌলভীবাজার, সিলেট।</span>
            </p>
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

      {/* FLOATING ACTION ELEMENTS */}

      {/* A. Live Real-time Order Notification Toast */}
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

      {/* B. Sticky Floating WhatsApp Button */}
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

      {/* C. Mobile Sticky Bottom Checkout Bar (Only visible on small screens) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-2.5 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-gray-500 block">সর্বমোট প্রদেয়:</span>
          <span className="text-lg font-black text-orange-600">৳{totalPayable}</span>
        </div>
        <button
          onClick={scrollToCheckout}
          className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm shadow-md flex items-center gap-1.5"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>অর্ডার করুন (COD)</span>
        </button>
      </div>
    </div>
  );
}
