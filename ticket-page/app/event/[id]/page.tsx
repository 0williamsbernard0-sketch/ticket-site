import { events } from "@/lib/events";
import EventClient from "./EventClient";

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event = events.find((e) => e.id === id);

  if (!event) {
    return <div style={{ padding: 20 }}>Event not found</div>;
  }

  return <EventClient event={event} />;
}