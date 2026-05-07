"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const PRICE = 50;
const TRANSACTION_FEE = 4.30;

export default function OofTatatePage() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const total = (PRICE * quantity) + TRANSACTION_FEE;

  const handleBuy = () => {
    const params = new URLSearchParams({
      price: String(PRICE),
      quantity: String(quantity),
      total: total.toFixed(2),
      type: "General Admission",
      section: "GA",
      row: "1",
      seat: "GA",
      venue: "The Tuning Fork",
      city: "Auckland, New Zealand",
      date: "JUN 12",
      day: "Fri",
      time: "7:00 PM",
    });
    router.push(`/checkout/oof-tatata?${params.toString()}`);
  };

  return (
    <div style={{ fontFamily: "system-ui, Arial", background: "#fff", minHeight: "100vh", color: "#111", maxWidth: 600, margin: "0 auto" }}>

      {/* EVENT HEADER */}
      <div style={{ display: "flex", gap: 16, padding: "20px 16px", alignItems: "flex-start" }}>
        <div style={{ width: 110, height: 110, borderRadius: 8, flexShrink: 0, overflow: "hidden" }}>
  <img src="/oof-tatata.jpg" alt="OOF TATATA" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
</div>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900 }}>OOF TATATA</h1>
          <p style={{ margin: "6px 0 0", fontSize: 14, color: "#333" }}>7:00pm, Fri 12 June, 2026</p>
          <p style={{ margin: "4px 0 0", fontSize: 14, color: "#0050d0", fontWeight: 700, textDecoration: "underline", cursor: "pointer" }}>
            The Tuning Fork, Auckland
          </p>
          <span style={{ fontSize: 20, marginTop: 6, display: "block" }}>♿</span>
        </div>
      </div>

      {/* AFTERPAY BANNER */}
      <div style={{ margin: "0 16px 16px", padding: "12px 16px", border: "1px solid #ddd", borderRadius: 8, display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
        <span style={{ fontSize: 14, fontWeight: 700 }}>Pay for this event with</span>
        <div style={{ background: "#b2fce4", padding: "6px 18px", borderRadius: 6, fontWeight: 900, fontSize: 15, color: "#000", letterSpacing: -0.5 }}>
          afterpay↻
        </div>
        <span style={{ fontSize: 18, color: "#888" }}>ⓘ</span>
      </div>

      {/* BUY TICKETS HEADER */}
      <div style={{ background: "#111", color: "white", padding: "14px 16px" }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900, letterSpacing: 1 }}>BUY TICKETS</h2>
      </div>

      {/* TICKET ROW */}
      <div style={{ border: "1px solid #ddd", margin: "10px 16px", borderRadius: 8, padding: "16px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>General Admission</p>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#888" }}>Sales Close: 7:00pm, Fri 12 Jun, 2026</p>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 900 }}>${PRICE}.00</p>
            <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8, border: "1px solid #ccc", borderRadius: 6, padding: "6px 12px" }}>
              <button
                type="button"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", fontWeight: 900, color: "#333", lineHeight: 1, padding: "0 4px" }}
              >
                −
              </button>
              <span style={{ fontSize: 15, fontWeight: 700, minWidth: 24, textAlign: "center" }}>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(q => Math.min(10, q + 1))}
                style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", fontWeight: 900, color: "#333", lineHeight: 1, padding: "0 4px" }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ALL AGES + NOTES */}
      <div style={{ margin: "12px 16px 20px", display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%", background: "#0050d0",
          color: "white", display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, fontSize: 9, fontWeight: 900, textAlign: "center", lineHeight: 1.3
        }}>
          ALL<br />AGES
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 900 }}>THIS IS AN ALL-AGES EVENT</p>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#555", fontStyle: "italic" }}>
            * Total price is in NZD and includes GST and service fees.
          </p>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#555", fontStyle: "italic" }}>
            For this event, a Transaction Fee of ${TRANSACTION_FEE.toFixed(2)} will apply to the total order value of your purchase.
          </p>
        </div>
      </div>

      {/* BUY TICKETS BUTTON */}
      <div style={{ margin: "0 16px 24px" }}>
        <button
          type="button"
          onClick={handleBuy}
          style={{
            width: "100%", padding: "16px", background: "#111",
            color: "white", border: "none", borderRadius: 4,
            fontSize: 16, fontWeight: 900, cursor: "pointer", letterSpacing: 1
          }}
        >
          BUY TICKETS
        </button>
      </div>

      {/* EVENT DETAILS */}
      <div style={{ background: "#111", color: "white", padding: "14px 16px" }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900, letterSpacing: 1 }}>EVENT DETAILS</h2>
      </div>
      <div style={{ padding: "20px 16px 60px" }}>
        <p style={{ fontSize: 15, color: "#333", lineHeight: 1.8, margin: 0 }}>
          OOF TATATA is a high-energy rock band known for electrifying live performances and powerful musicianship. Featuring Jason Momoa alongside Mike Hayes and Kenny Dale, the band blends driving rhythms, raw energy, and strong stage presence to deliver unforgettable shows. With international performances and a growing fanbase, OOF-TA-TA-TA brings a vibe that keeps audiences moving from start to finish.
        </p>
      </div>
    </div>
  );
}
