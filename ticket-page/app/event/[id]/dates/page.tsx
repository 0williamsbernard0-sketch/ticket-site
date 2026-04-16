"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TOUR_DATES = [
  { id: "sombr-nyc", date: "NOV 23", day: "Mon", time: "7:00 PM", city: "New York, NY", venue: "Madison Square Garden" },
  { id: "sombr-seattle", date: "OCT 01", day: "Thu", time: "7:00 PM", city: "Seattle, WA", venue: "Climate Pledge Arena" },
  { id: "sombr-portland", date: "OCT 02", day: "Fri", time: "7:30 PM", city: "Portland, OR", venue: "Moda Center" },
  { id: "sombr-sacramento", date: "OCT 06", day: "Tue", time: "7:30 PM", city: "Sacramento, CA", venue: "Golden 1 Center" },
  { id: "sombr-sanjose", date: "OCT 07", day: "Wed", time: "7:00 PM", city: "San Jose, CA", venue: "SAP Center at San Jose" },
  { id: "sombr-anaheim", date: "OCT 09", day: "Fri", time: "7:30 PM", city: "Anaheim, CA", venue: "Honda Center" },
  { id: "sombr-inglewood", date: "OCT 10", day: "Sat", time: "7:00 PM", city: "Inglewood, CA", venue: "Kia Forum" },
  { id: "sombr-dallas", date: "OCT 18", day: "Sun", time: "7:30 PM", city: "Dallas, TX", venue: "American Airlines Center" },
  { id: "sombr-austin", date: "OCT 20", day: "Tue", time: "7:00 PM", city: "Austin, TX", venue: "Moody Center ATX" },
  { id: "sombr-atlanta", date: "OCT 22", day: "Thu", time: "7:00 PM", city: "Atlanta, GA", venue: "State Farm Arena" },
  { id: "sombr-orlando", date: "OCT 25", day: "Sun", time: "7:00 PM", city: "Orlando, FL", venue: "Kia Center" },
  { id: "sombr-charlotte", date: "OCT 27", day: "Tue", time: "7:30 PM", city: "Charlotte, NC", venue: "Spectrum Center" },
  { id: "sombr-nashville", date: "OCT 28", day: "Wed", time: "7:00 PM", city: "Nashville, TN", venue: "Bridgestone Arena" },
  { id: "sombr-stlouis", date: "OCT 30", day: "Fri", time: "7:00 PM", city: "Saint Louis, MO", venue: "Enterprise Center" },
  { id: "sombr-kansascity", date: "OCT 31", day: "Sat", time: "7:00 PM", city: "Kansas City, MO", venue: "T-Mobile Center" },
  { id: "sombr-minneapolis", date: "NOV 01", day: "Sun", time: "7:00 PM", city: "Minneapolis, MN", venue: "Target Center" },
  { id: "sombr-milwaukee", date: "NOV 03", day: "Tue", time: "7:00 PM", city: "Milwaukee, WI", venue: "Fiserv Forum" },
];

const REVIEWS = [
  { name: "Jordan M.", date: "Feb 2026", stars: 5, text: "Absolutely incredible show. sombr's voice is even better live — the whole arena was singing every word. One of the best concerts I've ever been to." },
  { name: "Priya K.", date: "Feb 2026", stars: 5, text: "I've been a fan since his bedroom recordings and seeing him sell out arenas is surreal. The production was stunning and he performed for over 2 hours non-stop." },
  { name: "Marcus T.", date: "Feb 2026", stars: 5, text: "Brought my girlfriend and she cried three times. The setlist was perfect — all the hits plus some deep cuts. 100% worth every penny." },
  { name: "Sofia R.", date: "Feb 2026", stars: 4, text: "Amazing energy from start to finish. The only reason it's not 5 stars is the merch line was insane. The music itself was flawless." },
  { name: "Derek L.", date: "Apr 2026", stars: 5, text: "sombr shut the whole arena DOWN. The lighting, the sound, the vibe — everything was perfect. Already bought tickets for the next tour." },
  { name: "Aisha W.", date: "Apr 2026", stars: 5, text: "This was my third sombr show and each one gets better. He has a gift for making 20,000 people feel like he's singing just to them." },
];

type Tab = "CONCERTS" | "ABOUT" | "REVIEWS";

