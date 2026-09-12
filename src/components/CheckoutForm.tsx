"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  User,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Clock,
  Award,
} from "lucide-react";
import { PRODUCTS, ProductOption, PackOption } from "@/data/products";

interface CheckoutFormProps {
  initialProductId?: string;
  initialPackId?: string;
  initialQuantity?: number;
  allowProductSwitch?: boolean;
}

export default function CheckoutForm({
  initialProductId = "organic-green-tea",
  initialPackId = "pack-100g",
  initialQuantity = 1,
  allowProductSwitch = true,
}: CheckoutFormProps) {
  const router = useRouter();

  const [productId, setProductId] = useState(initialProductId);
  const [packId, setPackId] = useState(initialPackId);
  const [quantity, setQuantity] = useState(initialQuantity);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryArea, setDeliveryArea] = useState<"inside_dhaka" | "outside_dhaka">("inside_dhaka");
  const [customerNote, setCustomerNote] = useState("");

  const [phoneError, setPhoneError] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync if props change
  React.useEffect(() => {
    if (initialProductId) setProductId(initialProductId);
  }, [initialProductId]);

  React.useEffect(() => {
    if (initialPackId) setPackId(initialPackId);
  }, [initialPackId]);

  React.useEffect(() => {
    if (initialQuantity) setQuantity(initialQuantity);
  }, [initialQuantity]);

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const pack = product.packs.find((pk) => pk.id === packId) || product.packs[0];

  const deliveryCharge = deliveryArea === "inside_dhaka" ? 70 : 130;
  const subtotal = pack.price * quantity;
  const totalPayable = subtotal + deliveryCharge;

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

  const handleSubmit = async (e: React.FormEvent) => {
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
          id: product.id,
          name: product.name,
          pack: pack.size,
          unitPrice: pack.price,
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

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-emerald-200 overflow-hidden">
      {/* Top Header Banner */}
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

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        {formError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-800 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
            <span>{formError}</span>
          </div>
        )}

        {/* Selected Product Summary Snapshot */}
        <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-emerald-800 block">নির্বাচিত পণ্য:</span>
            <h4 className="font-bold text-gray-900 text-base">
              {product.name} ({pack.size})
            </h4>
            <p className="text-xs text-gray-600">
              পরিমাণ: {quantity} টি × ৳{pack.price} = ৳{subtotal}
            </p>
          </div>

          {allowProductSwitch && (
            <div className="flex items-center gap-2">
              <select
                value={packId}
                onChange={(e) => setPackId(e.target.value)}
                className="text-xs font-semibold bg-white border border-emerald-300 rounded-lg px-2.5 py-1.5 text-gray-800 focus:outline-none focus:ring-1 focus:ring-green-600"
              >
                {product.packs.map((pk) => (
                  <option key={pk.id} value={pk.id}>
                    {pk.size} - ৳{pk.price}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1.5 flex items-center gap-1.5">
              <User className="w-4 h-4 text-green-700" />
              <span>
                আপনার পুরো নাম লিখুন <span className="text-red-500">*</span>
              </span>
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

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-green-700" />
                <span>
                  ১১ ডিজিটের মোবাইল নাম্বার <span className="text-red-500">*</span>
                </span>
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

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-green-700" />
              <span>
                সম্পূর্ণ ডেলিভারি ঠিকানা <span className="text-red-500">*</span>
              </span>
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
            <span className="text-xs font-normal text-gray-500">ক্যাশ অন ডেলিভারি</span>
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

        {/* Submit Button */}
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
  );
}
