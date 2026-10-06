"use client";

import { useActionState, useState } from "react";
import { signup, type AuthState } from "@/app/lib/auth-actions";
import { AuthButton, AuthField } from "@/app/ui/auth-form";
import Toast from "@/app/ui/toast";

const initialState: AuthState = {};

export default function SignupForm() {
  const [state, formAction, pending] = useActionState(signup, initialState);
  // 입력값을 state로 들고 있어서 실패해도 입력이 지워지지 않는다.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const filled = email.trim() !== "" && password !== "" && passwordConfirm !== "";

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
          autoComplete="new-password"
          value={password}
          onChange={setPassword}
        />
        <AuthField
          id="password-confirm"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          autoComplete="new-password"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
        />
        <AuthButton type="submit" disabled={!filled || pending}>
          {pending ? "가입 중..." : "회원가입"}
        </AuthButton>
      </form>
    </>
  );
}
