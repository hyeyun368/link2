import { loginWithKakao } from "@/app/lib/auth-actions";

// 카카오 디자인 가이드: 배경 #FEE500, 글자·심볼 검정(85%), 둥근 모서리
export default function KakaoLoginButton() {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-center gap-3 text-[13px] text-[var(--text-sub)]">
        <span className="h-px flex-1 bg-[var(--border)]" />
        또는
        <span className="h-px flex-1 bg-[var(--border)]" />
      </div>
      <form action={loginWithKakao}>
        <button
          type="submit"
          className="btn-kakao flex w-full items-center justify-center gap-2 rounded-[12px] bg-[var(--kakao)] px-6 py-3.5 text-[16px] font-bold text-[var(--kakao-text)]"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
            <path d="M12 3C6.48 3 2 6.48 2 10.78c0 2.77 1.86 5.2 4.65 6.57l-.95 3.5c-.08.3.26.55.53.37l4.17-2.77c.52.06 1.06.1 1.6.1 5.52 0 10-3.48 10-7.77S17.52 3 12 3Z" />
          </svg>
          카카오로 시작하기
        </button>
      </form>
    </div>
  );
}
