"use client";

import { useActionState, useState } from "react";
import { login, type AuthState } from "@/app/lib/auth-actions";
import { AuthButton, AuthField } from "@/app/ui/auth-form";
import Toast from "@/app/ui/toast";

// 카카오 로그인에 실패하고 돌아왔을 때 보여줄 첫 메시지
const KAKAO_ERROR = "카카오 로그인에 실패했어요. 다시 시도해 주세요.";

export default function LoginForm({ kakaoError }: { kakaoError: boolean }) {
  const [state, formAction, pending] = useActionState(
    login,
    kakaoError ? { error: KAKAO_ERROR, at: 0 } : ({} as AuthState),
  );
  // 입력값을 state로 들고 있어서 실패해도 입력이 지워지지 않는다.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const filled = email.trim() !== "" && password !== "";

  return (
    <>
      <Toast message={state.error} id={state.at} />
      <form action={formAction} className="flex flex-col gap-3.5">
        <AuthField
          id="email"
          label="이메일"
          type="email"
          placeholder="example@email.com"
          autoComplete="email"
          value={email}
          onChange={setEmail}
        />
        <AuthField
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          autoComplete="current-password"
          value={password}
          onChange={setPassword}
        />
        <AuthButton type="submit" disabled={!filled || pending}>
          {pending ? "로그인 중..." : "로그인"}
        </AuthButton>
      </form>
    </>
  );
}
