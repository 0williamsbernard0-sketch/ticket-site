import { getSupabaseServer } from "@/lib/supabase-server";

export async function isLoggedIn(): Promise<boolean> {
  const supabase = getSupabaseServer();
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}

export async function getUser() {
  const supabase = getSupabaseServer();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function signOut() {
  const supabase = getSupabaseServer();
  await supabase.auth.signOut();
}