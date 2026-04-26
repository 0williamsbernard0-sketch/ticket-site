"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

// ─── SOMBR DATA ───────────────────────────────────────────────────────────────

const SOMBR_DATES = [
  // ── International ──
  { id: "sombr-mexico", date: "JUL 22", day: "Wed", time: "9:00 PM", city: "México, CDMX, Mexico", venue: "Pepsi Center" },
  // ── Summer ──
  { id: "sombr-redrocks1", date: "JUL 26", day: "Sun", time: "7:00 PM", city: "Morrison, CO", venue: "Red Rocks Amphitheatre" },
  { id: "sombr-redrocks2", date: "JUL 27", day: "Mon", time: "7:30 PM", city: "Morrison, CO", venue: "Red Rocks Amphitheatre" },
  { id: "sombr-lolla", date: "JUL 30", day: "Thu", time: "11:00 AM", city: "Chicago, IL", venue: "Grant Park – Lollapalooza" },
  // ── Fall Tour ──
  { id: "sombr-seattle", date: "OCT 01", day: "Thu", time: "7:00 PM", city: "Seattle, WA", venue: "Climate Pledge Arena" },
  { id: "sombr-portland", date: "OCT 02", day: "Fri", time: "7:30 PM", city: "Portland, OR", venue: "Moda Center" },
  { id: "sombr-sacramento", date: "OCT 06", day: "Tue", time: "7:30 PM", city: "Sacramento, CA", venue: "Golden 1 Center" },
  { id: "sombr-sanjose", date: "OCT 07", day: "Wed", time: "7:00 PM", city: "San Jose, CA", venue: "SAP Center at San Jose" },
  { id: "sombr-anaheim", date: "OCT 09", day: "Fri", time: "7:30 PM", city: "Anaheim, CA", venue: "Honda Center" },
  { id: "sombr-inglewood", date: "OCT 10", day: "Sat", time: "7:00 PM", city: "Inglewood, CA", venue: "Kia Forum" },
  { id: "sombr-okc", date: "OCT 16", day: "Fri", time: "7:30 PM", city: "Oklahoma City, OK", venue: "Paycom Center" },
  { id: "sombr-houston", date: "OCT 17", day: "Sat", time: "7:00 PM", city: "Houston, TX", venue: "Toyota Center" },
  { id: "sombr-dallas", date: "OCT 18", day: "Sun", time: "7:30 PM", city: "Dallas, TX", venue: "American Airlines Center" },
  { id: "sombr-austin", date: "OCT 20", day: "Tue", time: "7:00 PM", city: "Austin, TX", venue: "Moody Center ATX" },
  { id: "sombr-atlanta", date: "OCT 22", day: "Thu", time: "7:00 PM", city: "Atlanta, GA", venue: "State Farm Arena" },
  { id: "sombr-sunrise", date: "OCT 24", day: "Sat", time: "7:00 PM", city: "Sunrise, FL", venue: "Amerant Bank Arena" },
  { id: "sombr-orlando", date: "OCT 25", day: "Sun", time: "7:00 PM", city: "Orlando, FL", venue: "Kia Center" },
  { id: "sombr-charlotte", date: "OCT 27", day: "Tue", time: "7:30 PM", city: "Charlotte, NC", venue: "Spectrum Center" },
  { id: "sombr-nashville", date: "OCT 28", day: "Wed", time: "7:00 PM", city: "Nashville, TN", venue: "Bridgestone Arena" },
  { id: "sombr-stlouis", date: "OCT 30", day: "Fri", time: "7:00 PM", city: "Saint Louis, MO", venue: "Enterprise Center" },
  { id: "sombr-kansascity", date: "OCT 31", day: "Sat", time: "7:00 PM", city: "Kansas City, MO", venue: "T-Mobile Center" },
  { id: "sombr-minneapolis", date: "NOV 01", day: "Sun", time: "7:00 PM", city: "Minneapolis, MN", venue: "Target Center" },
  { id: "sombr-milwaukee", date: "NOV 03", day: "Tue", time: "7:00 PM", city: "Milwaukee, WI", venue: "Fiserv Forum" },
  { id: "sombr-chicago", date: "NOV 04", day: "Wed", time: "7:00 PM", city: "Chicago, IL", venue: "United Center" },
  { id: "sombr-indianapolis", date: "NOV 06", day: "Fri", time: "7:00 PM", city: "Indianapolis, IN", venue: "Gainbridge Fieldhouse" },
  { id: "sombr-detroit", date: "NOV 07", day: "Sat", time: "7:00 PM", city: "Detroit, MI", venue: "Little Caesars Arena" },
  { id: "sombr-columbus", date: "NOV 08", day: "Sun", time: "7:00 PM", city: "Columbus, OH", venue: "Nationwide Arena" },
  { id: "sombr-dc", date: "NOV 10", day: "Tue", time: "7:00 PM", city: "Washington, DC", venue: "Capital One Arena" },
  { id: "sombr-pittsburgh", date: "NOV 12", day: "Thu", time: "7:00 PM", city: "Pittsburgh, PA", venue: "PPG Paints Arena" },
  { id: "sombr-cleveland", date: "NOV 13", day: "Fri", time: "7:00 PM", city: "Cleveland, OH", venue: "Rocket Arena" },
  { id: "sombr-buffalo", date: "NOV 14", day: "Sat", time: "7:00 PM", city: "Buffalo, NY", venue: "KeyBank Center" },
  { id: "sombr-boston", date: "NOV 18", day: "Wed", time: "7:00 PM", city: "Boston, MA", venue: "TD Garden" },
  { id: "sombr-philly", date: "NOV 19", day: "Thu", time: "7:00 PM", city: "Philadelphia, PA", venue: "Xfinity Mobile Arena" },
  { id: "sombr-newark", date: "NOV 21", day: "Sat", time: "7:00 PM", city: "Newark, NJ", venue: "Prudential Center" },
  { id: "sombr-nyc1", date: "NOV 23", day: "Mon", time: "7:00 PM", city: "New York, NY", venue: "Madison Square Garden" },
  { id: "sombr-nyc2", date: "NOV 24", day: "Tue", time: "7:00 PM", city: "New York, NY", venue: "Madison Square Garden" },
];

