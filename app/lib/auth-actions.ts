"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// at은 같은 메시지가 연달아 나도 토스트를 다시 띄우기 위한 값이다.
export type AuthState = { error?: string; success?: string; at?: number };

const fail = (error: string): AuthState => ({ error, at: Date.now() });

export async function signup(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const passwordConfirm = String(formData.get("password-confirm") ?? "");

  if (!email || !password || !passwordConfirm) {
    return fail("이메일과 비밀번호를 모두 입력해 주세요.");
  }
  if (password !== passwordConfirm) {
    return fail("비밀번호가 일치하지 않아요.");
  }

  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    return fail(toKoreanMessage(error.code, "회원가입에 실패했어요."));
  }

  redirect("/");
}

export async function login(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return fail("이메일과 비밀번호를 모두 입력해 주세요.");
  }

  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return fail(toKoreanMessage(error.code, "로그인에 실패했어요."));
  }

  redirect("/");
}

// 비밀번호 리셋 링크를 메일로 보낸다. 링크는 /auth/confirm을 거쳐 /reset-password로 온다.
export async function sendResetLink(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return fail("이메일을 입력해 주세요.");

  const origin =
    (await headers()).get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/confirm?next=/reset-password`,
  });
  if (error) {
    return fail(toKoreanMessage(error.code, "리셋 링크 발송에 실패했어요."));
  }

  // 가입 여부를 알려주지 않도록, 성공 문구는 항상 같다.
  return {
    success: "리셋 링크를 보냈어요. 메일함을 확인해 주세요.",
    at: Date.now(),
  };
}

export async function resetPassword(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const password = String(formData.get("password") ?? "");
  const passwordConfirm = String(formData.get("password-confirm") ?? "");

  if (!password || !passwordConfirm) {
    return fail("새 비밀번호를 모두 입력해 주세요.");
  }
  if (password !== passwordConfirm) {
    return fail("비밀번호가 일치하지 않아요.");
  }

  const supabase = createClient(await cookies());
  const { data } = await supabase.auth.getClaims();
  if (!data) {
    return fail("리셋 링크가 만료됐어요. 비밀번호 찾기를 다시 해 주세요.");
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return fail(toKoreanMessage(error.code, "비밀번호 변경에 실패했어요."));
  }

  redirect("/");
}

// 카카오 로그인 화면으로 보낸다. 로그인 후 /auth/callback에서 세션을 만든다.
export async function loginWithKakao() {
  const origin =
    (await headers()).get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const supabase = createClient(await cookies());
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: { redirectTo: `${origin}/auth/callback` },
  });
  if (error || !data.url) redirect("/login?error=kakao");

  redirect(data.url);
}

export async function logout() {
  const supabase = createClient(await cookies());
  await supabase.auth.signOut();
  redirect("/login");
}

// Supabase Auth 오류 코드를 한국어 안내 문구로 바꾼다.
function toKoreanMessage(code: string | undefined, fallback: string) {
  switch (code) {
    case "invalid_credentials":
      return "이메일 또는 비밀번호가 올바르지 않아요.";
    case "email_not_confirmed":
      return "이메일 인증이 아직 안 됐어요. 메일함에서 인증 링크를 눌러 주세요.";
    case "user_already_exists":
    case "email_exists":
      return "이미 가입된 이메일이에요.";
    case "same_password":
      return "이전과 다른 비밀번호를 입력해 주세요.";
    case "weak_password":
      return "비밀번호가 너무 약해요. 6자 이상으로 더 복잡하게 입력해 주세요.";
    case "email_address_invalid":
    case "validation_failed":
      return "올바른 이메일 주소를 입력해 주세요.";
    case "over_email_send_rate_limit":
    case "over_request_rate_limit":
      return "요청이 너무 많아요. 잠시 후 다시 시도해 주세요.";
    case "signup_disabled":
    case "email_provider_disabled":
      return "지금은 이 기능을 사용할 수 없어요.";
  }
  return `${fallback} 잠시 후 다시 시도해 주세요.`;
}
