import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// 카카오 로그인을 마치고 돌아오는 곳. ?code=로 세션을 만들고 인덱스로 보낸다.
// 사용자가 동의를 취소하는 등 실패하면 ?error=가 붙어 온다.
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (code) {
    const supabase = createClient(await cookies());
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.redirect(new URL("/login?error=kakao", request.url));
}
