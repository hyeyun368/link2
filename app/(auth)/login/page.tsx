import type { Metadata } from "next";
import { pageMetadata } from "@/app/lib/metadata";
import { AuthLogo, AuthSwitch } from "@/app/ui/auth-form";
import KakaoLoginButton from "@/app/ui/kakao-login-button";
import LoginForm from "@/app/ui/login-form";

export const metadata: Metadata = pageMetadata({
  title: "로그인",
  description: "로그인하고 저장해 둔 링크와 폴더를 확인하세요.",
});

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { error } = await searchParams;

  return (
    <>
      <AuthLogo />
      <div className="flex flex-col gap-3.5">
        <LoginForm kakaoError={error === "kakao"} />
        <KakaoLoginButton />
      </div>
      <div className="flex flex-col gap-2">
        <AuthSwitch
          text="비밀번호를 잊으셨나요?"
          href="/forgot-password"
          linkText="비밀번호 찾기"
        />
        <AuthSwitch text="아직 계정이 없나요?" href="/signup" linkText="회원가입" />
      </div>
    </>
  );
}