const SOMBR_ABOUT = `At the young age of 14, Shane embarked on a remarkable journey that would shape his future as an artist known as sombr. Armed with determination and fueled by a summer of scooping ice cream, he transformed his bedroom into a makeshift recording studio.

The now 18-year-old's passion for music flourished during his time at New York's prestigious LaGuardia High, a renowned public performing arts school that inspired the iconic film Fame. Immersed in the study of classical music by day and devoted to his bedroom studio at night, he diligently honed his skills.

sombr's creative vision extends far beyond recording romantic indie-rock melodies. He possesses an entrepreneurial spirit that led him to establish his own label and actively seek out likeminded musicians to sign. When the world was plunged into the depths of the COVID-19 pandemic, music became an oasis for this young artist, providing solace and escape. It was during this period that sombr took the bold step of launching his own major label imprint.`;

const SOMBR_REVIEWS = [
  { name: "Jordan M.", date: "Feb 2026", stars: 5, text: "Absolutely incredible show. sombr's voice is even better live — the whole arena was singing every word. One of the best concerts I've ever been to." },
  { name: "Priya K.", date: "Feb 2026", stars: 5, text: "I've been a fan since his bedroom recordings and seeing him sell out arenas is surreal. The production was stunning and he performed for over 2 hours non-stop." },
  { name: "Marcus T.", date: "Feb 2026", stars: 5, text: "Brought my girlfriend and she cried three times. The setlist was perfect — all the hits plus some deep cuts. 100% worth every penny." },
  { name: "Sofia R.", date: "Feb 2026", stars: 4, text: "Amazing energy from start to finish. The only reason it's not 5 stars is the merch line was insane. The music itself was flawless." },
  { name: "Derek L.", date: "Mar 2026", stars: 5, text: "sombr shut the whole arena DOWN. The lighting, the sound, the vibe — everything was perfect. Already bought tickets for the next tour." },
  { name: "Aisha W.", date: "Mar 2026", stars: 5, text: "This was my third sombr show and each one gets better. He has a gift for making 20,000 people feel like he's singing just to them." },
];

