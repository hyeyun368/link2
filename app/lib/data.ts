export type Folder = {
  id: string;
  name: string;
};

export type Link = {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnailUrl?: string;
  createdAt?: string;
  folderId?: string;
};

export const folders: Folder[] = [
  { id: "dev", name: "개발" },
  { id: "design", name: "디자인" },
  { id: "news", name: "뉴스" },
  { id: "study", name: "학습" },
];

export const seedLinks: Link[] = [
  {
    id: "1",
    title: "Next.js Docs",
    url: "https://nextjs.org/docs",
    description: "Next.js 공식 문서",
    folderId: "dev",
  },
  {
    id: "2",
    title: "React",
    url: "https://react.dev",
    description: "React 공식 문서와 튜토리얼",
    folderId: "dev",
  },
  {
    id: "3",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "유틸리티 우선 CSS 프레임워크",
    folderId: "design",
  },
  {
    id: "4",
    title: "Figma",
    url: "https://www.figma.com",
    description: "협업 디자인 툴",
    folderId: "design",
  },
  {
    id: "5",
    title: "Hacker News",
    url: "https://news.ycombinator.com",
    description: "기술 뉴스와 토론",
    folderId: "news",
  },
  {
    id: "6",
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "웹 표준 레퍼런스",
    folderId: "study",
  },
];
