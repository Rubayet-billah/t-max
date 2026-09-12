import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export interface OrderItem {
  id: string;
  name: string;
  pack: string;
  unitPrice: number;
}

export interface OrderPayload {
  customerName: string;
  customerPhone: string;
  address: string;
  deliveryArea: "inside_dhaka" | "outside_dhaka";
  deliveryCharge: number;
  selectedProduct: OrderItem;
  quantity: number;
  totalAmount: number;
  customerNote?: string;
}

// SHA256 helper for Meta Conversions API user data hashing
function hashData(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

/**
 * 1. Meta Conversions API (CAPI) Server-side Trigger
 */
async function triggerMetaConversionsAPI(
  orderId: string,
  payload: OrderPayload,
  clientIp: string,
  userAgent: string
) {
  const normalizedPhone = payload.customerPhone.startsWith("88")
    ? payload.customerPhone
    : `88${payload.customerPhone}`;

  const capiPayload = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: orderId,
        action_source: "website",
        user_data: {
          ph: [hashData(normalizedPhone)],
          client_ip_address: clientIp,
          client_user_agent: userAgent,
        },
        custom_data: {
          currency: "BDT",
          value: payload.totalAmount,
          content_name: `${payload.selectedProduct.name} - ${payload.selectedProduct.pack}`,
          content_type: "product",
          contents: [
            {
              id: payload.selectedProduct.id,
              quantity: payload.quantity,
              item_price: payload.selectedProduct.unitPrice,
            },
          ],
        },
      },
    ],
  };

  const pixelId = process.env.FB_PIXEL_ID;
  const accessToken = process.env.FB_ACCESS_TOKEN;

  if (pixelId && accessToken) {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(capiPayload),
        }
      );
      const resJson = await response.json();
      return { status: "live_fired", data: resJson };
    } catch (err) {
      console.error("[CAPI Error]:", err);
      return { status: "error", error: String(err) };
    }
  }

  // Demo Fallback Mode: Telemetry logging for client demonstration
  console.log("[Demo Mode - Meta CAPI Purchase Triggered]:", JSON.stringify(capiPayload, null, 2));
  return {
    status: "simulated_success",
    description: "CAPI Purchase payload formatted and ready for Meta Pixel ID + Access Token",
    payloadPreview: capiPayload.data[0],
  };
}

/**
 * 2. Bangladeshi SMS Gateway Dispatch Hook (Greenweb / BulkSMSBD / SSL Wireless)
 */
async function dispatchBanglaSMS(orderId: string, payload: OrderPayload) {
  const smsBody = `ধন্যবাদ ${payload.customerName}, শ্রীমঙ্গল টি ভ্যালিতে আপনার ${payload.selectedProduct.name} (${payload.selectedProduct.pack}) অর্ডারটি গৃহীত হয়েছে। অর্ডার নং: ${orderId}। সর্বমোট: ৳${payload.totalAmount} (ক্যাশ অন ডেলিভারি)। শ্রীমঙ্গল টি ভ্যালি।`;

  const smsApiKey = process.env.SMS_GATEWAY_API_KEY;
  const smsSenderId = process.env.SMS_SENDER_ID || "SreemangalTea";

  if (smsApiKey) {
    try {
      // Example endpoint for BulkSMSBD / Greenweb:
      const response = await fetch("https://api.sms-gateway-bd.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: smsApiKey,
          sender_id: smsSenderId,
          to: payload.customerPhone,
          message: smsBody,
        }),
      });
      return { status: "sent", result: await response.json() };
    } catch (err) {
      console.error("[SMS Error]:", err);
      return { status: "error", error: String(err) };
    }
  }

  // Demo Mode: Log SMS to console & return inspection preview
  console.log(`[Demo Mode - SMS Dispatch To ${payload.customerPhone}]: "${smsBody}"`);
  return {
    status: "simulated_sent",
    to: payload.customerPhone,
    message: smsBody,
    gateway: "BulkSMSBD / Greenweb (Ready)",
  };
}

/**
 * 3. Order Logging & Google Sheets / Telegram Webhook Dispatch Hook
 */
