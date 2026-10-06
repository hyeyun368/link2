import type { EmailOtpType } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// 메일 속 링크가 도착하는 곳. 링크의 토큰으로 로그인 세션을 만든 뒤 next로 보낸다.
// 기본 메일 템플릿은 ?code=, 템플릿을 바꾸면 ?token_hash=&type= 으로 온다.
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = safeNext(searchParams.get("next"));

  const supabase = createClient(await cookies());

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, request.url));
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    if (!error) return NextResponse.redirect(new URL(next, request.url));
  }

  return NextResponse.redirect(
    new URL("/forgot-password?error=link", request.url),
  );
}

// 다른 사이트로 보내지 않도록, 우리 사이트 안의 경로만 허용한다.
function safeNext(next: string | null) {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
}
