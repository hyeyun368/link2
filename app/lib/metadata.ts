import type { Metadata } from "next";

export const SITE_NAME = "링크";
export const SITE_DESCRIPTION =
  "흩어진 링크를 한곳에 모아 폴더별로 정리하는 나만의 북마크 서비스";

// 썸네일은 app/opengraph-image.tsx가 만든다. 페이지가 openGraph를 덮어쓰면
// 파일 기반 이미지가 빠지므로 주소를 직접 넣는다. (twitter는 이 값을 이어받는다)
const sharedOpenGraph: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  locale: "ko_KR",
  siteName: SITE_NAME,
  images: [
    {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: `${SITE_NAME} - 흩어진 링크를 한곳에 모아 보세요`,
    },
  ],
};

// 페이지별 메타 태그. openGraph/twitter는 통째로 덮어써지므로 공통값을 같이 넣는다.
// noIndex: 검색 결과에 나올 필요 없는 페이지(비밀번호 재설정 등)
export function pageMetadata({
  title,
  description,
  noIndex = false,
}: {
  title?: string;
  description: string;
  noIndex?: boolean;
}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return {
    ...(title && { title }),
    description,
    openGraph: { ...sharedOpenGraph, title: fullTitle, description },
    twitter: { card: "summary_large_image", title: fullTitle, description },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
