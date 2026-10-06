import type { Metadata } from "next";
import { pageMetadata } from "@/app/lib/metadata";
import { AuthLogo, AuthSwitch } from "@/app/ui/auth-form";
import ForgotPasswordForm from "@/app/ui/forgot-password-form";

export const metadata: Metadata = pageMetadata({
  title: "비밀번호 찾기",
  description: "가입한 이메일로 비밀번호 재설정 링크를 받아요.",
  noIndex: true,
});

export default async function ForgotPasswordPage({
  searchParams,
}: PageProps<"/forgot-password">) {
  const { error } = await searchParams;

  return (
    <>
      <AuthLogo />
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-[20px] leading-[1.4] font-bold text-[var(--text)]">
          비밀번호 찾기
        </h1>
        <p className="text-[13px] leading-[1.4] text-[var(--text-sub)]">
          가입한 이메일로 비밀번호를 다시 설정하는 링크를 보내 드려요.
        </p>
      </div>
      <ForgotPasswordForm linkError={error === "link"} />
      <AuthSwitch text="비밀번호가 생각났나요?" href="/login" linkText="로그인" />
    </>
  );
}
