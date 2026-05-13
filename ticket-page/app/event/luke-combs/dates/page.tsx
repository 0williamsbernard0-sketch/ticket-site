"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Tab = "CONCERTS" | "ABOUT" | "REVIEWS";

const LC_DATES_US = [
  { id: "lc-may15", date: "MAY 15", day: "Fri", time: "5:20 PM", city: "Green Bay, WI", venue: "Lambeau Field", note: "My Kinda Saturday Night Tour" },
  { id: "lc-may16", date: "MAY 16", day: "Sat", time: "5:20 PM", city: "Green Bay, WI", venue: "Lambeau Field", note: "My Kinda Saturday Night Tour" },
  { id: "lc-jun09", date: "JUN 09", day: "Tue", time: "7:00 PM", city: "Leesburg, VA", venue: "Tally Ho Theater", note: "Luke Combs UK" },
  { id: "lc-jun11", date: "JUN 11", day: "Thu", time: "8:00 PM", city: "Portland, ME", venue: "State Theatre", note: "Luke Combs UK" },
  { id: "lc-jun12", date: "JUN 12", day: "Fri", time: "9:00 PM", city: "Hampton, NH", venue: "Wally's", note: "Luke Combs UK" },
  { id: "lc-jun13", date: "JUN 13", day: "Sat", time: "8:00 PM", city: "Worcester, MA", venue: "Off The Rails Music Venue", note: "Luke Combs UK" },
  { id: "lc-jun14", date: "JUN 14", day: "Sun", time: "7:00 PM", city: "Albany, NY", venue: "Empire Live", note: "Luke Combs UK" },
  { id: "lc-jun17", date: "JUN 17", day: "Wed", time: "7:00 PM", city: "Asbury Park, NJ", venue: "The Stone Pony", note: "North 2 Shore: Luke Combs UK" },
  { id: "lc-jun18", date: "JUN 18", day: "Thu", time: "7:00 PM", city: "Pawling, NY", venue: "Daryl's House", note: "Luke Combs UK Tribute" },
  { id: "lc-jun19", date: "JUN 19", day: "Fri", time: "7:30 PM", city: "Wantagh, NY", venue: "Mulcahy's", note: "Luke Combs UK Tribute" },
  { id: "lc-jun23", date: "JUN 23", day: "Tue", time: "8:00 PM", city: "Wilmington, DE", venue: "The Queen", note: "Luke Combs UK Tribute" },
  { id: "lc-jun27", date: "JUN 27", day: "Sat", time: "12:00 PM", city: "Nashville, TN", venue: "Nissan Stadium", note: "Alan Jackson Last Call: One More for the Road" },
];

