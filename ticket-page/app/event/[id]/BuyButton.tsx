"use client";

export default function BuyButton({ eventId }: { eventId: string }) {
  return (
    <button
      onClick={() => {
        alert("CLICK WORKS");
        console.log("CLICK WORKS");
        window.location.href = `/waiting/${eventId}`;
      }}
      style={{
        marginTop: 15,
        padding: "12px 18px",
        background: "black",
        color: "white",
      }}
    >
      Buy Ticket
    </button>
  );
}