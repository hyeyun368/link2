import type { Metadata } from "next";
import { pageMetadata } from "@/app/lib/metadata";
import { AuthLogo } from "@/app/ui/auth-form";
import ResetPasswordForm from "@/app/ui/reset-password-form";

export const metadata: Metadata = pageMetadata({
  title: "비밀번호 재설정",
  description: "새 비밀번호를 설정해요.",
  noIndex: true,
});

// 메일의 리셋 링크를 누르면 /auth/confirm을 거쳐 이 페이지로 온다.
export default function ResetPasswordPage() {
  return (
    <>
      <AuthLogo />
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-[20px] leading-[1.4] font-bold text-[var(--text)]">
          비밀번호 재설정
        </h1>
        <p className="text-[13px] leading-[1.4] text-[var(--text-sub)]">
          앞으로 사용할 새 비밀번호를 입력해 주세요.
        </p>
      </div>
      <ResetPasswordForm />
    </>
  );
}
