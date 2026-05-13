"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Tab = "CONCERTS" | "ABOUT" | "REVIEWS";

const MW_DATES = [
  { id: "mw-may15", date: "MAY 15", day: "Fri", time: "5:30 PM", city: "Gainesville, FL", venue: "Ben Hill Griffin Stadium", note: "Still the Problem Tour" },
  { id: "mw-may16", date: "MAY 16", day: "Sat", time: "5:30 PM", city: "Gainesville, FL", venue: "Ben Hill Griffin Stadium", note: "Still the Problem Tour" },
  { id: "mw-may29", date: "MAY 29", day: "Fri", time: "5:30 PM", city: "Denver, CO", venue: "Empower Field At Mile High", note: "Still the Problem Tour" },
  { id: "mw-may30", date: "MAY 30", day: "Sat", time: "5:30 PM", city: "Denver, CO", venue: "Empower Field At Mile High", note: "Still the Problem Tour" },
  { id: "mw-jun05", date: "JUN 05", day: "Fri", time: "5:30 PM", city: "Pittsburgh, PA", venue: "Acrisure Stadium", note: "Still the Problem Tour" },
  { id: "mw-jun06", date: "JUN 06", day: "Sat", time: "5:30 PM", city: "Pittsburgh, PA", venue: "Acrisure Stadium", note: "Still the Problem Tour" },
  { id: "mw-jun19", date: "JUN 19", day: "Fri", time: "5:30 PM", city: "Chicago, IL", venue: "Soldier Field", note: "w/ Brooks and Dunn" },
  { id: "mw-jun20", date: "JUN 20", day: "Sat", time: "5:30 PM", city: "Chicago, IL", venue: "Soldier Field", note: "w/ Ella Langley" },
  { id: "mw-jun26", date: "JUN 26", day: "Fri", time: "5:30 PM", city: "Clemson, SC", venue: "Clemson Memorial Stadium", note: "w/ Brooks and Dunn" },
  { id: "mw-jun27", date: "JUN 27", day: "Sat", time: "5:30 PM", city: "Clemson, SC", venue: "Clemson Memorial Stadium", note: "w/ Ella Langley" },
  { id: "mw-jul17", date: "JUL 17", day: "Fri", time: "5:30 PM", city: "Baltimore, MD", venue: "M&T Bank Stadium", note: "w/ Brooks and Dunn" },
  { id: "mw-jul18", date: "JUL 18", day: "Sat", time: "5:30 PM", city: "Baltimore, MD", venue: "M&T Bank Stadium", note: "w/ Ella Langley" },
  { id: "mw-jul24", date: "JUL 24", day: "Fri", time: "5:30 PM", city: "Ann Arbor, MI", venue: "Michigan Stadium", note: "w/ Thomas Rhett" },
  { id: "mw-jul25", date: "JUL 25", day: "Sat", time: "5:30 PM", city: "Ann Arbor, MI", venue: "Michigan Stadium", note: "w/ Hardy" },
  { id: "mw-jul31", date: "JUL 31", day: "Fri", time: "5:30 PM", city: "Philadelphia, PA", venue: "Lincoln Financial Field", note: "Still the Problem Tour" },
  { id: "mw-aug01", date: "AUG 01", day: "Sat", time: "5:30 PM", city: "Philadelphia, PA", venue: "Lincoln Financial Field", note: "Still the Problem Tour" },
];

const MW_ABOUT = `Morgan Wallen first gained recognition when he completed a stint as a competitor on The Voice in 2014. The Tennessee-born artist continued to refine his sound over the next few years, signing to the indie label Panacea Records and co-writing songs with stars like Jason Aldean. When Wallen's debut studio album If I Know Me arrived in 2018, everything changed — the album debuted in the Top 10 on the Billboard 200, and propelled him to country stardom.

Since then, Wallen's whiskey-soaked anthems and emotional ballads (including the Billboard Hot 100 No. 1 hit "Last Night") have dominated the charts, and earned him more than 170 weeks atop the Billboard Top Country Albums chart, the most in country music history. Wallen's multi-platinum second album Dangerous: The Double Album (2021) became the longest-running Top 10 album for a solo artist in Billboard 200 history and was named Billboard's No. 1 album of the 21st Century.

Dubbed the "biggest country star in the world" by Billboard magazine, Wallen released his record-breaking third album One Thing at a Time in March 2023. His fourth studio album, I'm The Problem, was released in May 2025 and achieved two No. 1 singles on the Hot Country Songs chart.`;

const MW_REVIEWS = [
  { name: "Jake T.", date: "May 2025", stars: 5, text: "Morgan Wallen puts on the greatest stadium show in country music, period. He played nearly 3 hours and the crowd never sat down. Absolute spectacle." },
  { name: "Carrie M.", date: "May 2025", stars: 5, text: "Flew in from out of state and worth every penny. He sounds better live than on record, if that's even possible. Brooks and Dunn opening was a dream." },
  { name: "Tyler B.", date: "Jun 2025", stars: 5, text: "First Morgan Wallen concert and I'm already looking at next tour dates. Pyrotechnics, confetti, two and a half hours straight. Unforgettable." },
  { name: "Amanda R.", date: "Jun 2025", stars: 5, text: "When he played Last Night the entire stadium erupted. Best live performance of a country song I have ever seen. Generational talent." },
  { name: "Derek S.", date: "Jul 2025", stars: 4, text: "Amazing night. Only 4 stars because parking was chaos. Morgan himself was 10 out of 10. Still the Problem Tour is the best production he's ever done." },
  { name: "Sarah W.", date: "Jul 2025", stars: 5, text: "Third Morgan Wallen show and each one is better than the last. If you have tickets, you are in for the night of your life." },
];