async function forwardOrderLog(orderId: string, payload: OrderPayload) {
  const orderRecord = {
    orderId,
    timestamp: new Date().toISOString(),
    customerName: payload.customerName,
    customerPhone: payload.customerPhone,
    address: payload.address,
    product: `${payload.selectedProduct.name} (${payload.selectedProduct.pack})`,
    quantity: payload.quantity,
    unitPrice: payload.selectedProduct.unitPrice,
    deliveryCharge: payload.deliveryCharge,
    totalAmount: payload.totalAmount,
    deliveryArea: payload.deliveryArea === "inside_dhaka" ? "ঢাকা সিটির ভেতরে" : "ঢাকা সিটির বাইরে",
    customerNote: payload.customerNote || "N/A",
  };

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderRecord),
      });
      return { status: "synced_sheet", record: orderRecord };
    } catch (err) {
      console.error("[Sheets Sync Error]:", err);
    }
  }

  console.log("[Demo Mode - Order Logged]:", JSON.stringify(orderRecord, null, 2));
  return {
    status: "simulated_logged",
    record: orderRecord,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderPayload = await request.json();

    // 1. Strict BD Phone Validation: 11 digits, starts with 01 and valid operator (013 - 019)
    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (!body.customerPhone || !bdPhoneRegex.test(body.customerPhone.trim())) {
      return NextResponse.json(
        {
          success: false,
          error: "অনুগ্রহ করে একটি সঠিক ১১ ডিজিটের বাংলাদেশী মোবাইল নাম্বার দিন (যেমন: 01712345678)",
        },
        { status: 400 }
      );
    }

    // 2. Validate Customer Name and Address
    if (!body.customerName || body.customerName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "আপনার সঠিক পূর্ণ নাম প্রদান করুন।" },
        { status: 400 }
      );
    }

    if (!body.address || body.address.trim().length < 5) {
      return NextResponse.json(
        {
          success: false,
          error: "অনুগ্রহ করে আপনার সম্পূর্ণ ডেলিভারি ঠিকানা লিখুন (বাসা/রোড/থানা/জেলা)।",
        },
        { status: 400 }
      );
    }

    // 3. Validate Selected Product & Quantity
    if (!body.selectedProduct || !body.selectedProduct.unitPrice) {
      return NextResponse.json(
        { success: false, error: "একটি চা ভ্যারাইটি বা প্যাক নির্বাচন করুন।" },
        { status: 400 }
      );
    }

    const quantity = Math.max(1, Math.floor(body.quantity || 1));
    const deliveryCharge = body.deliveryArea === "inside_dhaka" ? 70 : 130;
    const expectedTotal = body.selectedProduct.unitPrice * quantity + deliveryCharge;

    // Server-side calculated Total integrity
    const finalTotal = expectedTotal;

    // Generate unique artisanal Order ID (e.g., TEA-739201)
    const orderId = `TEA-${Math.floor(100000 + Math.random() * 900000)}`;

    const sanitizedPayload: OrderPayload = {
      ...body,
      customerName: body.customerName.trim(),
      customerPhone: body.customerPhone.trim(),
      address: body.address.trim(),
      quantity,
      deliveryCharge,
      totalAmount: finalTotal,
    };

    // Client metadata
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Mozilla/5.0";

    // 4. Trigger Server Actions asynchronously & gather inspection payload
    const [capiResult, smsResult, sheetResult] = await Promise.all([
      triggerMetaConversionsAPI(orderId, sanitizedPayload, clientIp, userAgent),
      dispatchBanglaSMS(orderId, sanitizedPayload),
      forwardOrderLog(orderId, sanitizedPayload),
    ]);

    return NextResponse.json(
      {
        success: true,
        orderId,
        orderDetails: {
          customerName: sanitizedPayload.customerName,
          customerPhone: sanitizedPayload.customerPhone,
          address: sanitizedPayload.address,
          product: sanitizedPayload.selectedProduct.name,
          pack: sanitizedPayload.selectedProduct.pack,
          unitPrice: sanitizedPayload.selectedProduct.unitPrice,
          quantity: sanitizedPayload.quantity,
          deliveryCharge: sanitizedPayload.deliveryCharge,
          totalAmount: sanitizedPayload.totalAmount,
          deliveryArea:
            sanitizedPayload.deliveryArea === "inside_dhaka"
              ? "ঢাকা সিটির ভেতরে (৳৭০)"
              : "ঢাকা সিটির বাইরে (৳১৩০)",
        },
        triggers: {
          metaCapi: capiResult,
          smsGateway: smsResult,
          sheetSync: sheetResult,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Order API Exception]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "অর্ডার প্রসেস করার সময় সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
      },
      { status: 500 }
    );
  }
}