export default function TourDatesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("CONCERTS");

  const handleSelect = (event: (typeof TOUR_DATES)[0]) => {
    const params = new URLSearchParams({
      venue: event.venue,
      city: event.city,
      date: event.date,
      day: event.day,
      time: event.time,
    });
    router.push(`/waiting/sombr?${params.toString()}`);
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#f5f5f5", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{ background: "#0050d0", height: 4 }} />
      <div style={{ background: "#111", color: "white", padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{ fontSize: 22, cursor: "pointer", padding: "4px 8px" }}
            onClick={() => router.back()}
          >
            ←
          </span>
          <div>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: "bold" }}>SOMBR - You Are The Reason Tour</h2>
            <p style={{ margin: "4px 0 0", color: "#aaa", fontSize: 13 }}>Select a date to find tickets</p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", background: "white", borderBottom: "1px solid #ddd" }}>
        {(["CONCERTS", "ABOUT", "REVIEWS"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: "14px 0",
              fontSize: 13,
              fontWeight: "bold",
              cursor: "pointer",
              background: "none",
              border: "none",
              borderBottom: activeTab === tab ? "3px solid #0050d0" : "3px solid transparent",
              color: activeTab === tab ? "#0050d0" : "#888",
              transition: "all 0.2s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONCERTS TAB */}
      {activeTab === "CONCERTS" && (
        <div>
          {TOUR_DATES.map((event) => {
            const parts = event.date.split(" ");
            const month = parts[0];
            const day = parts[1];
            return (
              <div
                key={event.id}
                style={{ borderBottom: "1px solid #e0e0e0", padding: "16px 20px", background: "white", marginBottom: 2 }}
              >
                <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: "bold", color: "#7b2fbe", letterSpacing: 0.5 }}>
                  PRESALE HAPPENING NOW
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>

                  {/* DATE BOX */}
                  <div style={{
                    width: 56, minWidth: 56, textAlign: "center",
                    border: "1px solid #ddd", borderRadius: 6,
                    padding: "8px 0", background: "#fafafa"
                  }}>
                    <p style={{ margin: 0, fontSize: 11, color: "#888", fontWeight: "bold", textTransform: "uppercase" }}>{month}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 24, fontWeight: "bold", lineHeight: 1 }}>{day}</p>
                  </div>

                  {/* INFO */}
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 13, color: "#666" }}>{event.day} • {event.time}</p>
                    <p style={{ margin: "3px 0 0", fontSize: 16, fontWeight: "bold", color: "#111" }}>{event.city}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 14, fontWeight: "600", color: "#333" }}>{event.venue}</p>
                    <p style={{ margin: "2px 0 6px", fontSize: 13, color: "#999" }}>SOMBR - You Are The Reason Tour</p>
                    <button style={{
                      border: "1px solid #bbb", borderRadius: 20,
                      padding: "6px 14px", fontSize: 13,
                      background: "white", cursor: "pointer",
                      color: "#333", fontWeight: "500",
                      display: "inline-flex", alignItems: "center", gap: 6
                    }}>
                      Reminders 🔔
                    </button>
                  </div>

                  {/* ARROW BUTTON */}
                  <button
                    onClick={() => handleSelect(event)}
                    style={{
                      width: 46, height: 46, minWidth: 46, borderRadius: "50%",
                      background: "#0050d0", border: "none",
                      color: "white", fontSize: 24, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 2px 8px rgba(0,80,208,0.3)",
                    }}
                  >
                    ›
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ABOUT TAB */}
      {activeTab === "ABOUT" && (
        <div style={{ background: "white", margin: 16, borderRadius: 12, padding: 24, boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 20, fontWeight: "bold" }}>About sombr</h2>
          <div style={{ width: 60, height: 4, background: "#0050d0", borderRadius: 2, marginBottom: 20 }} />
          <p style={{ margin: "0 0 16px", fontSize: 15, color: "#333", lineHeight: 1.7 }}>
            At the young age of 14, Shane embarked on a remarkable journey that would shape his future as an artist known as sombr. Armed with determination and fueled by a summer of scooping ice cream, he transformed his bedroom into a makeshift recording studio.
          </p>
          <p style={{ margin: "0 0 16px", fontSize: 15, color: "#333", lineHeight: 1.7 }}>
            The now 18-year-old's passion for music flourished during his time at New York's prestigious LaGuardia High, a renowned public performing arts school that inspired the iconic film <em>Fame</em>. Immersed in the study of classical music by day and devoted to his bedroom studio at night, he diligently honed his skills.
          </p>
          <p style={{ margin: 0, fontSize: 15, color: "#333", lineHeight: 1.7 }}>
            sombr's creative vision extends far beyond recording romantic indie-rock melodies. He possesses an entrepreneurial spirit that led him to establish his own label and actively seek out likeminded musicians to sign. When the world was plunged into the depths of the COVID-19 pandemic, music became an oasis for this young artist, providing solace and escape from physical and social isolation. It was during this period that sombr took the bold step of launching his own major label imprint.
          </p>
        </div>
      )}

      {/* REVIEWS TAB */}
      {activeTab === "REVIEWS" && (
        <div style={{ padding: "16px 16px 40px" }}>
          <div style={{ background: "white", borderRadius: 12, padding: "20px 20px 8px", marginBottom: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 32, fontWeight: "bold", color: "#111" }}>5.0</span>
              <div>
                <div style={{ fontSize: 18, color: "#f5a623" }}>★★★★★</div>
                <p style={{ margin: 0, fontSize: 12, color: "#888" }}>Based on {REVIEWS.length} reviews</p>
              </div>
            </div>
          </div>

          {REVIEWS.map((review, i) => (
            <div
              key={i}
              style={{
                background: "white", borderRadius: 12, padding: 20,
                marginBottom: 10, boxShadow: "0 1px 6px rgba(0,0,0,0.06)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: "50%",
                    background: "#0050d0", color: "white",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: "bold", fontSize: 15
                  }}>
                    {review.name[0]}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: "bold", fontSize: 14 }}>{review.name}</p>
                    <p style={{ margin: 0, fontSize: 12, color: "#999" }}>{review.date}</p>
                  </div>
                </div>
                <div style={{ color: "#f5a623", fontSize: 15 }}>
                  {"★".repeat(review.stars)}
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 14, color: "#444", lineHeight: 1.6 }}>{review.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