export default function MorganWallenDatesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("CONCERTS");

  const handleSelect = (event: (typeof MW_DATES)[number]) => {
    const p = new URLSearchParams({
      venue: event.venue,
      city: event.city,
      date: event.date,
      day: event.day,
      time: event.time,
    });
    router.push(`/waiting/morgan-wallen?${p.toString()}`);
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ background: "#d97706", height: 4 }} />

      {/* HEADER */}
      <div style={{ background: "#111", color: "white", padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 22, cursor: "pointer" }} onClick={() => router.back()}>←</span>
          <div>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: "bold" }}>Morgan Wallen: Still the Problem Tour</h2>
            <p style={{ margin: "4px 0 0", color: "#aaa", fontSize: 13 }}>Select a date to find tickets</p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", background: "white", borderBottom: "1px solid #ddd" }}>
        {(["CONCERTS", "ABOUT", "REVIEWS"] as Tab[]).map((tab) => (
          <button key={tab} type="button" onClick={() => setActiveTab(tab)}
            style={{ flex: 1, padding: "14px 0", fontSize: 13, fontWeight: "bold", cursor: "pointer", background: "none", border: "none", borderBottom: activeTab === tab ? "3px solid #d97706" : "3px solid transparent", color: activeTab === tab ? "#d97706" : "#888" }}>
            {tab}
          </button>
        ))}
      </div>

      {/* CONCERTS */}
      {activeTab === "CONCERTS" && (
        <div>
          {MW_DATES.map((event) => {
            const [month, day] = event.date.split(" ");
            return (
              <div key={event.id} style={{ borderBottom: "1px solid #e0e0e0", padding: "16px 20px", background: "white", marginBottom: 2, cursor: "pointer" }}
                onClick={() => handleSelect(event)}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 56, minWidth: 56, textAlign: "center", border: "1px solid #ddd", borderRadius: 6, padding: "8px 0", background: "#fafafa" }}>
                    <p style={{ margin: 0, fontSize: 11, color: "#888", fontWeight: "bold" }}>{month}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 24, fontWeight: "bold", lineHeight: 1 }}>{day}</p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 13, color: "#666" }}>{event.day} • {event.time}</p>
                    <p style={{ margin: "3px 0 0", fontSize: 16, fontWeight: "bold", color: "#111" }}>{event.city}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 14, fontWeight: 600, color: "#333" }}>{event.venue}</p>
                    <p style={{ margin: "2px 0 6px", fontSize: 13, color: "#d97706", fontWeight: 600 }}>{event.note}</p>
                    <button type="button" onClick={(e) => e.stopPropagation()}
                      style={{ border: "1px solid #bbb", borderRadius: 20, padding: "6px 14px", fontSize: 13, background: "white", cursor: "pointer", color: "#333" }}>
                      Reminders 🔔
                    </button>
                  </div>
                  <button type="button" onClick={(e) => { e.stopPropagation(); handleSelect(event); }}
                    style={{ width: 46, height: 46, minWidth: 46, borderRadius: "50%", background: "#d97706", border: "none", color: "white", fontSize: 24, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    ›
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ABOUT */}
      {activeTab === "ABOUT" && (
        <div style={{ background: "white", margin: 16, borderRadius: 12, padding: 24, boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 20, fontWeight: "bold" }}>About Morgan Wallen</h2>
          <div style={{ width: 60, height: 4, background: "#d97706", borderRadius: 2, marginBottom: 20 }} />
          {MW_ABOUT.split("\n\n").map((para, i) => (
            <p key={i} style={{ margin: "0 0 16px", fontSize: 15, color: "#333", lineHeight: 1.7 }}>{para}</p>
          ))}
        </div>
      )}

      {/* REVIEWS */}
      {activeTab === "REVIEWS" && (
        <div style={{ padding: "16px 16px 40px" }}>
          <div style={{ background: "white", borderRadius: 12, padding: 20, marginBottom: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 32, fontWeight: "bold" }}>5.0</span>
              <div>
                <div style={{ fontSize: 18, color: "#f5a623" }}>★★★★★</div>
                <p style={{ margin: 0, fontSize: 12, color: "#888" }}>Based on {MW_REVIEWS.length} reviews</p>
              </div>
            </div>
          </div>
          {MW_REVIEWS.map((r, i) => (
            <div key={i} style={{ background: "white", borderRadius: 12, padding: 20, marginBottom: 10, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#d97706", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: 15 }}>{r.name[0]}</div>
                  <div>
                    <p style={{ margin: 0, fontWeight: "bold", fontSize: 14 }}>{r.name}</p>
                    <p style={{ margin: 0, fontSize: 12, color: "#999" }}>{r.date}</p>
                  </div>
                </div>
                <div style={{ color: "#f5a623", fontSize: 15 }}>{"★".repeat(r.stars)}</div>
              </div>
              <p style={{ margin: 0, fontSize: 14, color: "#444", lineHeight: 1.6 }}>{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
