"use client";

import React, { useState } from "react";
import LiveDemoBanner from "@/components/LiveDemoBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import ProductSelector from "@/components/ProductSelector";
import SourcingStory from "@/components/SourcingStory";
import ReviewsSection from "@/components/ReviewsSection";
import CheckoutForm from "@/components/CheckoutForm";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { PRODUCTS } from "@/data/products";

export default function LandingPage() {
  const [selectedProductId, setSelectedProductId] = useState<string>("organic-green-tea");
  const [selectedPackId, setSelectedPackId] = useState<string>("pack-100g");
  const [quantity, setQuantity] = useState<number>(1);

  const handleProductChange = (prodId: string) => {
    setSelectedProductId(prodId);
    const prod = PRODUCTS.find((p) => p.id === prodId);
    if (prod && prod.packs.length > 0) {
      setSelectedPackId(prod.packs[0].id);
    }
  };

  const scrollToCheckout = () => {
    const checkoutEl = document.getElementById("checkout");
    if (checkoutEl) {
      checkoutEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const currentPack =
    currentProduct.packs.find((pk) => pk.id === selectedPackId) || currentProduct.packs[0];
  const totalPayable = currentPack.price * quantity + 70; // Inside Dhaka default

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8]">
      {/* 1. Top Live Demo Warning Banner */}
      <LiveDemoBanner />

      {/* 2. Header / Brand Navbar */}
      <Navbar onOrderClick={scrollToCheckout} />

      {/* 3. Hero Section with Ratings, Urgency & Trust Badges */}
      <HeroSection onOrderClick={scrollToCheckout} />

      {/* 4. Health & Wellness Benefits Grid */}
      <BenefitsSection />

      {/* 5. Interactive Product Tier & Pack Selector with Details Link */}
      <ProductSelector
        selectedProductId={selectedProductId}
        selectedPackId={selectedPackId}
        quantity={quantity}
        onProductChange={handleProductChange}
        onPackChange={setSelectedPackId}
        onQuantityChange={setQuantity}
        onOrderClick={scrollToCheckout}
      />

      {/* 6. Sreemangal Estate Sourcing Story & Heritage */}
      <SourcingStory />

      {/* 7. Authentic Customer Reviews & Social Proof */}
      <ReviewsSection />

      {/* 8. 1-Step Cash on Delivery Checkout Form */}
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

          <CheckoutForm
            initialProductId={selectedProductId}
            initialPackId={selectedPackId}
            initialQuantity={quantity}
            allowProductSwitch={true}
          />
        </div>
      </section>

      {/* 9. FAQ Section */}
      <FaqSection />

      {/* 10. Footer */}
      <Footer />

      {/* 11. Floating Action Elements (WhatsApp, Order Toast, Mobile Bar) */}
      <FloatingActions
        totalPayable={totalPayable}
        onOrderClick={scrollToCheckout}
        checkoutHref="/checkout"
      />
    </div>
  );
}
