"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Package,
  Phone,
  MapPin,
  Truck,
  ArrowLeft,
  Sparkles,
  Layers,
  MessageSquare,
  ShieldCheck,
  Send,
  Database,
  ExternalLink,
} from "lucide-react";

interface OrderData {
  orderId: string;
  customerName: string;
  customerPhone: string;
  address: string;
  product: string;
  pack: string;
  unitPrice: number;
  quantity: number;
  deliveryCharge: number;
  totalAmount: number;
  deliveryArea: string;
  triggers?: {
    metaCapi?: any;
    smsGateway?: any;
    sheetSync?: any;
  };
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "meta" | "sms" | "crm">("overview");

  useEffect(() => {
    // Fire festive celebratory confetti on page mount
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#15803d", "#10b981", "#ea580c", "#fbbf24"],
      });
    } catch (e) {
      // safe fallback
    }

    // Attempt to load from sessionStorage or fallback to URL query params
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("lastOrderDetails") : null;
    if (stored) {
      try {
        setOrder(JSON.parse(stored));
        return;
      } catch (e) {
        console.error("Error parsing stored order", e);
      }
    }

    // Fallback using URL query parameters if available
    const orderId = searchParams.get("orderId") || "TEA-" + Math.floor(100000 + Math.random() * 900000);
    const name = searchParams.get("name") || "সম্মানিত কাস্টমার";
    const phone = searchParams.get("phone") || "017XXXXXXXX";
    const product = searchParams.get("product") || "প্রিমিয়াম অর্গানিক গ্রিন টি";
    const total = Number(searchParams.get("total")) || 450;

    setOrder({
      orderId,
      customerName: name,
      customerPhone: phone,
      address: searchParams.get("address") || "ঢাকা, বাংলাদেশ",
      product,
      pack: searchParams.get("pack") || "১০০ গ্রাম প্যাক",
      unitPrice: Number(searchParams.get("price")) || 380,
      quantity: Number(searchParams.get("qty")) || 1,
      deliveryCharge: Number(searchParams.get("delivery")) || 70,
      totalAmount: total,
      deliveryArea: "ঢাকা সিটির ভেতরে (৳৭০)",
      triggers: {
        metaCapi: {
          status: "simulated_success",
          event_name: "Purchase",
          currency: "BDT",
          value: total,
        },
        smsGateway: {
          status: "simulated_sent",
          to: phone,
          message: `ধন্যবাদ ${name}, টি-ম্যাক্স (T-Max)-এ আপনার ${product} অর্ডারটি গৃহীত হয়েছে। অর্ডার নং: ${orderId}। সর্বমোট: ৳${total} (ক্যাশ অন ডেলিভারি)।`,
        },
        sheetSync: {
          status: "simulated_logged",
          orderId,
          timestamp: new Date().toISOString(),
        },
      },
    });
  }, [searchParams]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f7f4] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Top Demo Banner */}
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-4 text-white shadow-lg">
          <div className="flex items-start gap-3">
            <Sparkles className="h-6 w-6 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                💡 প্রস্পেক্টিভ ক্লায়েন্টদের জন্য লাইভ ডেমো বিবরণ:
              </h3>
              <p className="mt-1 text-sm sm:text-base text-amber-50 leading-relaxed font-medium">
                &ldquo;এটি একটি লাইভ ডেমো অর্ডার ছিল। ক্লায়েন্টের আসল সিস্টেমে এই অর্ডারটি ১ সেকেন্ডের মধ্যে গুগল শিটে জমা হয়, কাস্টমারের ফোনে SMS চলে যায় এবং মেটা পিক্সেলে CAPI Purchase ইভেন্ট ফায়ার হয়।&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Success Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100 text-center relative overflow-hidden mb-6">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-50 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-green-50 rounded-full blur-2xl"></div>

          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mb-4 ring-8 ring-emerald-50 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100 rounded-full mb-2">
            অর্ডার সফল হয়েছে
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            ধন্যবাদ, {order.customerName}!
          </h1>
          <p className="mt-2 text-gray-600 text-sm sm:text-base max-w-lg mx-auto">
            আপনার অর্ডারটি সফলভাবে সিস্টেমে গ্রহণ করা হয়েছে। আমাদের কাস্টমার প্রতিনিধি শীঘ্রই আপনাকে ফোন করে অর্ডারটি কনফার্ম করবেন।
          </p>

          <div className="mt-5 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-emerald-900 font-mono text-sm font-semibold">
            <span>অর্ডার ট্র্যাকিং আইডি:</span>
            <span className="text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
              #{order.orderId}
            </span>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
            <Package className="w-5 h-5 text-green-700" />
            অর্ডার সামারি (ক্যাশ অন ডেলিভারি)
          </h2>

          <div className="space-y-4">
            {/* Product Details */}
            <div className="flex justify-between items-start bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/60">
              <div>
                <h3 className="font-bold text-gray-900">{order.product}</h3>
                <p className="text-sm text-gray-600 mt-0.5">প্যাক সাইজ: {order.pack}</p>
                <p className="text-xs text-gray-500 mt-1">
                  পরিমাণ: {order.quantity} টি (একক মূল্য: ৳{order.unitPrice})
                </p>
              </div>
              <span className="font-bold text-gray-900 text-lg">
                ৳{order.unitPrice * order.quantity}
              </span>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 pt-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>পণ্যের মোট মূল্য:</span>
                <span className="font-medium text-gray-800">
                  ৳{order.unitPrice * order.quantity}
                </span>
              </div>
              <div className="flex justify-between">
                <span>ডেলিভারি চার্জ ({order.deliveryArea}):</span>
                <span className="font-medium text-gray-800">
                  ৳{order.deliveryCharge}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-base sm:text-lg font-bold text-gray-900">
                <span className="text-green-800">সর্বমোট প্রদেয় (ক্যাশ অন ডেলিভারি):</span>
                <span className="text-xl sm:text-2xl text-orange-600 font-extrabold">
                  ৳{order.totalAmount}
                </span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-green-700 shrink-0 mt-1" />
                <div>
                  <span className="text-xs text-gray-500 block">কাস্টমার ফোন:</span>
                  <span className="font-semibold text-gray-900">{order.customerPhone}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-green-700 shrink-0 mt-1" />
                <div>
                  <span className="text-xs text-gray-500 block">ডেলিভারি ঠিকানা:</span>
                  <span className="font-semibold text-gray-900">{order.address}</span>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:col-span-2 bg-gray-50 p-3 rounded-xl">
                <Truck className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900 block">
                    প্রত্যাশিত ডেলিভারি সময়:
                  </span>
                  <span className="text-xs text-gray-600">
                    ঢাকা সিটির ভেতরে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ২ থেকে ৩ কর্মদিবসের মধ্যে। পণ্য হাতে পেয়ে সম্পূর্ণ দেখে মূল্য পরিশোধ করুন।
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Client Inspection Tabs: Real-time Triggers */}
        <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl mb-8 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-white">
                  স্বয়ংক্রিয় ব্যাকএন্ড পাইপলাইন ইন্সপেক্টর
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                এই অর্ডারের জন্য ব্যাকএন্ডে যে ৩টি অটোমেশন ট্রিগার এক্সিকিউট হয়েছে তা নিচে পর্যবেক্ষণ করুন:
              </p>
            </div>
            <span className="self-start sm:self-center px-2.5 py-1 text-xs rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              3 Triggers Active
            </span>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "overview"
                  ? "bg-emerald-600 text-white shadow"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              সিস্টেম ওভিউ
            </button>
            <button
              onClick={() => setActiveTab("meta")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "meta"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              ১. Meta CAPI
            </button>
            <button
              onClick={() => setActiveTab("sms")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "sms"
                  ? "bg-emerald-700 text-white shadow"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              ২. BD SMS Gateway
            </button>
            <button
              onClick={() => setActiveTab("crm")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "crm"
                  ? "bg-amber-600 text-white shadow"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              ৩. Google Sheets / CRM
            </button>
          </div>

          {/* Tab Contents */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  Meta CAPI Purchase
                </div>
                <p className="text-slate-300">
                  অর্ডার সম্পন্ন হওয়ার সাথে সাথে ব্রাউজার অ্যাড-ব্লকার বাইপাস করে সরাসরি ফেসবুক কনভার্সন API-এ সার্ভার-সাইড Purchase ইভেন্ট ফায়ার হয়েছে।
                </p>
                <div className="mt-3 text-xs font-mono text-emerald-400">Status: Dispatched (200)</div>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Bangla Confirmation SMS
                </div>
                <p className="text-slate-300">
                  কাস্টমারের মোবাইল ({order.customerPhone})-এ ইউনিক অর্ডার আইডি এবং সর্বমোট প্রদেয় ৳{order.totalAmount} সহ রিয়েলটাইম কনফার্মেশন SMS পাঠানো হয়েছে।
                </p>
                <div className="mt-3 text-xs font-mono text-emerald-400">Status: Queued / Sent</div>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                <div className="flex items-center gap-2 text-amber-400 font-semibold mb-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  CRM / Sheets Auto-Sync
                </div>
                <p className="text-slate-300">
                  ক্লায়েন্টের গুগল স্প্রেডশিট অথবা টেলিগ্রাম অর্ডার নোটিফিকেশন চ্যানেলে নতুন অর্ডারের রো স্বয়ংক্রিয়ভাবে ইনসার্ট হয়েছে।
                </p>
                <div className="mt-3 text-xs font-mono text-emerald-400">Status: Synced (1s)</div>
              </div>
            </div>
          )}

          {activeTab === "meta" && (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto">
              <div className="text-slate-400 mb-2 font-bold flex justify-between">
                <span>// Meta Conversions API (CAPI) Server Payload</span>
                <span className="text-emerald-400">Event: Purchase</span>
              </div>
              <pre className="text-emerald-300">
{JSON.stringify(
  {
    event_name: "Purchase",
    event_time: Math.floor(Date.now() / 1000),
    event_id: order.orderId,
    action_source: "website",
    user_data: {
      ph_hashed: "sha256(88" + order.customerPhone + ")",
      client_user_agent: "Mozilla/5.0 ...",
    },
    custom_data: {
      currency: "BDT",
      value: order.totalAmount,
      content_name: `${order.product} - ${order.pack}`,
      content_type: "product",
      contents: [
        {
          id: "tea-organic-green",
          quantity: order.quantity,
          item_price: order.unitPrice,
        },
      ],
    },
  },
  null,
  2
)}
              </pre>
            </div>
          )}

          {activeTab === "sms" && (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs">
              <div className="text-slate-400 mb-2 font-bold flex justify-between">
                <span>// BD SMS Gateway Dispatch Payload (Greenweb / BulkSMSBD)</span>
                <span className="text-emerald-400">200 OK</span>
              </div>
              <div className="space-y-2 text-slate-300">
                <p>
                  <strong className="text-slate-400">Recipient:</strong> {order.customerPhone}
                </p>
                <p>
                  <strong className="text-slate-400">Sender Masking:</strong> T-Max
                </p>
                <div className="mt-2 p-3 bg-slate-900 rounded-lg border border-slate-800 text-emerald-300">
                  &ldquo;ধন্যবাদ {order.customerName}, টি-ম্যাক্স (T-Max)-এ আপনার {order.product} ({order.pack}) অর্ডারটি গৃহীত হয়েছে। অর্ডার নং: #{order.orderId}। সর্বমোট: ৳{order.totalAmount} (ক্যাশ অন ডেলিভারি)। টি-ম্যাক্স।&rdquo;
                </div>
              </div>
            </div>
          )}

          {activeTab === "crm" && (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto">
              <div className="text-slate-400 mb-2 font-bold flex justify-between">
                <span>// Google Sheets Webhook Log Entry</span>
                <span className="text-emerald-400">Sheet: "Orders_2026"</span>
              </div>
              <pre className="text-amber-300">
{JSON.stringify(
  {
    orderId: order.orderId,
    timestamp: new Date().toISOString(),
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    deliveryAddress: order.address,
    orderedProduct: `${order.product} (${order.pack})`,
    quantity: order.quantity,
    itemPrice: order.unitPrice,
    deliveryCharge: order.deliveryCharge,
    totalBill: order.totalAmount,
    paymentMethod: "Cash on Delivery",
    orderStatus: "Processing / Pending Call Confirmation",
  },
  null,
  2
)}
              </pre>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-green-700 hover:bg-green-800 text-white font-bold text-base shadow-md transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
            হোমপেজে ফিরে যান (আরেকটি অর্ডার করুন)
          </Link>

          <a
            href="https://wa.me/8801700000000?text=হ্যালো,%20আমি%20আমার%20শ্রীমঙ্গল%20চা%20অর্ডার%20সম্পর্কে%20জানতে%20চাই।"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base shadow-md transition-all active:scale-95"
          >
            <MessageSquare className="w-5 h-5" />
            হোয়াটসঅ্যাপে সাপোর্ট নিন
          </a>
        </div>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
