import Link from "next/link";
import { events } from "@/lib/events";
import Header from "@/components/Header"; // adjust path if needed

export default function Home() {
  return (
    <div
      style={{
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
        background: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <Header />

      <main style={{ padding: "24px 20px 48px", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ marginBottom: 20 }}>
          <h2
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 800,
              color: "#111",
              letterSpacing: "-0.02em",
            }}
          >
            Upcoming Events
          </h2>
          <p style={{ margin: "8px 0 0", color: "#555", fontSize: 15 }}>
            Find and book your favorite live events
          </p>
        </div>

        <div style={{ display: "grid", gap: 18 }}>
          {events.map((event) => (
            <article
              key={event.id}
              style={{
                background: "#fff",
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                border: "1px solid #e5e7eb",
              }}
            >
              <div style={{ position: "relative" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.image}
                  alt={event.name}
                  style={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: "16px 18px",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      color: "#fff",
                      fontSize: 20,
                      fontWeight: 800,
                      lineHeight: 1.25,
                      textShadow: "0 2px 12px rgba(0,0,0,0.6)",
                    }}
                  >
                    {event.name}
                  </h3>
                </div>
              </div>

              <div
                style={{
                  padding: "16px 18px",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Link href={`/event/${event.id}`} style={{ textDecoration: "none" }}>
                  <button
                    type="button"
                    style={{
                      padding: "12px 18px",
                      background: "#0064d2",
                      color: "#fff",
                      border: "none",
                      borderRadius: 4,
                      fontWeight: 800,
                      fontSize: 14,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Find Tickets
                  </button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
