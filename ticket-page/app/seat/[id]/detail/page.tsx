"use client";
import React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const TM_BLUE = "#0064d2";
const TM_BLACK = "#0b0b0b";
const TM_TEXT = "#0f172a";
const TM_MUTED = "#6b7280";
const btnReset: React.CSSProperties = { WebkitAppearance: "none", appearance: "none", margin: 0 };

export default function SeatDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const eventId = params?.id;
  const search = useSearchParams();

  const section = search.get("section") ?? "";
  const row = search.get("row") ?? "";
  const type = search.get("type") ?? "";
  const price = parseFloat(search.get("price") ?? "0");
  const seatId = search.get("seatId") ?? "";

  const venue = search.get("venue") ?? "Madison Square Garden";
  const city = search.get("city") ?? "New York, NY";
  const date = search.get("date") ?? "NOV 23";
  const day = search.get("day") ?? "Mon";
  const time = search.get("time") ?? "7:00 PM";
  const venueParams = `venue=${encodeURIComponent(venue)}&city=${encodeURIComponent(city)}&date=${encodeURIComponent(date)}&day=${encodeURIComponent(day)}&time=${encodeURIComponent(time)}`;

  const handleCheckout = () => {
    if (!eventId) return;
    router.push(
      `/checkout/${eventId}?seat=${encodeURIComponent(seatId)}&price=${encodeURIComponent(String(price))}&section=${encodeURIComponent(section)}&row=${encodeURIComponent(row)}&type=${encodeURIComponent(type)}&${venueParams}`
    );
  };

  if (!eventId) return <div style={{ padding: 24 }}>Loading…</div>;

  return (
    <div style={{ fontFamily: 'system-ui, Arial', background: "#f3f4f6", minHeight: "100vh", color: TM_TEXT, paddingBottom: 110 }}>
      <div style={{ background: TM_BLUE, height: 4 }} />
      <div style={{ background: TM_BLACK, color: "white", padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button type="button" onClick={() => router.back()} style={{ ...btnReset, width: 44, height: 44, borderRadius: 10, border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.10)", color: "#ffffff", fontSize: 20, fontWeight: 900, cursor: "pointer" }} aria-label="Back">←</button>
          <div style={{ minWidth: 0 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 950, lineHeight: 1.2 }}>SOMBR - You Are The Reason Tour</h2>
            <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.78)", fontSize: 13, fontWeight: 650 }}>
              {day} • {date}, 2026 • {time} • {venue}, {city}
            </p>
          </div>
        </div>
      </div>

      <div style={{ background: "#e9edf2", padding: 18, display: "flex", justifyContent: "center", borderBottom: "1px solid #d7dde6" }}>
        <svg width="340" height="340" viewBox="0 0 500 500" style={{ display: "block", margin: "0 auto" }}>
  {/* Outer ring - upper sections gray */}
  <ellipse cx="250" cy="260" rx="235" ry="225" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1.5" />
  {/* Middle ring - lower bowl light blue */}
  <ellipse cx="250" cy="260" rx="185" ry="175" fill="#93c5fd" stroke="#60a5fa" strokeWidth="1.5" />
  {/* Inner ring - lower bowl dark blue */}
  <ellipse cx="250" cy="260" rx="140" ry="130" fill="#3b82f6" stroke="#2563eb" strokeWidth="1.5" />
  {/* Floor oval */}
  <ellipse cx="250" cy="270" rx="90" ry="100" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1.5" />

  {/* STAGE */}
  <rect x="205" y="115" width="90" height="50" rx="4" fill="#111827" />
  <text x="250" y="146" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">STAGE</text>
  {/* Stage pole */}
  <rect x="246" y="165" width="8" height="28" fill="#374151" />

  {/* PIT sections */}
  <rect x="185" y="193" width="52" height="35" rx="3" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1" />
  <text x="211" y="215" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">PIT LEFT</text>
  <rect x="263" y="193" width="52" height="35" rx="3" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1" />
  <text x="289" y="215" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">PIT RIGHT</text>

  {/* Floor sections row 1: A B C D E F */}
  {["A","B","C","D","E","F"].map((s, i) => (
    <g key={s}>
      <rect x={172 + i*26} y={233} width="24" height="22" rx="2" fill="#1d4ed8" stroke="#1e40af" strokeWidth="0.8" />
      <text x={184 + i*26} y={248} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{s}</text>
    </g>
  ))}

  {/* Floor sections row 2: G H J K L M */}
  {["G","H","J","K","L","M"].map((s, i) => (
    <g key={s}>
      <rect x={172 + i*26} y={259} width="24" height="22" rx="2" fill="#1d4ed8" stroke="#1e40af" strokeWidth="0.8" />
      <text x={184 + i*26} y={274} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{s}</text>
    </g>
  ))}

  {/* Floor sections row 3: N P */}
  <rect x="210" y="285" width="24" height="22" rx="2" fill="#1d4ed8" stroke="#1e40af" strokeWidth="0.8" />
  <text x="222" y="300" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">N</text>
  <rect x="266" y="285" width="24" height="22" rx="2" fill="#1d4ed8" stroke="#1e40af" strokeWidth="0.8" />
  <text x="278" y="300" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">P</text>

  {/* B STAGE bottom */}
  <rect x="234" y="312" width="32" height="20" rx="3" fill="#111827" />
  <text x="250" y="326" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">B STAGE</text>

  {/* Bottom floor numbers 1 2 3 */}
  {["1","2","3"].map((s, i) => (
    <g key={s}>
      <rect x={210 + i*27} y={335} width="22" height="18" rx="2" fill="#3b82f6" stroke="#2563eb" strokeWidth="0.8" />
      <text x={221 + i*27} y={348} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{s}</text>
    </g>
  ))}

  {/* Lower bowl section numbers - bottom arc 101-136 */}
  {[
    {n:"136",x:196,y:373},{n:"135",x:211,y:382},{n:"101",x:227,y:388},
    {n:"102",x:245,y:392},{n:"103",x:263,y:388},{n:"104",x:279,y:382},{n:"105",x:294,y:373}
  ].map(s => (
    <g key={s.n}>
      <text x={s.x} y={s.y} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{s.n}</text>
    </g>
  ))}

  {/* Lower bowl - left side 125-134 */}
  {[
    {n:"134",x:178,y:358},{n:"133",x:167,y:340},{n:"132",x:160,y:320},
    {n:"131",x:156,y:298},{n:"130",x:157,y:276},{n:"129",x:161,y:255},
    {n:"128",x:168,y:236},{n:"127",x:177,y:218},{n:"126",x:188,y:202},
    {n:"125",x:200,y:188}
  ].map(s => (
    <text key={s.n} x={s.x} y={s.y} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{s.n}</text>
  ))}

  {/* Lower bowl - right side 106-116 */}
  {[
    {n:"106",x:310,y:358},{n:"107",x:322,y:340},{n:"108",x:329,y:320},
    {n:"109",x:333,y:298},{n:"110",x:332,y:276},{n:"111",x:328,y:255},
    {n:"112",x:321,y:236},{n:"113",x:312,y:218},{n:"114",x:301,y:202},
    {n:"115",x:289,y:188}
  ].map(s => (
    <text key={s.n} x={s.x} y={s.y} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{s.n}</text>
  ))}

  {/* Top lower bowl 116-124 */}
  {[
    {n:"116",x:278,y:178},{n:"117",x:264,y:172},{n:"118",x:250,y:170},
    {n:"119",x:236,y:172},{n:"120",x:222,y:178}
  ].map(s => (
    <text key={s.n} x={s.x} y={s.y} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{s.n}</text>
  ))}

  {/* Upper sections - outer ring labels */}
  {[
    {n:"235",x:210,y:468},{n:"236",x:250,y:474},{n:"201",x:290,y:468},
    {n:"234",x:178,y:450},{n:"202",x:322,y:450},
    {n:"233",x:155,y:428},{n:"203",x:345,y:428},
    {n:"232",x:137,y:403},{n:"204",x:363,y:403},
    {n:"231",x:125,y:374},{n:"205",x:375,y:374},
    {n:"230",x:118,y:343},{n:"206",x:382,y:343},
    {n:"229",x:116,y:310},{n:"207",x:384,y:310},
    {n:"228",x:120,y:277},{n:"208",x:380,y:277},
    {n:"227",x:129,y:246},{n:"209",x:371,y:246},
    {n:"226",x:142,y:218},{n:"210",x:358,y:218},
    {n:"225",x:159,y:193},{n:"211",x:341,y:193},
    {n:"224",x:180,y:173},{n:"212",x:320,y:173},
    {n:"223",x:204,y:158},{n:"213",x:296,y:158},
    {n:"222",x:228,y:150},{n:"214",x:272,y:150},
    {n:"221",x:250,y:147}
  ].map(s => (
    <text key={s.n} x={s.x} y={s.y} textAnchor="middle" fill="#374151" fontSize="8" fontWeight="bold">{s.n}</text>
  ))}

  {/* Box section labels */}
  {[
    {n:"BOX 224",x:168,y:183},{n:"BOX 212",x:332,y:183},
    {n:"BOX 226",x:138,y:230},{n:"BOX 210",x:362,y:230},
    {n:"BOX 228",x:124,y:285},{n:"BOX 208",x:376,y:285},
    {n:"BOX 230",x:124,y:338},{n:"BOX 206",x:376,y:338},
    {n:"BOX 232",x:132,y:390},{n:"BOX 204",x:368,y:390},
    {n:"BOX 236",x:250,y:455}
  ].map(s => (
    <text key={s.n} x={s.x} y={s.y} textAnchor="middle" fill="#6b7280" fontSize="6">{s.n}</text>
  ))}
</svg>
      </div>

      <div style={{ background: "#ffffff", margin: "0 0 10px", padding: "18px 16px", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
          <span style={{ fontSize: 22 }}>📍</span>
          <div style={{ minWidth: 0 }}>
            <p style={{ margin: 0, fontWeight: 950, fontSize: 12, color: TM_MUTED, letterSpacing: 0.2 }}>LOCATION</p>
            <p style={{ margin: "6px 0 0", fontWeight: 950, fontSize: 16, color: TM_TEXT, lineHeight: 1.25 }}>
              LOWER BOWL SEATING • Sec {section || "—"} • Row {row || "—"}
            </p>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#555" }}>{venue} • {city}</p>
            <p style={{ margin: "8px 0 0", color: "#4b5563", fontSize: 13, lineHeight: 1.45, fontWeight: 650 }}>
              You&apos;ll get 1 ticket in this row. Tap <strong>Checkout</strong> to continue.
            </p>
            {seatId && <p style={{ margin: "10px 0 0", color: "#6b7280", fontSize: 12, fontWeight: 700 }}>Seat ID: <span style={{ color: "#111827" }}>{seatId}</span></p>}
          </div>
        </div>
        <hr style={{ border: "none", borderTop: "1px solid #e5e7eb" }} />
        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            {type === "HOMEWRECKER VIP PACKAGE" && <span style={{ fontSize: 20 }}>⭐</span>}
            <strong style={{ fontSize: 16, fontWeight: 950 }}>{type || "Ticket"}</strong>
          </div>
          <p style={{ margin: 0, fontWeight: 950, fontSize: 28, letterSpacing: -0.4 }}>${price.toFixed(2)}</p>
          <p style={{ margin: "8px 0 0", fontSize: 12, color: "#4b5563", fontWeight: 650 }}>
            Event ticket limit: 6 / <span style={{ color: TM_BLUE, fontWeight: 900 }}>Full ticket limit info</span>
          </p>
        </div>
        <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "16px 0 12px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <strong style={{ fontSize: 15, fontWeight: 950 }}>SUBTOTAL</strong>
            <p style={{ margin: "4px 0 0", color: "#4b5563", fontSize: 13, fontWeight: 700 }}>1 Ticket</p>
          </div>
          <strong style={{ fontSize: 22, fontWeight: 950 }}>${price.toFixed(2)}</strong>
        </div>
      </div>

      <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, padding: "12px 12px calc(12px + env(safe-area-inset-bottom))", background: "rgba(255,255,255,0.92)", borderTop: "1px solid #e5e7eb", backdropFilter: "blur(8px)" }}>
        <button type="button" onClick={handleCheckout} style={{ ...btnReset, width: "100%", padding: "16px 14px", background: "#16a34a", color: "#ffffff", border: "2px solid #15803d", borderRadius: 12, fontSize: 17, fontWeight: 950, cursor: "pointer", boxShadow: "0 10px 24px rgba(22,163,74,0.25)" }}>
          Checkout
        </button>
        <p style={{ margin: "10px 0 0", textAlign: "center", fontSize: 12, color: "#6b7280", fontWeight: 650 }}>
          Secure checkout • taxes/fees may apply on the next screen
        </p>
      </div>
    </div>
  );
}
