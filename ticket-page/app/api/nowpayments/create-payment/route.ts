import { NextResponse } from "next/server";

type Body = {
  eventId: string;
  seatId: string;
  section: string;
  row: string;
  type: string;
  total: number;
  email: string;
};

export async function POST(req: Request) {
  try {
    const apiKey = process.env.NOWPAYMENTS_API_KEY;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!apiKey) {
      return NextResponse.json({ error: "NOWPAYMENTS_API_KEY is missing" }, { status: 500 });
    }
    if (!appUrl) {
      return NextResponse.json({ error: "NEXT_PUBLIC_APP_URL is missing" }, { status: 500 });
    }

    const body = (await req.json()) as Body;

    if (!body.eventId || !body.seatId || !body.total || !body.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const orderId = `${body.eventId}-${body.seatId}-${Date.now()}`;

    const payload = {
      price_amount: Number(body.total.toFixed(2)),
      price_currency: "usd",
      order_id: orderId,
      order_description: `Ticket ${body.eventId} Sec ${body.section} Row ${body.row} (${body.type})`,
      success_url: `${appUrl}/ticket/${body.eventId}?seat=${encodeURIComponent(body.seatId)}`,
      cancel_url: `${appUrl}/checkout/${body.eventId}?seat=${encodeURIComponent(body.seatId)}`,
      ipn_callback_url: `${appUrl}/api/nowpayments/ipn`,
    };

    const res = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.message || "NOWPayments request failed", details: data },
        { status: 500 }
      );
    }

    // NOWPayments invoice usually returns invoice_url
    const checkoutUrl = data?.invoice_url || data?.payment_url || null;
    if (!checkoutUrl) {
      return NextResponse.json({ error: "No checkout URL returned", details: data }, { status: 500 });
    }

    return NextResponse.json({ checkoutUrl, raw: data });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown server error" },
      { status: 500 }
    );
  }
}
