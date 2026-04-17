"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Stage = "lobby" | "waiting" | "queue" | "ready";

export default function WaitingPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const eventId = params?.id ?? "";

  const search = useSearchParams();
  const venue = search.get("venue") ?? "Madison Square Garden";
  const city = search.get("city") ?? "New York, NY";
  const date = search.get("date") ?? "NOV 23";
  const day = search.get("day") ?? "Mon";
  const time = search.get("time") ?? "7:00 PM";

  const venueParams = `venue=${encodeURIComponent(venue)}&city=${encodeURIComponent(city)}&date=${encodeURIComponent(date)}&day=${encodeURIComponent(day)}&time=${encodeURIComponent(time)}`;

  const [stage, setStage] = useState<Stage>("lobby");
  const [queueId, setQueueId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [position, setPosition] = useState(Math.floor(Math.random() * 80) + 20);

  useEffect(() => {
    if (!eventId) return;

    const joinQueue = async () => {
      try {
        const newQueueId = crypto.randomUUID();
        setQueueId(newQueueId);
        await supabase.from("queue").insert({
          id: newQueueId,
          event_id: eventId,
          status: "waiting",
          created_at: new Date().toISOString(),
        });
      } catch {
        // keep UI flow even if queue write fails
      }
    };

    joinQueue();

    const t1 = setTimeout(() => setStage("waiting"), 2000);
    const t2 = setTimeout(() => setStage("queue"), 4000);
    const t3 = setTimeout(() => {
      setStage("ready");
      setShowModal(true);
    }, 7000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [eventId]);

  useEffect(() => {
    if (stage !== "queue") return;
    const interval = setInterval(() => {
      setPosition((p) => (p > 1 ? p - Math.floor(Math.random() * 3 + 1) : 1));
    }, 800);
    return () => clearInterval(interval);
  }, [stage]);

  const handleAgree = () => {
    setShowModal(false);
    router.push(`/seat/${eventId}?${venueParams}`);
  };

  const steps: { key: Stage | "pick"; label: string }[] = [
    { key: "lobby", label: "THE LOBBY" },
    { key: "waiting", label: "WAITING ROOM" },
    { key: "queue", label: "QUEUE" },
    { key: "pick", label: "PICK YOUR SEATS" },
  ];

  const stageIndex = { lobby: 0, waiting: 1, queue: 2, ready: 3 };
  const current = stageIndex[stage];

  return (
    <div style={{ fontFamily: "Arial", background: "#111", minHeight: "100vh", color: "white" }}>
      <div style={{ background: "#0050d0", height: 4 }} />
      <div style={{ background: "#111", padding: "16px 20px" }}>
        <div style={{ fontSize: 22, fontStyle: "italic", fontWeight: "bold", marginBottom: 12 }}>
          ticketmaster
        </div>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: "bold" }}>SOMBR - You Are The Reason Tour</h2>
        <p style={{ margin: "4px 0 0", color: "#aaa", fontSize: 14 }}>
          {day} • {date} • {time} • {venue} • {city}
        </p>
      </div>

      <div style={{ padding: "20px 20px 10px", display: "flex", alignItems: "center", gap: 0 }}>
        {steps.map((step, i) => {
          const done = i <= current;
          return (
            <div key={step.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                {i > 0 && <div style={{ flex: 1, height: 2, background: i <= current ? "white" : "#555" }} />}
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: done ? "white" : "#555", flexShrink: 0 }} />
                {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: i < current ? "white" : "#555" }} />}
              </div>
              <span style={{ fontSize: 10, marginTop: 6, color: done ? "white" : "#777", textAlign: "center", lineHeight: 1.3, fontWeight: done ? "bold" : "normal" }}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ margin: "16px 16px 0", background: "white", borderRadius: 4, color: "black", overflow: "hidden" }}>
        <div style={{ background: "#0050d0", height: 6 }} />
        {stage === "lobby" && (
          <div style={{ padding: 40, textAlign: "center" }}>
            <div style={{ width: 50, height: 50, borderRadius: "50%", border: "4px solid #0050d0", borderTopColor: "transparent", animation: "spin 1s linear infinite", margin: "0 auto" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}
        {stage === "waiting" && (
          <div style={{ padding: 40, textAlign: "center" }}>
            <div style={{ width: 50, height: 50, borderRadius: "50%", border: "4px solid #0050d0", borderTopColor: "transparent", animation: "spin 1s linear infinite", margin: "0 auto" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ marginTop: 16, color: "#555" }}>Getting you in line...</p>
          </div>
        )}
        {stage === "queue" && (
          <div style={{ padding: 30, textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "#555", margin: "0 0 8px" }}>YOUR POSITION</p>
            <p style={{ fontSize: 48, fontWeight: "bold", margin: 0 }}>{position}</p>
            <p style={{ color: "#555", fontSize: 13 }}>in line</p>
            <div style={{ marginTop: 16, background: "#eee", borderRadius: 8, height: 8 }}>
              <div style={{ background: "#0050d0", height: "100%", borderRadius: 8, width: `${Math.max(5, 100 - position)}%`, transition: "width 0.5s" }} />
            </div>
          </div>
        )}
        {stage === "ready" && (
          <div style={{ padding: 30, textAlign: "center" }}>
            <p style={{ fontSize: 20, fontWeight: "bold" }}>IT&apos;S YOUR TURN ⓘ</p>
            <div style={{ fontSize: 40, margin: "12px 0" }}>🎟</div>
            <p style={{ fontWeight: "bold" }}>LET&apos;S GO!</p>
            {queueId && (
              <p style={{ fontSize: 11, color: "#888", marginTop: 12 }}>
                QUEUE ID: {queueId.toUpperCase()}
              </p>
            )}
          </div>
        )}
      </div>

      <div style={{ margin: "16px 16px 0", background: "#222", borderRadius: 8, padding: 20, display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={{ fontSize: 32 }}>📱</div>
        <div>
          <h3 style={{ margin: "0 0 6px", fontSize: 16 }}>
            {stage === "lobby" || stage === "waiting" ? "Check Your Account" : "Stick To One Device"}
          </h3>
          <p style={{ margin: 0, color: "#aaa", fontSize: 13, lineHeight: 1.5 }}>
            {stage === "lobby" || stage === "waiting"
              ? "Create or sign in to your account and check that your email, phone and payment details are up to date."
              : "Join the queue from one browser on one device. Additional attempts to join could kick you out of the queue."}
          </p>
        </div>
      </div>

      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "white", borderRadius: "16px 16px 0 0", padding: "28px 24px 40px", maxHeight: "85vh", overflowY: "auto", color: "black", maxWidth: 480, width: "100%" }}>
            <h2 style={{ margin: "0 0 16px", fontSize: 22 }}>What You Need To Know</h2>
            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "0 0 16px" }} />
            <p style={{ fontWeight: "bold", margin: "0 0 8px" }}>Important Note</p>
            <p style={{ fontWeight: "bold", margin: "0 0 6px" }}>This event is using All-In Pricing.</p>
            <p style={{ margin: "0 0 16px", color: "#333", lineHeight: 1.6 }}>
              Pricing is all-in and includes fees (before taxes if applicable).
            </p>
            <p style={{ margin: "0 0 16px", color: "#333", lineHeight: 1.6 }}>
              By purchasing tickets to this event, you agree to abide by the health and safety measures in effect at the time of the event. Government mandates, venue protocols, and event requirements are subject to change.
            </p>
            <p style={{ margin: "0 0 24px", color: "#333", lineHeight: 1.6 }}>
              This event may have immersive elements, which may include flashing or strobe lights, intense lighting, visual effects, loud noises, smoke and/or fog.
            </p>
            <button
              onClick={handleAgree}
              style={{ width: "100%", padding: "16px", background: "#0050d0", color: "white", border: "none", borderRadius: 8, fontSize: 16, fontWeight: "bold", cursor: "pointer" }}
            >
              I Agree
            </button>
          </div>
        </div>
      )}
    </div>
  );
}