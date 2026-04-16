"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if (!email) return alert("Enter email");

    // fake session
    localStorage.setItem("user", JSON.stringify({ email }));

    router.push(redirect);
  };

  return (
    <div style={{
      fontFamily: "Arial",
      maxWidth: 400,
      margin: "0 auto",
      padding: 30
    }}>
      <h1>Login</h1>

      <p style={{ color: "gray" }}>
        You must be signed in to continue
      </p>

      <input
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 20,
          border: "1px solid #ccc",
          borderRadius: 6
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
          borderRadius: 6
        }}
      >
        Sign In
      </button>
    </div>
  );
}