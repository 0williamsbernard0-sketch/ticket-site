import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { eventId } = await req.json();

  const queueId = crypto.randomUUID();

  const { error } = await supabase.from("queue").insert({
    id: queueId,
    event_id: eventId,
    status: "waiting",
    created_at: new Date().toISOString(),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ queueId });
}