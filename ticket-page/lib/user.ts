import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function getUser() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function isLoggedIn(): Promise<boolean> {
  const user = await getUser();
  return !!user;
}
