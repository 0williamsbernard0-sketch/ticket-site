import { getSupabaseServer } from "@/lib/supabase-server";

export async function getUser() {
  const supabase = getSupabaseServer();
  const { data } = await supabase.auth.getUser();
  return data.user;
}