import { events } from "@/lib/events";

export default async function InfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div style={{ padding: 20, fontFamily: "Arial" }}>
        Event not found
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: "Arial",
      maxWidth: 700,
      margin: "0 auto",
      padding: 20
    }}>
      
      {/* HEADER */}
      <h1 style={{ fontSize: 24 }}>
        {event.name}
      </h1>

      <p style={{ color: "gray", marginTop: 5 }}>
        {event.date} • {event.location}
      </p>

      {/* INFO BOX */}
      <div style={{
        marginTop: 25,
        padding: 20,
        background: "#f5f6f7",
        borderRadius: 10
      }}>
        <h2 style={{ fontSize: 18 }}>What You Need To Know</h2>

        <ul style={{ marginTop: 15, lineHeight: 1.6 }}>
          <li>
            This event uses <b>All-In Pricing</b> (fees included).
          </li>

          <li>
            By purchasing tickets, you agree to all venue and safety policies.
          </li>

          <li>
            Event requirements may change based on government or venue rules.
          </li>

          <li>
            This event may include flashing lights, loud sounds, or smoke effects.
          </li>

          <li>
            Please consider your health conditions before attending.
          </li>
        </ul>
      </div>

      {/* AGREEMENT BUTTON */}
      <a href={`/seats/${event.id}`}>
        <button
          style={{
            marginTop: 30,
            width: "100%",
            padding: "14px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: 6,
            fontSize: 16,
            cursor: "pointer"
          }}
        >
          I Agree & Continue
        </button>
      </a>
    </div>
  );
}