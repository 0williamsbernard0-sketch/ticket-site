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

function money(n: number, nzd = false) {
  if (!Number.isFinite(n)) return nzd ? "NZ$0.00" : "$0.00";
  return nzd ? `NZ$${n.toFixed(2)}` : `$${n.toFixed(2)}`;
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
  const isBruno = eventId === "bruno-mars";
  const isOof = eventId === "oof-tatata";

  const search = useSearchParams();
  const seatId = search.get("seat") ?? "";
  const section = search.get("section") ?? "";
  const row = search.get("row") ?? "";
  const type = search.get("type") ?? "";
  const price = parseFloat(search.get("price") ?? "0");
  const quantity = parseInt(search.get("quantity") ?? "1");

  const venue = search.get("venue") ?? (isBruno ? "MetLife Stadium" : isOof ? "The Tuning Fork" : "Madison Square Garden");
  const city = search.get("city") ?? (isBruno ? "East Rutherford, NJ" : isOof ? "Auckland, New Zealand" : "New York, NY");
  const date = search.get("date") ?? (isBruno ? "AUG 21" : isOof ? "JUN 12" : "NOV 23");
  const day = search.get("day") ?? (isBruno ? "Fri" : isOof ? "Fri" : "Mon");
  const time = search.get("time") ?? "7:00 PM";

  const tourName = isOof
    ? "OOF TATATA"
    : isBruno
    ? "Bruno Mars - The Romantic Tour"
    : "SOMBR - You Are The Reason Tour";

  // OOF TATATA uses pre-calculated total with NZD transaction fee
  const TRANSACTION_FEE = 4.30;
  const oofSubtotal = price * quantity;
  const oofTotal = oofSubtotal + TRANSACTION_FEE;

  const fees = useMemo(() => {
    if (isOof) return TRANSACTION_FEE;
    const pct = Math.min(45, Math.max(5, price * 0.12));
    return Number.isFinite(pct) ? pct : 0;
  }, [price, isOof]);

  const tax = useMemo(() => {
    if (isOof) return 0;
    const t = (price + fees) * 0.08875;
    return Number.isFinite(t) ? t : 0;
  }, [price, fees, isOof]);

  const total = useMemo(() => {
    if (isOof) return oofTotal;
    const t = price + fees + tax;
    return Number.isFinite(t) ? t : 0;
  }, [price, fees, tax, isOof, oofTotal]);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setError(null);
    if (!eventId) { setError("Missing event id in URL."); return; }
    if (!email.trim()) { setError("Please enter your email."); return; }
    if (!agree) { setError("Please accept the terms to continue."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/nowpayments/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          seatId: seatId || "GA",
          section,
          row,
          type,
          total,
          quantity,
          email: email.trim(),
          name: name.trim(),
          phone: phone.trim(),
        }),
      });

      const data = (await res.json()) as { error?: string; checkoutUrl?: string };
      if (!res.ok) throw new Error(data?.error || "Unable to initialize payment.");
      if (!data.checkoutUrl) throw new Error("No checkout URL returned.");
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
    <div style={{ fontFamily: 'system-ui, Arial', background: "#f3f4f6", minHeight: "100vh", color: TM_TEXT, paddingBottom: 150 }}>
      <div style={{ background: TM_BLUE, height: 4 }} />

      {/* HEADER */}
      <div style={{ background: TM_BLACK, color: "white", padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            type="button"
            onClick={() => router.back()}
            style={{ ...btnReset, width: 44, height: 44, borderRadius: 10, border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.10)", color: "#ffffff", fontSize: 20, fontWeight: 900, cursor: "pointer" }}
            aria-label="Back"
          >
            ←
          </button>
          <div style={{ minWidth: 0 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 950, lineHeight: 1.2 }}>Checkout</h2>
            <p style={{ margin: "2px 0 0", color: "rgba(255,255,255,0.9)", fontSize: 14, fontWeight: 800 }}>
              {tourName}
            </p>
            <p style={{ margin: "2px 0 0", color: "rgba(255,255,255,0.65)", fontSize: 12, fontWeight: 600 }}>
              {day} • {date}, 2026 • {time} — {venue}, {city}
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: 16, maxWidth: 560, margin: "0 auto" }}>

        {/* ORDER SUMMARY */}
        <div style={{ background: "#ffffff", borderRadius: 12, padding: 16, border: "1px solid #e5e7eb", boxShadow: "0 8px 24px rgba(15,23,42,0.06)" }}>
          <h3 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 950 }}>Order summary</h3>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div style={{ minWidth: 200, flex: 1 }}>
              <p style={{ margin: 0, fontSize: 12, color: TM_MUTED, fontWeight: 900, letterSpacing: 0.2 }}>TICKET</p>
              {isOof ? (
                <>
                  <p style={{ margin: "8px 0 0", fontSize: 16, fontWeight: 950 }}>General Admission</p>
                  <p style={{ margin: "4px 0 0", fontSize: 14, color: TM_BLUE, fontWeight: 950 }}>Quantity: {quantity}</p>
                  <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280" }}>The Tuning Fork • Auckland</p>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#6b7280" }}>Fri 12 June, 2026 • 7:00 PM</p>
                </>
              ) : (
                <>
                  <p style={{ margin: "8px 0 0", fontSize: 16, fontWeight: 950 }}>
                    Sec {section || "—"} • Row {row || "—"}
                  </p>
                  <p style={{ margin: "8px 0 0", fontSize: 14, color: TM_BLUE, fontWeight: 950 }}>{type || "Ticket"}</p>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#6b7280" }}>{venue} • {city}</p>
                  {seatId && (
                    <p style={{ margin: "8px 0 0", fontSize: 12, color: "#6b7280", fontWeight: 750 }}>
                      Seat ID: <span style={{ color: "#111827", fontWeight: 900 }}>{seatId}</span>
                    </p>
                  )}
                </>
              )}
            </div>
            <div style={{ minWidth: 200, flex: "0 0 auto" }}>
              {isOof ? (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                    <span style={{ fontWeight: 800, color: "#374151" }}>${PRICE.toFixed(2)} × {quantity}</span>
                    <span style={{ fontWeight: 950 }}>{money(oofSubtotal, true)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginTop: 10 }}>
                    <span style={{ fontWeight: 800, color: "#374151" }}>Transaction Fee</span>
                    <span style={{ fontWeight: 950 }}>{money(TRANSACTION_FEE, true)}</span>
                  </div>
                  <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "12px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16 }}>
                    <span style={{ fontWeight: 950 }}>Total (NZD)</span>
                    <span style={{ fontWeight: 950 }}>{money(total, true)}</span>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                    <span style={{ fontWeight: 800, color: "#374151" }}>Ticket</span>
                    <span style={{ fontWeight: 950 }}>{money(price)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginTop: 10 }}>
                    <span style={{ fontWeight: 800, color: "#374151" }}>Fees</span>
                    <span style={{ fontWeight: 950 }}>{money(fees)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginTop: 10 }}>
                    <span style={{ fontWeight: 800, color: "#374151" }}>Tax</span>
                    <span style={{ fontWeight: 950 }}>{money(tax)}</span>
                  </div>
                  <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "12px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16 }}>
                    <span style={{ fontWeight: 950 }}>Total</span>
                    <span style={{ fontWeight: 950 }}>{money(total)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div style={{ height: 12 }} />

        {/* YOUR INFO */}
        <div style={{ background: "#ffffff", borderRadius: 12, padding: 16, border: "1px solid #e5e7eb", boxShadow: "0 8px 24px rgba(15,23,42,0.06)" }}>
          <h3 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 950 }}>Your info</h3>

          <label style={{ display: "block", fontSize: 12, color: TM_MUTED, marginTop: 6, fontWeight: 900 }}>Email (required)</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} inputMode="email" style={inputStyle} placeholder="you@example.com" />

          <label style={{ display: "block", fontSize: 12, color: TM_MUTED, marginTop: 12, fontWeight: 900 }}>Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} placeholder="Your name" />

          <label style={{ display: "block", fontSize: 12, color: TM_MUTED, marginTop: 12, fontWeight: 900 }}>Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" style={inputStyle} placeholder="(555) 555-5555" />

          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 14 }}>
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ marginTop: 4, width: 18, height: 18 }} />
            <p style={{ margin: 0, fontSize: 13, color: "#374151", lineHeight: 1.55, fontWeight: 650 }}>
              I agree to the event terms and understand that tickets are final sale.
            </p>
          </div>

          {error && <p style={{ margin: "12px 0 0", color: "#b91c1c", fontSize: 13, fontWeight: 900 }}>{error}</p>}

          <p style={{ margin: "12px 0 0", fontSize: 12, color: "#6b7280", lineHeight: 1.5, fontWeight: 650 }}>
            You will be redirected to NOWPayments to complete payment.
          </p>
        </div>
      </div>

      {/* PAY BUTTON */}
      <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, padding: "12px 12px calc(12px + env(safe-area-inset-bottom))", background: "rgba(255,255,255,0.92)", borderTop: "1px solid #e5e7eb", backdropFilter: "blur(8px)" }}>
        <button
          type="button"
          onClick={handlePay}
          disabled={loading}
          style={{ ...btnReset, width: "100%", padding: "16px 14px", background: "#16a34a", color: "#ffffff", border: "2px solid #15803d", borderRadius: 12, fontSize: 17, fontWeight: 950, cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 10px 24px rgba(22,163,74,0.25)", opacity: loading ? 0.75 : 1 }}
        >
          {loading ? "Redirecting..." : `Pay ${money(total, isOof)}`}
        </button>
        <p style={{ margin: "10px 0 0", textAlign: "center", fontSize: 12, color: "#6b7280", fontWeight: 650 }}>
          Total due {money(total, isOof)} • Secure checkout
        </p>
      </div>
    </div>
  );
}