// ─── BRUNO MARS DATA ──────────────────────────────────────────────────────────

const BRUNO_MARS_DATES_US = [
  { id: "bm-charlotte", date: "APR 29", day: "Wed", time: "7:00 PM", city: "Charlotte, NC", venue: "Bank of America Stadium" },
  { id: "bm-landover1", date: "MAY 02", day: "Sat", time: "7:00 PM", city: "Landover, MD", venue: "Northwest Stadium" },
  { id: "bm-landover2", date: "MAY 03", day: "Sun", time: "7:00 PM", city: "Landover, MD", venue: "Northwest Stadium" },
  { id: "bm-nashville", date: "MAY 06", day: "Wed", time: "7:00 PM", city: "Nashville, TN", venue: "Nissan Stadium" },
  { id: "bm-detroit1", date: "MAY 09", day: "Sat", time: "7:00 PM", city: "Detroit, MI", venue: "Ford Field" },
  { id: "bm-detroit2", date: "MAY 10", day: "Sun", time: "7:00 PM", city: "Detroit, MI", venue: "Ford Field" },
  { id: "bm-minneapolis", date: "MAY 13", day: "Wed", time: "7:00 PM", city: "Minneapolis, MN", venue: "U.S. Bank Stadium" },
  { id: "bm-chicago1", date: "MAY 16", day: "Sat", time: "7:30 PM", city: "Chicago, IL", venue: "Soldier Field" },
  { id: "bm-chicago2", date: "MAY 17", day: "Sun", time: "7:30 PM", city: "Chicago, IL", venue: "Soldier Field" },
  { id: "bm-columbus", date: "MAY 20", day: "Wed", time: "7:00 PM", city: "Columbus, OH", venue: "Ohio Stadium" },
  { id: "bm-nj1", date: "AUG 21", day: "Fri", time: "7:00 PM", city: "East Rutherford, NJ", venue: "MetLife Stadium" },
  { id: "bm-nj2", date: "AUG 22", day: "Sat", time: "7:00 PM", city: "East Rutherford, NJ", venue: "MetLife Stadium" },
  { id: "bm-nj3", date: "AUG 25", day: "Tue", time: "7:00 PM", city: "East Rutherford, NJ", venue: "MetLife Stadium" },
  { id: "bm-nj4", date: "AUG 26", day: "Wed", time: "7:00 PM", city: "East Rutherford, NJ", venue: "MetLife Stadium" },
  { id: "bm-pittsburgh", date: "AUG 29", day: "Sat", time: "7:00 PM", city: "Pittsburgh, PA", venue: "Acrisure Stadium" },
  { id: "bm-philly1", date: "SEP 01", day: "Tue", time: "7:00 PM", city: "Philadelphia, PA", venue: "Lincoln Financial Field" },
  { id: "bm-philly2", date: "SEP 02", day: "Wed", time: "7:00 PM", city: "Philadelphia, PA", venue: "Lincoln Financial Field" },
  { id: "bm-boston1", date: "SEP 05", day: "Sat", time: "7:00 PM", city: "Foxborough, MA", venue: "Gillette Stadium" },
  { id: "bm-boston2", date: "SEP 06", day: "Sun", time: "7:00 PM", city: "Foxborough, MA", venue: "Gillette Stadium" },
  { id: "bm-indy", date: "SEP 09", day: "Wed", time: "7:00 PM", city: "Indianapolis, IN", venue: "Lucas Oil Stadium" },
  { id: "bm-tampa1", date: "SEP 12", day: "Sat", time: "7:00 PM", city: "Tampa, FL", venue: "Raymond James Stadium" },
  { id: "bm-tampa2", date: "SEP 13", day: "Sun", time: "7:00 PM", city: "Tampa, FL", venue: "Raymond James Stadium" },
  { id: "bm-nola", date: "SEP 16", day: "Wed", time: "7:00 PM", city: "New Orleans, LA", venue: "Caesars Superdome" },
  { id: "bm-miami1", date: "SEP 19", day: "Sat", time: "7:00 PM", city: "Miami, FL", venue: "Hard Rock Stadium" },
  { id: "bm-miami2", date: "SEP 20", day: "Sun", time: "7:00 PM", city: "Miami, FL", venue: "Hard Rock Stadium" },
  { id: "bm-sanantonio", date: "SEP 23", day: "Wed", time: "7:00 PM", city: "San Antonio, TX", venue: "Alamodome" },
  { id: "bm-co1", date: "SEP 26", day: "Sat", time: "7:00 PM", city: "Colorado Springs, CO", venue: "Falcon Stadium" },
  { id: "bm-co2", date: "SEP 27", day: "Sun", time: "7:00 PM", city: "Colorado Springs, CO", venue: "Falcon Stadium" },
  { id: "bm-sofi1", date: "SEP 30", day: "Wed", time: "7:00 PM", city: "Inglewood, CA", venue: "SoFi Stadium" },
  { id: "bm-sofi2", date: "OCT 02", day: "Fri", time: "7:00 PM", city: "Inglewood, CA", venue: "SoFi Stadium" },
  { id: "bm-sofi3", date: "OCT 03", day: "Sat", time: "7:00 PM", city: "Inglewood, CA", venue: "SoFi Stadium" },
  { id: "bm-sofi4", date: "OCT 06", day: "Tue", time: "7:00 PM", city: "Inglewood, CA", venue: "SoFi Stadium" },
  { id: "bm-sofi5", date: "OCT 07", day: "Wed", time: "7:00 PM", city: "Inglewood, CA", venue: "SoFi Stadium" },
  { id: "bm-levis1", date: "OCT 10", day: "Sat", time: "7:00 PM", city: "Santa Clara, CA", venue: "Levi's Stadium" },
  { id: "bm-levis2", date: "OCT 11", day: "Sun", time: "7:00 PM", city: "Santa Clara, CA", venue: "Levi's Stadium" },
];

