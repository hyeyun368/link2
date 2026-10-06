import type { Metadata } from "next";
import { pageMetadata } from "@/app/lib/metadata";
import { AuthLogo, AuthSwitch } from "@/app/ui/auth-form";
import KakaoLoginButton from "@/app/ui/kakao-login-button";
import SignupForm from "@/app/ui/signup-form";

export const metadata: Metadata = pageMetadata({
  title: "회원가입",
  description: "회원가입하고 흩어진 링크를 폴더별로 모아 보세요.",
});

export default function SignupPage() {
  return (
    <>
      <AuthLogo />
      <div className="flex flex-col gap-3.5">
        <SignupForm />
        <KakaoLoginButton />
      </div>
      <AuthSwitch text="이미 계정이 있나요?" href="/login" linkText="로그인" />
    </>
  );
}
