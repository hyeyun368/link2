import "server-only";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

// 로그인한 사용자의 이메일. 로그인하지 않았으면 null.
export async function getCurrentUserEmail(): Promise<string | null> {
  const supabase = createClient(await cookies());
  const { data } = await supabase.auth.getClaims();
  const email = data?.claims.email;
  return typeof email === "string" ? email : null;
}
