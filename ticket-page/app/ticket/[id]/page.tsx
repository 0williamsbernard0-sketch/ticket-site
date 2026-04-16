import { events } from "@/lib/events";

export default function TicketPage({ params }: { params: { id: string } }) {
  const event = events.find((e) => e.id === params.id);

  if (!event) {
    return (
      <div style={{ padding: 20, fontFamily: "Arial" }}>
        Ticket not found
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: "Arial",
      textAlign: "center",
      padding: 30
    }}>
      <h1>🎟 Your Ticket</h1>

      <div style={{
        marginTop: 20,
        display: "inline-block",
        padding: 20,
        border: "2px dashed black",
        borderRadius: 12,
        background: "#fff"
      }}>
        <h2>{event.name}</h2>

        <p style={{ color: "gray" }}>
          {event.date} • {event.location}
        </p>

        <h3 style={{ marginTop: 10 }}>
          Ticket Confirmed ✅
        </h3>

        {/* QR PLACEHOLDER */}
        <div style={{
          marginTop: 15,
          width: 140,
          height: 140,
          background: "#000",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
          fontSize: 12
        }}>
          QR CODE
        </div>

        <p style={{ marginTop: 15, fontSize: 14, color: "gray" }}>
          Show this at the entrance
        </p>
      </div>
    </div>
  );
}