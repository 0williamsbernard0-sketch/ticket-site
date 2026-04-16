"use client";
import Link from "next/link";
import type { Event } from "@/lib/events";
export default function EventClient({ event }: { event: Event }) {
  return (
    <div
      style={{
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
        background: "#f5f6f7",
        minHeight: "100vh",
      }}
    >
      {/* Top bar */}
      <header
        style={{
          background: "#000",
          color: "#fff",
          padding: "14px 18px",
          borderBottom: "3px solid #0064d2",
        }}
      >
        <Link
          href="/"
          style={{ color: "#fff", textDecoration: "none", fontWeight: 800, fontStyle: "italic" }}
        >
          ticketmaster
        </Link>
      </header>
      {/* Hero image */}
      <div style={{ position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.image}
          alt=""
          style={{ width: "100%", height: 360, objectFit: "cover", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "18px 20px",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 60%, transparent 100%)",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#fff",
              fontSize: 26,
              lineHeight: 1.15,
              fontWeight: 900,
              textShadow: "0 2px 14px rgba(0,0,0,0.65)",
            }}
          >
            {event.name}
          </h1>
        </div>
      </div>
      <div style={{ padding: "20px 18px 28px", maxWidth: 900, margin: "0 auto" }}>
        <p
          style={{
            margin: "0 0 14px",
            color: "#111",
            fontSize: 15,
            fontWeight: 700,
            lineHeight: 1.5,
          }}
        >
          <span>{event.date}</span>
          <span style={{ color: "#9ca3af", margin: "0 10px" }}>•</span>
          <span style={{ color: "#333" }}>{event.location}</span>
        </p>
        {/* No pricing on this screen */}
        <Link href={`/event/${event.id}/dates`} style={{ textDecoration: "none" }}>
          <button
            type="button"
            style={{
              padding: "14px 18px",
              background: "#0064d2",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 900,
              fontSize: 15,
              width: "100%",
              maxWidth: 420,
            }}
          >
            Find Tickets
          </button>
        </Link>
        <p style={{ marginTop: 14, color: "#6b7280", fontSize: 13, lineHeight: 1.5 }}>
          Prices are shown during seat selection.
        </p>
      </div>
    </div>
  );
}