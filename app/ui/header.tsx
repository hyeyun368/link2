import Link from "next/link";
import AddLinkButton from "@/app/ui/add-link-button";
import NewFolderButton from "@/app/ui/new-folder-button";

// 오른쪽 상단 버튼은 로그인했을 때만 보여준다.
export default function Header({ loggedIn }: { loggedIn: boolean }) {
  return (
    <header className="sticky top-0 z-10 bg-[var(--card)] shadow-[var(--shadow-nav)]">
      <div className="flex h-14 items-center justify-between px-5">
        <Link href="/" className="text-link flex items-center gap-2">
          <span className="relative flex size-8 items-center justify-center rounded-[10px] bg-[var(--accent-bright)] text-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
              aria-hidden
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2 border-[var(--card)] bg-[var(--sub-accent)]" />
          </span>
          <span className="text-[20px] font-bold text-[var(--text)]">링크</span>
        </Link>
        {loggedIn && (
          <div className="flex items-center gap-2">
            <NewFolderButton />
            <AddLinkButton />
          </div>
        )}
      </div>
    </header>
  );
}
