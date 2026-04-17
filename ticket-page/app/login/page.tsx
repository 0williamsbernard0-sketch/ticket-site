"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

type Mode = "signin" | "signup";

const TM_BLUE = "#0064d2";
const TM_TEXT = "#0f172a";

export default function LoginPage() {
  const router = useRouter();
  const supabase = getSupabase();

  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const redirect = useMemo(() => {
    if (typeof window === "undefined") return "/";
    const sp = new URLSearchParams(window.location.search);
    return sp.get("redirect") || "/";
  }, []);

  const handleSubmit = async () => {
    setMsg(null);
    setErr(null);

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setErr("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: cleanPassword,
          options: {
            // Critical: user returns to this deployed site, not localhost
            emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(
              redirect
            )}`,
          },
        });

        if (error) throw error;

        setMsg(
          "Account created. Check your email and click the confirmation link to finish signing in."
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword,
        });

        if (error) throw error;
        router.push(redirect);
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
        maxWidth: 430,
        margin: "0 auto",
        padding: 24,
        minHeight: "100vh",
        color: TM_TEXT,
      }}
    >
      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>
        {mode === "signin" ? "Sign In" : "Create Account"}
      </h1>

      <p style={{ color: "#4b5563", marginTop: 8 }}>
        {mode === "signin"
          ? "Sign in to continue to tickets."
          : "Create an account to buy tickets."}
      </p>

      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
        <button
          type="button"
          onClick={() => setMode("signin")}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            background: mode === "signin" ? TM_BLUE : "white",
            color: mode === "signin" ? "white" : "#111827",
            cursor: "pointer",
            fontWeight: 800,
          }}
        >
          Sign In
        </button>

        <button
          type="button"
          onClick={() => setMode("signup")}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            background: mode === "signup" ? TM_BLUE : "white",
            color: mode === "signup" ? "white" : "#111827",
            cursor: "pointer",
            fontWeight: 800,
          }}
        >
          Create Account
        </button>
      </div>

      <label style={{ display: "block", marginTop: 14, fontSize: 13, color: "#4b5563" }}>
        Email
      </label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          borderRadius: 8,
          border: "1px solid #cbd5e1",
          fontSize: 15,
        }}
      />

      <label style={{ display: "block", marginTop: 12, fontSize: 13, color: "#4b5563" }}>
        Password
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          borderRadius: 8,
          border: "1px solid #cbd5e1",
          fontSize: 15,
        }}
      />

      {msg && (
        <p style={{ marginTop: 12, color: "#166534", fontWeight: 700, lineHeight: 1.5 }}>
          {msg}
        </p>
      )}

      {err && (
        <p style={{ marginTop: 12, color: "#b91c1c", fontWeight: 700, lineHeight: 1.5 }}>
          {err}
        </p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: 14,
          width: "100%",
          padding: 12,
          background: "#111827",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: 900,
          fontSize: 15,
          opacity: loading ? 0.75 : 1,
        }}
      >
        {loading
          ? "Please wait..."
          : mode === "signin"
          ? "Sign In"
          : "Create Account"}
      </button>
    </div>
  );
}