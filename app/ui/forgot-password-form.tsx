"use client";

import { useActionState, useState } from "react";
import { sendResetLink } from "@/app/lib/auth-actions";
import { AuthButton, AuthField } from "@/app/ui/auth-form";
import Toast from "@/app/ui/toast";

// 리셋 링크가 만료돼서 돌아왔을 때 보여줄 첫 메시지
const LINK_ERROR = "리셋 링크가 만료됐거나 올바르지 않아요. 다시 요청해 주세요.";

export default function ForgotPasswordForm({ linkError }: { linkError: boolean }) {
  const [state, formAction, pending] = useActionState(
    sendResetLink,
    linkError ? { error: LINK_ERROR, at: 0 } : {},
  );
  const [email, setEmail] = useState("");

  return (
    <>
      <Toast message={state.error} id={state.at} />
      <Toast message={state.success} id={state.at} tone="success" />
      <form action={formAction} className="flex flex-col gap-3.5">
        <AuthField
          id="email"
          label="이메일"
          type="email"
          placeholder="가입한 이메일을 입력해 주세요"
          autoComplete="email"
          value={email}
          onChange={setEmail}
        />
        <AuthButton type="submit" disabled={email.trim() === "" || pending}>
          {pending ? "보내는 중..." : "비밀번호 리셋 링크 보내기"}
        </AuthButton>
      </form>
    </>
  );
}
