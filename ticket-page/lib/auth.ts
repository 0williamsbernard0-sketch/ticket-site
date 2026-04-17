import { getSupabase } from "@/lib/supabase";

export async function isLoggedIn(): Promise<boolean> {
  const supabase = getSupabase();
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}

export async function getUser() {
  const supabase = getSupabase();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function signOut() {
  const supabase = getSupabase();
  await supabase.auth.signOut();
}