const LC_DATES_INTL = [
  { id: "lc-may14-ire", date: "MAY 14", day: "Thu", time: "8:30 PM", city: "Galway, Ireland", venue: "Roisin Dubh", note: "Luke Combs UK" },
  { id: "lc-may15-bel", date: "MAY 15", day: "Fri", time: "6:30 PM", city: "Belfast, United Kingdom", venue: "The Limelight 1", note: "Belfast Goes Country Tribute" },
  { id: "lc-may16-dub", date: "MAY 16", day: "Sat", time: "6:30 PM", city: "Dublin, Ireland", venue: "The Academy", note: "Dublin Goes Country Tribute" },
  { id: "lc-may22-bri", date: "MAY 22", day: "Fri", time: "7:00 PM", city: "Bristol, United Kingdom", venue: "O2 Academy Bristol", note: "Luke Combs UK Tribute" },
  { id: "lc-may29-can", date: "MAY 29", day: "Fri", time: "5:00 PM", city: "Montreal, QC, Canada", venue: "Parc Jean Drapeau", note: "My Kinda Saturday Night Tour" },
  { id: "lc-may30-can", date: "MAY 30", day: "Sat", time: "5:00 PM", city: "Montreal, QC, Canada", venue: "Parc Jean Drapeau", note: "My Kinda Saturday Night Tour" },
  { id: "lc-jun05-can", date: "JUN 05", day: "Fri", time: "5:20 PM", city: "Toronto, ON, Canada", venue: "Rogers Stadium", note: "My Kinda Saturday Night Tour" },
  { id: "lc-jun06-can", date: "JUN 06", day: "Sat", time: "5:20 PM", city: "Toronto, ON, Canada", venue: "Rogers Stadium", note: "My Kinda Saturday Night Tour" },
  { id: "lc-jun27-bham", date: "JUN 27", day: "Sat", time: "6:30 PM", city: "Birmingham, United Kingdom", venue: "O2 Academy2 Birmingham", note: "The Luke Combs Experience" },
  { id: "lc-jul04-swe", date: "JUL 04", day: "Sat", time: "5:50 PM", city: "Göteborg, Sweden", venue: "Ullevi", note: "My Kinda Saturday Night Tour" },
  { id: "lc-jul07-par", date: "JUL 07", day: "Tue", time: "7:00 PM", city: "Paris, France", venue: "Accor Arena", note: "Luke Combs" },
  { id: "lc-jul11-ams", date: "JUL 11", day: "Sat", time: "6:30 PM", city: "Amsterdam, Netherlands", venue: "Johan Cruijff ArenA", note: "My Kinda Saturday Night Tour" },
  { id: "lc-jul18-ire", date: "JUL 18", day: "Sat", time: "3:00 PM", city: "Co. Meath, Ireland", venue: "Slane Castle", note: "My Kinda Saturday Night Tour" },
  { id: "lc-jul19-ire", date: "JUL 19", day: "Sun", time: "3:00 PM", city: "Co. Meath, Ireland", venue: "Slane Castle", note: "My Kinda Saturday Night Tour" },
  { id: "lc-jul24-edi", date: "JUL 24", day: "Fri", time: "5:00 PM", city: "Edinburgh, United Kingdom", venue: "Scottish Gas Murrayfield", note: "My Kinda Saturday Night Tour" },
  { id: "lc-jul25-edi", date: "JUL 25", day: "Sat", time: "5:00 PM", city: "Edinburgh, United Kingdom", venue: "Scottish Gas Murrayfield", note: "My Kinda Saturday Night Tour" },
  { id: "lc-jul31-lon", date: "JUL 31", day: "Fri", time: "5:00 PM", city: "London, United Kingdom", venue: "Wembley Stadium", note: "My Kinda Saturday Night" },
  { id: "lc-aug01-lon", date: "AUG 01", day: "Sat", time: "5:00 PM", city: "London, United Kingdom", venue: "Wembley Stadium", note: "My Kinda Saturday Night" },
  { id: "lc-aug02-lon", date: "AUG 02", day: "Sun", time: "5:00 PM", city: "London, United Kingdom", venue: "Wembley Stadium", note: "My Kinda Saturday Night" },
  { id: "lc-sep06-nor", date: "SEP 06", day: "Sun", time: "1:30 PM", city: "Norwich, United Kingdom", venue: "Epic Studios", note: "Luke Combs UK Tribute" },
  { id: "lc-sep10-new", date: "SEP 10", day: "Thu", time: "6:30 PM", city: "Newcastle Upon Tyne, United Kingdom", venue: "O2 City Hall Newcastle", note: "Luke Combs UK Tribute" },
  { id: "lc-dec04-liv", date: "DEC 04", day: "Fri", time: "7:00 PM", city: "Liverpool, United Kingdom", venue: "O2 Academy 2 Liverpool", note: "The Luke Combs Experience" },
];

const LC_ABOUT = `Luke Combs is a country artist from Asheville, North Carolina. The singer-songwriter released his debut album, This One's for You, in 2017. His sophomore studio set, What You See Is What You Get, followed in 2019, becoming his first LP to top the Billboard 200. That same year, Combs was nominated for Best New Artist at the Grammy Awards — his first of seven nominations to date.

Combs' third and fourth albums, Growin' Up (2022) and Gettin' Old (2023), were recorded simultaneously and serve as companion projects. For the latter, Combs included a cover of Tracy Chapman's "Fast Car." His countrified take on the 1988 hit single became a bonafide crossover success, peaking at No. 2 on the Billboard Hot 100 and bringing about a rare duet with the reclusive folk singer at the 2024 Grammy Awards.

In 2024, Combs embarked on his Growin' Up and Gettin' Old Tour in support of the dual albums. Now in 2026, the My Kinda Saturday Night Tour takes him to stadiums across the US and internationally, marking the biggest headline run of his career.`;

const LC_REVIEWS = [
  { name: "Brittany H.", date: "May 2025", stars: 5, text: "Luke Combs at Lambeau Field was a dream. He played Fast Car with full emotion and the entire stadium was silent in awe. What a performer." },
  { name: "Ryan C.", date: "Jun 2025", stars: 5, text: "Saw him at Wembley and it was one of the greatest concert experiences of my life. The crowd, the setlist, the sound — everything was perfect." },
  { name: "Ashley P.", date: "Jun 2025", stars: 5, text: "He talked to the crowd like friends, not fans. You could tell he genuinely loves performing. Six Cup of Dirt got everyone on their feet." },
  { name: "Chris M.", date: "Jul 2025", stars: 5, text: "Took my parents (both huge fans) and they cried during Beautiful Crazy. Luke Combs makes the whole stadium feel like a small town show." },
  { name: "Jordan K.", date: "Jul 2025", stars: 4, text: "Incredible show from start to finish. The only small thing was he didn't play Beer Never Broke My Heart, which I was hoping for. Everything else was flawless." },
  { name: "Lindsey T.", date: "Aug 2025", stars: 5, text: "My 10th Luke Combs show and still gets better every time. The My Kinda Saturday Night Tour is his best production. Book your tickets now." },
];

