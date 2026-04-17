"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

type Mode = "signin" | "signup";

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

    if (!email.trim() || !password.trim()) {
      setErr("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
        });
        if (error) throw error;
        setMsg("Account created. Check your email if confirmation is required, then sign in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
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
    <div style={{ fontFamily: "Arial", maxWidth: 420, margin: "0 auto", padding: 24 }}>
      <h1 style={{ margin: 0 }}>{mode === "signin" ? "Sign In" : "Create Account"}</h1>
      <p style={{ color: "#666", marginTop: 8 }}>
        {mode === "signin" ? "Sign in to continue to tickets." : "Create an account to buy tickets."}
      </p>

      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
        <button
          type="button"
          onClick={() => setMode("signin")}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            background: mode === "signin" ? "#0064d2" : "white",
            color: mode === "signin" ? "white" : "black",
            cursor: "pointer",
            fontWeight: 700,
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
            border: "1px solid #ccc",
            background: mode === "signup" ? "#0064d2" : "white",
            color: mode === "signup" ? "white" : "black",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Create Account
        </button>
      </div>

      <label style={{ display: "block", marginTop: 14, fontSize: 13, color: "#555" }}>Email</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        style={{ width: "100%", padding: 11, marginTop: 6, borderRadius: 8, border: "1px solid #ccc" }}
      />

      <label style={{ display: "block", marginTop: 12, fontSize: 13, color: "#555" }}>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        style={{ width: "100%", padding: 11, marginTop: 6, borderRadius: 8, border: "1px solid #ccc" }}
      />

      {msg && <p style={{ marginTop: 12, color: "#166534", fontWeight: 700 }}>{msg}</p>}
      {err && <p style={{ marginTop: 12, color: "#b91c1c", fontWeight: 700 }}>{err}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: 14,
          width: "100%",
          padding: 12,
          background: "#111",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: 800,
          opacity: loading ? 0.75 : 1,
        }}
      >
        {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
      </button>
    </div>
  );
}