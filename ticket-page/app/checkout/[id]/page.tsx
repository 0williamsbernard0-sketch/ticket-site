"use client";

import React, { useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const TM_BLUE = "#0064d2";
const TM_BLACK = "#0b0b0b";
const TM_TEXT = "#0f172a";
const TM_MUTED = "#6b7280";

const btnReset: React.CSSProperties = {
  WebkitAppearance: "none",
  appearance: "none",
  margin: 0,
};

function money(n: number) {
  if (!Number.isFinite(n)) return "$0.00";
  return `$${n.toFixed(2)}`;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 12px",
  borderRadius: 10,
  border: "1px solid #cbd5e1",
  fontSize: 15,
  marginTop: 8,
  outline: "none",
  color: TM_TEXT,
  background: "#ffffff",
  fontWeight: 650,
};

export default function CheckoutPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const eventId = params?.id;

  const search = useSearchParams();
  const seatId = search.get("seat") ?? "";
  const section = search.get("section") ?? "";
  const row = search.get("row") ?? "";
  const type = search.get("type") ?? "";
  const price = parseFloat(search.get("price") ?? "0");

  const fees = useMemo(() => {
    const pct = Math.min(45, Math.max(5, price * 0.12));
    return Number.isFinite(pct) ? pct : 0;
  }, [price]);

  const tax = useMemo(() => {
    const t = (price + fees) * 0.08875;
    return Number.isFinite(t) ? t : 0;
  }, [price, fees]);

  const total = useMemo(() => {
    const t = price + fees + tax;
    return Number.isFinite(t) ? t : 0;
  }, [price, fees, tax]);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setError(null);

    if (!eventId) {
      setError("Missing event id in URL.");
      return;
    }
    if (!seatId) {
      setError("Missing seat selection. Go back and select a seat.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!agree) {
      setError("Please accept the terms to continue.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/nowpayments/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          seatId,
          section,
          row,
          type,
          total,
          email: email.trim(),
          name: name.trim(),
          phone: phone.trim(),
        }),
      });

      const data = (await res.json()) as { error?: string; checkoutUrl?: string };

      if (!res.ok) {
        throw new Error(data?.error || "Unable to initialize payment.");
      }
      if (!data.checkoutUrl) {
        throw new Error("No checkout URL returned.");
      }

      window.location.href = data.checkoutUrl;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Payment initialization failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!eventId) {
    return (
      <div style={{ fontFamily: "system-ui, Arial", background: "#f3f4f6", minHeight: "100vh" }}>
        <div style={{ background: TM_BLUE, height: 4 }} />
        <div style={{ padding: 24, color: TM_TEXT, fontWeight: 900 }}>Loading…</div>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
        background: "#f3f4f6",
        minHeight: "100vh",
        color: TM_TEXT,
        paddingBottom: 150,
      }}
    >
      <div style={{ background: TM_BLUE, height: 4 }} />

      <div style={{ background: TM_BLACK, color: "white", padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            type="button"
            onClick={() => router.back()}
            style={{
              ...btnReset,
              width: 44,
              height: 44,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.25)",
              background: "rgba(255,255,255,0.10)",
              color: "#ffffff",
              fontSize: 20,
              fontWeight: 900,
              cursor: "pointer",
              lineHeight: 1,
            }}
            aria-label="Back"
          >
            ←
          </button>
          <div style={{ minWidth: 0 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 950, lineHeight: 1.2 }}>Checkout</h2>
            <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.78)", fontSize: 13, fontWeight: 650 }}>
              SOMBR - You Are The Reason Tour
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: 16, maxWidth: 560, margin: "0 auto" }}>
        <div
          style={{
            background: "#ffffff",
            borderRadius: 12,
            padding: 16,
            border: "1px solid #e5e7eb",
            boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
          }}
        >
          <h3 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 950 }}>Order summary</h3>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div style={{ minWidth: 220, flex: 1 }}>
              <p style={{ margin: 0, fontSize: 12, color: TM_MUTED, fontWeight: 900, letterSpacing: 0.2 }}>SEAT</p>
              <p style={{ margin: "8px 0 0", fontSize: 16, fontWeight: 950, lineHeight: 1.25 }}>
                Sec {section || "—"} • Row {row || "—"}
              </p>
              <p style={{ margin: "8px 0 0", fontSize: 14, color: TM_BLUE, fontWeight: 950 }}>{type || "Ticket"}</p>
              <p style={{ margin: "10px 0 0", fontSize: 12, color: "#6b7280", fontWeight: 750 }}>
                Seat ID: <span style={{ color: "#111827", fontWeight: 900 }}>{seatId || "—"}</span>
              </p>
            </div>
            <div style={{ minWidth: 200, flex: "0 0 auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: TM_TEXT }}>
                <span style={{ fontWeight: 800, color: "#374151" }}>Ticket</span>
                <span style={{ fontWeight: 950 }}>{money(price)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: TM_TEXT, marginTop: 10 }}>
                <span style={{ fontWeight: 800, color: "#374151" }}>Fees</span>
                <span style={{ fontWeight: 950 }}>{money(fees)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: TM_TEXT, marginTop: 10 }}>
                <span style={{ fontWeight: 800, color: "#374151" }}>Tax</span>
                <span style={{ fontWeight: 950 }}>{money(tax)}</span>
              </div>
              <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "12px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, color: TM_TEXT }}>
                <span style={{ fontWeight: 950 }}>Total</span>
                <span style={{ fontWeight: 950 }}>{money(total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 12 }} />

        <div
          style={{
            background: "#ffffff",
            borderRadius: 12,
            padding: 16,
            border: "1px solid #e5e7eb",
            boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
          }}
        >
          <h3 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 950 }}>Your info</h3>

          <label style={{ display: "block", fontSize: 12, color: TM_MUTED, marginTop: 6, fontWeight: 900 }}>
            Email (required)
          </label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} inputMode="email" style={inputStyle} placeholder="you@example.com" />

          <label style={{ display: "block", fontSize: 12, color: TM_MUTED, marginTop: 12, fontWeight: 900 }}>
            Full name
          </label>
          <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} placeholder="Your name" />

          <label style={{ display: "block", fontSize: 12, color: TM_MUTED, marginTop: 12, fontWeight: 900 }}>
            Phone
          </label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" style={inputStyle} placeholder="(555) 555-5555" />

          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 14 }}>
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ marginTop: 4, width: 18, height: 18 }} />
            <p style={{ margin: 0, fontSize: 13, color: "#374151", lineHeight: 1.55, fontWeight: 650 }}>
              I agree to the event terms and understand that tickets are final sale.
            </p>
          </div>

          {error && (
            <p style={{ margin: "12px 0 0", color: "#b91c1c", fontSize: 13, fontWeight: 900 }}>
              {error}
            </p>
          )}

          <p style={{ margin: "12px 0 0", fontSize: 12, color: "#6b7280", lineHeight: 1.5, fontWeight: 650 }}>
            You will be redirected to NOWPayments to complete payment.
          </p>
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "12px 12px calc(12px + env(safe-area-inset-bottom))",
          background: "rgba(255,255,255,0.92)",
          borderTop: "1px solid #e5e7eb",
          backdropFilter: "blur(8px)",
        }}
      >
        <button
          type="button"
          onClick={handlePay}
          disabled={loading}
          style={{
            ...btnReset,
            width: "100%",
            padding: "16px 14px",
            background: "#16a34a",
            color: "#ffffff",
            border: "2px solid #15803d",
            borderRadius: 12,
            fontSize: 17,
            fontWeight: 950,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 10px 24px rgba(22, 163, 74, 0.25)",
            opacity: loading ? 0.75 : 1,
          }}
        >
          {loading ? "Redirecting..." : `Pay ${money(total)}`}
        </button>
        <p style={{ margin: "10px 0 0", textAlign: "center", fontSize: 12, color: "#6b7280", fontWeight: 650 }}>
          Total due {money(total)} • Secure checkout
        </p>
      </div>
    </div>
  );
}