import type { Metadata, Viewport } from "next";
import { SITE_DESCRIPTION, SITE_NAME, pageMetadata } from "@/app/lib/metadata";
import "./globals.css";

// 사이트 공통 메타 태그. 각 페이지는 pageMetadata()로 제목과 설명을 덮어쓴다.
// 아이콘은 app/favicon.ico, 썸네일은 app/opengraph-image.tsx가 자동으로 들어간다.
export const metadata: Metadata = {
  ...pageMetadata({ description: SITE_DESCRIPTION }),
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  keywords: ["북마크", "링크 모음", "링크 저장", "즐겨찾기", "폴더 정리"],
};

export const viewport: Viewport = {
  themeColor: "#2ac1bc",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