export default function LukeCombsDatesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("CONCERTS");
  const [showIntl, setShowIntl] = useState(false);

  const handleSelect = (event: (typeof LC_DATES_US)[number]) => {
    const p = new URLSearchParams({
      venue: event.venue,
      city: event.city,
      date: event.date,
      day: event.day,
      time: event.time,
    });
    router.push(`/waiting/luke-combs?${p.toString()}`);
  };

  const renderList = (dates: typeof LC_DATES_US) =>
    dates.map((event) => {
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
              <p style={{ margin: "2px 0 6px", fontSize: 13, color: "#92400e", fontWeight: 600 }}>{event.note}</p>
              <button type="button" onClick={(e) => e.stopPropagation()}
                style={{ border: "1px solid #bbb", borderRadius: 20, padding: "6px 14px", fontSize: 13, background: "white", cursor: "pointer", color: "#333" }}>
                Reminders 🔔
              </button>
            </div>
            <button type="button" onClick={(e) => { e.stopPropagation(); handleSelect(event); }}
              style={{ width: 46, height: 46, minWidth: 46, borderRadius: "50%", background: "#92400e", border: "none", color: "white", fontSize: 24, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              ›
            </button>
          </div>
        </div>
      );
    });

  return (
    <div style={{ fontFamily: "Arial", background: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ background: "#92400e", height: 4 }} />

      <div style={{ background: "#111", color: "white", padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 22, cursor: "pointer" }} onClick={() => router.back()}>←</span>
          <div>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: "bold" }}>Luke Combs - My Kinda Saturday Night Tour</h2>
            <p style={{ margin: "4px 0 0", color: "#aaa", fontSize: 13 }}>Select a date to find tickets</p>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", background: "white", borderBottom: "1px solid #ddd" }}>
        {(["CONCERTS", "ABOUT", "REVIEWS"] as Tab[]).map((tab) => (
          <button key={tab} type="button" onClick={() => setActiveTab(tab)}
            style={{ flex: 1, padding: "14px 0", fontSize: 13, fontWeight: "bold", cursor: "pointer", background: "none", border: "none", borderBottom: activeTab === tab ? "3px solid #92400e" : "3px solid transparent", color: activeTab === tab ? "#92400e" : "#888" }}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "CONCERTS" && (
        <div>
          {renderList(LC_DATES_US)}
          <div onClick={() => setShowIntl(!showIntl)} style={{ padding: "16px 20px", background: "#f0f4ff", borderTop: "1px solid #ddd", borderBottom: "1px solid #ddd", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
            <strong style={{ fontSize: 15, color: "#0050d0" }}>🌍 International Concerts</strong>
            <span style={{ fontSize: 18, color: "#0050d0" }}>{showIntl ? "▲" : "▼"}</span>
          </div>
          {showIntl && renderList(LC_DATES_INTL)}
        </div>
      )}

      {activeTab === "ABOUT" && (
        <div style={{ background: "white", margin: 16, borderRadius: 12, padding: 24, boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 20, fontWeight: "bold" }}>About Luke Combs</h2>
          <div style={{ width: 60, height: 4, background: "#92400e", borderRadius: 2, marginBottom: 20 }} />
          {LC_ABOUT.split("\n\n").map((para, i) => (
            <p key={i} style={{ margin: "0 0 16px", fontSize: 15, color: "#333", lineHeight: 1.7 }}>{para}</p>
          ))}
        </div>
      )}

      {activeTab === "REVIEWS" && (
        <div style={{ padding: "16px 16px 40px" }}>
          <div style={{ background: "white", borderRadius: 12, padding: 20, marginBottom: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 32, fontWeight: "bold" }}>5.0</span>
              <div>
                <div style={{ fontSize: 18, color: "#f5a623" }}>★★★★★</div>
                <p style={{ margin: 0, fontSize: 12, color: "#888" }}>Based on {LC_REVIEWS.length} reviews</p>
              </div>
            </div>
          </div>
          {LC_REVIEWS.map((r, i) => (
            <div key={i} style={{ background: "white", borderRadius: 12, padding: 20, marginBottom: 10, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#92400e", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: 15 }}>{r.name[0]}</div>
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
