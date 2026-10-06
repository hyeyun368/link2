import type { Metadata } from "next";
import { getFolders } from "@/app/lib/folders-store";
import { getLinks } from "@/app/lib/links-store";
import { pageMetadata } from "@/app/lib/metadata";
import FolderTabs from "@/app/ui/folder-tabs";
import LinkGrid from "@/app/ui/link-grid";

// 폴더를 고르면 탭 제목도 "폴더 이름 | 링크"로 바뀐다.
export async function generateMetadata({
  searchParams,
}: PageProps<"/">): Promise<Metadata> {
  const { folder } = await searchParams;
  const name =
    typeof folder === "string"
      ? (await getFolders()).find((f) => f.id === folder)?.name
      : undefined;

  return name
    ? pageMetadata({
        title: name,
        description: `${name} 폴더에 저장한 링크를 모아 봐요.`,
      })
    : pageMetadata({
        title: "내 링크 모음",
        description: "저장한 링크를 폴더별로 한눈에 확인하세요.",
      });
}

export default async function Home({ searchParams }: PageProps<"/">) {
  const { folder } = await searchParams;
  const selectedFolderId = typeof folder === "string" ? folder : null;
  const [links, folders] = await Promise.all([getLinks(), getFolders()]);

  const visibleLinks =
    selectedFolderId === null
      ? links
      : links.filter((link) => link.folderId === selectedFolderId);
  const title =
    folders.find((f) => f.id === selectedFolderId)?.name ?? "전체";

  const counts: Record<string, number> = {};
  for (const link of links) {
    if (link.folderId) counts[link.folderId] = (counts[link.folderId] ?? 0) + 1;
  }

  return (
    <main className="mx-auto flex w-full max-w-[640px] flex-col gap-7 px-5 pt-9 pb-16">
      <div className="flex flex-col gap-1">
        <h1 className="text-[26px] leading-[1.3] font-bold text-[var(--text)]">
          {selectedFolderId === null ? "내 링크 모음" : title}
        </h1>
        <p className="text-[13px] leading-[1.4] text-[var(--text-sub)]">
          {selectedFolderId === null
            ? `저장한 링크 ${visibleLinks.length}개를 한눈에 확인하세요.`
            : `${title} 폴더에 링크 ${visibleLinks.length}개가 있어요.`}
        </p>
      </div>
      <FolderTabs
        folders={folders}
        selectedFolderId={selectedFolderId}
        counts={counts}
        total={links.length}
      />
      <LinkGrid links={visibleLinks} folders={folders} />
    </main>
  );
}
