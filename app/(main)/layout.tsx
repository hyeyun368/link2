import { getCurrentUserEmail } from "@/app/lib/auth";
import Header from "@/app/ui/header";
import SideMenu from "@/app/ui/side-menu";

// 헤더와 왼쪽 사이드 메뉴가 있는 일반 페이지 묶음 (로그인/회원가입은 (auth) 그룹)
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const email = await getCurrentUserEmail();

  return (
    <>
      <Header loggedIn={email !== null} />
      <div className="flex flex-1 flex-col md:flex-row">
        <SideMenu email={email} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </>
  );
}
