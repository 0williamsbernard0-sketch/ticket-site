"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  // Build-safe: don't use useSearchParams here
  const redirect = useMemo(() => {
    if (typeof window === "undefined") return "/";
    const sp = new URLSearchParams(window.location.search);
    return sp.get("redirect") || "/";
  }, []);

  const handleLogin = () => {
    if (!email.trim()) {
      alert("Enter email");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email: email.trim() }));
    router.push(redirect);
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        maxWidth: 400,
        margin: "0 auto",
        padding: 30,
      }}
    >
      <h1>Login</h1>
      <p style={{ color: "gray" }}>You must be signed in to continue</p>

      <input
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 20,
          border: "1px solid #ccc",
          borderRadius: 6,
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          marginTop: 20,
          width: "100%",
          padding: 12,
          background: "black",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Sign In
      </button>
    </div>
  );
}