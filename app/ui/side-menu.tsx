import Link from "next/link";
import { logout } from "@/app/lib/auth-actions";

// 왼쪽 사이드 메뉴. 로그인 전에는 로그인/회원가입, 로그인 후에는 계정과 로그아웃을 보여준다.
export default function SideMenu({ email }: { email: string | null }) {
  return (
    <aside className="shrink-0 border-b border-[var(--border)] bg-[var(--card)] px-5 py-4 md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:w-60 md:border-r md:border-b-0 md:py-7">
      {email ? (
        <div className="flex items-center gap-3 md:flex-col md:items-stretch">
          <div className="flex min-w-0 flex-1 flex-col md:flex-none">
            <span className="text-[13px] leading-[1.4] text-[var(--text-sub)]">
              로그인 계정
            </span>
            <span className="truncate text-[14px] font-bold text-[var(--text)]">
              {email}
            </span>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="btn-secondary w-full rounded-[12px] bg-[var(--hover-bg)] px-3.5 py-2.5 text-[14px] font-bold text-[var(--accent)]"
            >
              로그아웃
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-[13px] leading-[1.4] text-[var(--text-sub)]">
            로그인하고 나만의 링크를 모아 보세요.
          </p>
          <div className="flex gap-2 md:flex-col">
            <Link
              href="/login"
              className="btn-primary flex-1 rounded-[12px] bg-[var(--accent)] px-3.5 py-2.5 text-center text-[14px] font-bold text-white"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="btn-secondary flex-1 rounded-[12px] bg-[var(--hover-bg)] px-3.5 py-2.5 text-center text-[14px] font-bold text-[var(--accent)]"
            >
              회원가입
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
