import NextLink from "next/link";
import type { Folder, Link } from "@/app/lib/data";
import LinkCard from "@/app/ui/link-card";

export default function LinkGrid({
  links,
  folders,
}: {
  links: Link[];
  folders: Folder[];
}) {
  if (links.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3.5 rounded-[16px] bg-[var(--card)] px-5 py-14 text-center shadow-[var(--shadow-card)]">
        <span className="flex size-14 items-center justify-center rounded-full bg-[var(--sub-accent)] text-2xl">
          🔖
        </span>
        <div className="flex flex-col gap-1">
          <p className="text-[20px] leading-[1.4] font-bold text-[var(--text)]">
            아직 링크가 없어요
          </p>
          <p className="text-[13px] leading-[1.4] text-[var(--text-sub)]">
            자주 찾는 페이지를 저장해 보세요.
          </p>
        </div>
        <NextLink
          href="/new"
          className="btn-primary mt-1 rounded-[12px] bg-[var(--accent)] px-6 py-3.5 text-[16px] font-bold text-white"
        >
          첫 링크 추가하기
        </NextLink>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            link={link}
            folder={folders.find((f) => f.id === link.folderId)}
          />
        </li>
      ))}
    </ul>
  );
}
