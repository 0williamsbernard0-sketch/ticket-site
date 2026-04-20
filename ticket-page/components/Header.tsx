import Link from "next/link";
import { getUser } from "@/lib/auth";

export default async function Header() {
  const user = await getUser();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 20px",
        background: "#000",
        color: "#fff",
        borderBottom: "3px solid #0064d2",
        gap: 12,
      }}
    >
      <Link href="/" style={{ textDecoration: "none" }}>
        <h1
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 800,
            fontStyle: "italic",
            letterSpacing: "-0.02em",
            color: "#fff",
          }}
        >
          ticketmaster
        </h1>
      </Link>

      <input
        type="search"
        placeholder="Search events, artists, teams..."
        aria-label="Search"
        style={{
          padding: "10px 14px",
          borderRadius: 4,
          border: "1px solid #333",
          width: "min(420px, 42vw)",
          maxWidth: "100%",
          background: "#1a1a1a",
          color: "#fff",
          fontSize: 14,
          outline: "none",
        }}
      />

      <nav>
        {user ? (
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ color: "#fff", fontSize: 14 }}>
              👋 {user.user_metadata?.name || user.email}
            </span>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                style={{
                  background: "#fff",
                  color: "#000",
                  padding: "10px 16px",
                  borderRadius: 4,
                  border: "none",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Sign Out
              </button>
            </form>
          </div>
        ) : (
          <Link href="/login" style={{ textDecoration: "none" }}>
            <button
              type="button"
              style={{
                background: "#fff",
                color: "#000",
                padding: "10px 16px",
                borderRadius: 4,
                border: "none",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Sign In
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
}
