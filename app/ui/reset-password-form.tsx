"use client";

import { useActionState, useState } from "react";
import { resetPassword, type AuthState } from "@/app/lib/auth-actions";
import { AuthButton, AuthField } from "@/app/ui/auth-form";
import Toast from "@/app/ui/toast";

const initialState: AuthState = {};

export default function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(resetPassword, initialState);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const filled = password !== "" && passwordConfirm !== "";

  return (
    <>
      <Toast message={state.error} id={state.at} />
      <form action={formAction} className="flex flex-col gap-3.5">
        <AuthField
          id="password"
          label="새 비밀번호"
          type="password"
          placeholder="새 비밀번호를 입력해 주세요"
          autoComplete="new-password"
          value={password}
          onChange={setPassword}
        />
        <AuthField
          id="password-confirm"
          label="새 비밀번호 확인"
          type="password"
          placeholder="새 비밀번호를 한 번 더 입력해 주세요"
          autoComplete="new-password"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
        />
        <AuthButton type="submit" disabled={!filled || pending}>
          {pending ? "변경 중..." : "비밀번호 변경"}
        </AuthButton>
      </form>
    </>
  );
}