const BRUNO_MARS_DATES_INTL = [
  { id: "bm-toronto1", date: "MAY 23", day: "Sat", time: "7:00 PM", city: "Toronto, ON, Canada", venue: "Rogers Stadium" },
  { id: "bm-toronto2", date: "MAY 24", day: "Sun", time: "7:00 PM", city: "Toronto, ON, Canada", venue: "Rogers Stadium" },
  { id: "bm-toronto3", date: "MAY 27", day: "Wed", time: "7:00 PM", city: "Toronto, ON, Canada", venue: "Rogers Stadium" },
  { id: "bm-toronto4", date: "MAY 28", day: "Thu", time: "7:00 PM", city: "Toronto, ON, Canada", venue: "Rogers Stadium" },
  { id: "bm-toronto5", date: "MAY 30", day: "Sat", time: "7:00 PM", city: "Toronto, ON, Canada", venue: "Rogers Stadium" },
  { id: "bm-paris1", date: "JUN 18", day: "Thu", time: "7:00 PM", city: "St Denis, France", venue: "Stade de France" },
  { id: "bm-paris2", date: "JUN 20", day: "Sat", time: "7:00 PM", city: "St Denis, France", venue: "Stade de France" },
  { id: "bm-paris3", date: "JUN 21", day: "Sun", time: "7:00 PM", city: "St Denis, France", venue: "Stade de France" },
  { id: "bm-berlin1", date: "JUN 26", day: "Fri", time: "6:00 PM", city: "Berlin, Germany", venue: "Olympiastadion" },
  { id: "bm-berlin2", date: "JUN 28", day: "Sun", time: "6:00 PM", city: "Berlin, Germany", venue: "Olympiastadion" },
  { id: "bm-berlin3", date: "JUN 29", day: "Mon", time: "6:00 PM", city: "Berlin, Germany", venue: "Olympiastadion" },
  { id: "bm-amsterdam1", date: "JUL 02", day: "Thu", time: "8:00 PM", city: "Amsterdam, Netherlands", venue: "Johan Cruijff ArenA" },
  { id: "bm-amsterdam2", date: "JUL 04", day: "Sat", time: "8:00 PM", city: "Amsterdam, Netherlands", venue: "Johan Cruijff ArenA" },
  { id: "bm-amsterdam3", date: "JUL 05", day: "Sun", time: "8:00 PM", city: "Amsterdam, Netherlands", venue: "Johan Cruijff ArenA" },
  { id: "bm-amsterdam4", date: "JUL 07", day: "Tue", time: "8:00 PM", city: "Amsterdam, Netherlands", venue: "Johan Cruijff ArenA" },
  { id: "bm-madrid1", date: "JUL 10", day: "Fri", time: "8:30 PM", city: "Madrid, Spain", venue: "Estadio Riyadh Air Metropolitano" },
  { id: "bm-madrid2", date: "JUL 11", day: "Sat", time: "8:30 PM", city: "Madrid, Spain", venue: "Estadio Riyadh Air Metropolitano" },
  { id: "bm-milan1", date: "JUL 14", day: "Tue", time: "7:30 PM", city: "Milano, Italy", venue: "Stadio San Siro" },
  { id: "bm-milan2", date: "JUL 15", day: "Wed", time: "7:30 PM", city: "Milano, Italy", venue: "Stadio San Siro" },
  { id: "bm-london1", date: "JUL 18", day: "Sat", time: "5:00 PM", city: "London, United Kingdom", venue: "Wembley Stadium" },
  { id: "bm-london2", date: "JUL 19", day: "Sun", time: "4:30 PM", city: "London, United Kingdom", venue: "Wembley Stadium" },
  { id: "bm-london3", date: "JUL 22", day: "Wed", time: "5:00 PM", city: "London, United Kingdom", venue: "Wembley Stadium" },
  { id: "bm-london4", date: "JUL 24", day: "Fri", time: "5:00 PM", city: "London, United Kingdom", venue: "Wembley Stadium" },
  { id: "bm-london5", date: "JUL 25", day: "Sat", time: "5:00 PM", city: "London, United Kingdom", venue: "Wembley Stadium" },
  { id: "bm-london6", date: "JUL 28", day: "Tue", time: "5:00 PM", city: "London, United Kingdom", venue: "Wembley Stadium" },
  { id: "bm-vancouver1", date: "OCT 14", day: "Wed", time: "7:00 PM", city: "Vancouver, BC, Canada", venue: "BC Place" },
  { id: "bm-vancouver2", date: "OCT 16", day: "Fri", time: "7:00 PM", city: "Vancouver, BC, Canada", venue: "BC Place" },
  { id: "bm-vancouver3", date: "OCT 17", day: "Sat", time: "7:00 PM", city: "Vancouver, BC, Canada", venue: "BC Place" },
  { id: "bm-vancouver4", date: "OCT 20", day: "Tue", time: "7:00 PM", city: "Vancouver, BC, Canada", venue: "BC Place" },
  { id: "bm-vancouver5", date: "OCT 21", day: "Wed", time: "7:00 PM", city: "Vancouver, BC, Canada", venue: "BC Place" },
  { id: "bm-mexico1", date: "DEC 03", day: "Thu", time: "9:00 PM", city: "Ciudad de México, Mexico", venue: "Estadio GNP Seguros" },
  { id: "bm-mexico2", date: "DEC 04", day: "Fri", time: "9:00 PM", city: "Ciudad de México, Mexico", venue: "Estadio GNP Seguros" },
  { id: "bm-mexico3", date: "DEC 07", day: "Mon", time: "9:00 PM", city: "Ciudad de México, Mexico", venue: "Estadio GNP Seguros" },
  { id: "bm-mexico4", date: "DEC 08", day: "Tue", time: "9:00 PM", city: "Ciudad de México, Mexico", venue: "Estadio GNP Seguros" },
];

