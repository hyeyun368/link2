// 로그인/회원가입 페이지 묶음. 헤더 없이 화면 가운데에 카드를 둔다.
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-1 items-center justify-center px-5 py-9">
      <section className="flex w-full max-w-[400px] flex-col gap-7 rounded-[16px] bg-[var(--card)] p-5 shadow-[var(--shadow-card)] sm:p-7">
        {children}
      </section>
    </main>
  );
}
