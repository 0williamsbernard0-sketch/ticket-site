import Link from "next/link";
import { getUser } from "@/lib/user";

export default async function Header() {
  const user = await getUser();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "16px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Link href="/">Home</Link>

      <nav>
        {user ? (
          <div style={{ display: "flex", gap: "12px" }}>
            <span>
              👋 {user.user_metadata?.name || user.email}
            </span>

            <form action="/auth/signout" method="post">
              <button type="submit">Sign out</button>
            </form>
          </div>
        ) : (
          <Link href="/login">Sign in</Link>
        )}
      </nav>
    </header>
  );
}