const BRUNO_MARS_ABOUT = `Bruno Mars is a Grammy-winning global superstar, singer, songwriter, multi-instrumentalist, producer and one of the most-streamed artists in the world. Known for his showmanship and chart-toppers, Bruno Mars has set a number of records throughout his career, including becoming the first artist ever to hit 150 million monthly listeners on Spotify, appearing on two of the fastest songs to reach 1 billion streams (for "Die with a Smile" with Lady Gaga and "APT." with Rosé), and achieving the highest-certified song in RIAA history with 2010's "Just the Way You Are."

Since launching a string of hits beginning in 2009, Bruno Mars has sold over 150 million records worldwide, making him one of the best-selling artists of all time. Beyond his work as a soloist, Bruno Mars is a member of the duo Silk Sonic with Anderson .Paak.

In addition to his 35 Billboard Hot 100 hits, including nine No. 1 singles, Bruno Mars is the recipient of 16 Grammy Awards (including Album of the Year for 24K Magic), 14 American Music Awards, and 7 MTV Video Music Awards. His 24K Magic World Tour was among the highest-grossing tours in history, and within the Top 10 highest-grossing of the 2010s.`;

const BRUNO_MARS_REVIEWS = [
  { name: "Tasha B.", date: "May 2026", stars: 5, text: "Bruno Mars is on another level live. From the first note to the last, he had the entire stadium on their feet. Absolute perfection — worth every dollar." },
  { name: "Carlos M.", date: "May 2026", stars: 5, text: "I've seen hundreds of concerts and this is genuinely top 3 of my life. The production, the dancers, the setlist — nothing was missing. Bruno gave everything." },
  { name: "Leila H.", date: "Aug 2026", stars: 5, text: "Flew in from another state just for this show and I'd do it again without hesitation. He played all the classics and the crowd was electric the entire night." },
  { name: "James W.", date: "Sep 2026", stars: 5, text: "My wife and I have wanted to see Bruno Mars for years. Finally did it and he surpassed every expectation. That man can do everything — sing, dance, play instruments." },
  { name: "Nina R.", date: "Sep 2026", stars: 4, text: "Phenomenal show. The only reason for 4 stars is parking was a nightmare. But once inside, Bruno was absolutely incredible from start to finish." },
  { name: "Andre T.", date: "Oct 2026", stars: 5, text: "When he opened with Uptown Funk the whole stadium erupted. Three hours of pure entertainment. Bruno Mars is one of the greatest performers alive, full stop." },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

type Tab = "CONCERTS" | "ABOUT" | "REVIEWS";
type DateEntry = { id: string; date: string; day: string; time: string; city: string; venue: string };

export default function TourDatesPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const eventId = params?.id ?? "sombr";
  const isBruno = eventId === "bruno-mars";

  const [activeTab, setActiveTab] = useState<Tab>("CONCERTS");
  const [showIntl, setShowIntl] = useState(false);

  const tourName = isBruno ? "Bruno Mars - The Romantic Tour" : "SOMBR - You Are The Reason Tour";
  const aboutText = isBruno ? BRUNO_MARS_ABOUT : SOMBR_ABOUT;
  const reviews = isBruno ? BRUNO_MARS_REVIEWS : SOMBR_REVIEWS;
  const usDates: DateEntry[] = isBruno ? BRUNO_MARS_DATES_US : SOMBR_DATES;
  const intlDates: DateEntry[] = isBruno ? BRUNO_MARS_DATES_INTL : [];

  const handleSelect = (event: DateEntry) => {
    const p = new URLSearchParams({
      venue: event.venue,
      city: event.city,
      date: event.date,
      day: event.day,
      time: event.time,
    });
    router.push(`/waiting/${eventId}?${p.toString()}`);
  };

  const renderDateList = (dates: DateEntry[]) => dates.map((event) => {
    const parts = event.date.split(" ");
    const month = parts[0];
    const day = parts[1];
    return (
      <div key={event.id} style={{ borderBottom: "1px solid #e0e0e0", padding: "16px 20px", background: "white", marginBottom: 2 }}>
        <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: "bold", color: "#7b2fbe", letterSpacing: 0.5 }}>
          PRESALE HAPPENING NOW
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, minWidth: 56, textAlign: "center", border: "1px solid #ddd", borderRadius: 6, padding: "8px 0", background: "#fafafa" }}>
            <p style={{ margin: 0, fontSize: 11, color: "#888", fontWeight: "bold" }}>{month}</p>
            <p style={{ margin: "2px 0 0", fontSize: 24, fontWeight: "bold", lineHeight: 1 }}>{day}</p>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 13, color: "#666" }}>{event.day} • {event.time}</p>
            <p style={{ margin: "3px 0 0", fontSize: 16, fontWeight: "bold", color: "#111" }}>{event.city}</p>
            <p style={{ margin: "2px 0 0", fontSize: 14, fontWeight: "600", color: "#333" }}>{event.venue}</p>
            <p style={{ margin: "2px 0 6px", fontSize: 13, color: "#999" }}>{tourName}</p>
            <button style={{ border: "1px solid #bbb", borderRadius: 20, padding: "6px 14px", fontSize: 13, background: "white", cursor: "pointer", color: "#333" }}>
              Reminders 🔔
            </button>
          </div>
          <button
            onClick={() => handleSelect(event)}
            style={{ width: 46, height: 46, minWidth: 46, borderRadius: "50%", background: "#0050d0", border: "none", color: "white", fontSize: 24, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,80,208,0.3)" }}
          >
            ›
          </button>
        </div>
      </div>
    );
  });

  return (
    <div style={{ fontFamily: "Arial", background: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ background: "#0050d0", height: 4 }} />
      <div style={{ background: "#111", color: "white", padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 22, cursor: "pointer", padding: "4px 8px" }} onClick={() => router.back()}>←</span>
          <div>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: "bold" }}>{tourName}</h2>
            <p style={{ margin: "4px 0 0", color: "#aaa", fontSize: 13 }}>Select a date to find tickets</p>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", background: "white", borderBottom: "1px solid #ddd" }}>
        {(["CONCERTS", "ABOUT", "REVIEWS"] as Tab[]).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: "14px 0", fontSize: 13, fontWeight: "bold", cursor: "pointer", background: "none", border: "none", borderBottom: activeTab === tab ? "3px solid #0050d0" : "3px solid transparent", color: activeTab === tab ? "#0050d0" : "#888" }}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "CONCERTS" && (
        <div>
          {renderDateList(usDates)}
          {isBruno && intlDates.length > 0 && (
            <>
              <div
                onClick={() => setShowIntl(!showIntl)}
                style={{ padding: "16px 20px", background: "#f0f4ff", borderTop: "1px solid #ddd", borderBottom: "1px solid #ddd", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
              >
                <strong style={{ fontSize: 15, color: "#0050d0" }}>🌍 International Concerts</strong>
                <span style={{ fontSize: 18, color: "#0050d0" }}>{showIntl ? "▲" : "▼"}</span>
              </div>
              {showIntl && renderDateList(intlDates)}
            </>
          )}
        </div>
      )}

      {activeTab === "ABOUT" && (
        <div style={{ background: "white", margin: 16, borderRadius: 12, padding: 24, boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 20, fontWeight: "bold" }}>
            About {isBruno ? "Bruno Mars" : "sombr"}
          </h2>
          <div style={{ width: 60, height: 4, background: "#0050d0", borderRadius: 2, marginBottom: 20 }} />
          {aboutText.split("\n\n").map((para, i) => (
            <p key={i} style={{ margin: "0 0 16px", fontSize: 15, color: "#333", lineHeight: 1.7 }}>{para}</p>
          ))}
        </div>
      )}

      {activeTab === "REVIEWS" && (
        <div style={{ padding: "16px 16px 40px" }}>
          <div style={{ background: "white", borderRadius: 12, padding: "20px", marginBottom: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 32, fontWeight: "bold", color: "#111" }}>5.0</span>
              <div>
                <div style={{ fontSize: 18, color: "#f5a623" }}>★★★★★</div>
                <p style={{ margin: 0, fontSize: 12, color: "#888" }}>Based on {reviews.length} reviews</p>
              </div>
            </div>
          </div>
          {reviews.map((review, i) => (
            <div key={i} style={{ background: "white", borderRadius: 12, padding: 20, marginBottom: 10, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#0050d0", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: 15 }}>
                    {review.name[0]}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: "bold", fontSize: 14 }}>{review.name}</p>
                    <p style={{ margin: 0, fontSize: 12, color: "#999" }}>{review.date}</p>
                  </div>
                </div>
                <div style={{ color: "#f5a623", fontSize: 15 }}>{"★".repeat(review.stars)}</div>
              </div>
              <p style={{ margin: 0, fontSize: 14, color: "#444", lineHeight: 1.6 }}>{review.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
