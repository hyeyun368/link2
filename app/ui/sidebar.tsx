"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { Folder } from "@/app/lib/data";
import { getFolderColor } from "@/app/ui/folder-colors";

export default function Sidebar({ folders }: { folders: Folder[] }) {
  return (
    <aside className="shrink-0 border-b border-zinc-200/80 bg-white/50 px-4 py-3 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/40 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:w-60 md:border-r md:border-b-0 md:px-3 md:py-6">
      <Suspense fallback={<FolderNav folders={folders} />}>
        <ActiveFolderNav folders={folders} />
      </Suspense>
    </aside>
  );
}

function ActiveFolderNav({ folders }: { folders: Folder[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 인덱스 페이지에서만 현재 폴더를 활성화 표시한다.
  const selectedFolderId =
    pathname === "/" ? (searchParams.get("folder") ?? null) : undefined;

  return <FolderNav folders={folders} selectedFolderId={selectedFolderId} />;
}

function FolderNav({
  folders,
  selectedFolderId,
}: {
  folders: Folder[];
  selectedFolderId?: string | null;
}) {
  return (
    <nav className="flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
      <SidebarItem
        label="전체"
        href="/"
        icon={<path d="M3 6h18M3 12h18M3 18h18" />}
        active={selectedFolderId === null}
      />
      <p className="mt-6 mb-1.5 hidden px-3 text-xs font-semibold tracking-wider text-zinc-400 md:block">
        폴더
      </p>
      <ul className="flex gap-1 md:flex-col">
        {folders.map((folder) => (
          <li key={folder.id} className="shrink-0">
            <SidebarItem
              label={folder.name}
              href={`/?folder=${folder.id}`}
              icon={
                <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
              }
              dot={getFolderColor(folder.id).dot}
              active={selectedFolderId === folder.id}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SidebarItem({
  label,
  href,
  icon,
  active,
  dot,
}: {
  label: string;
  href: string;
  icon: React.ReactNode;
  active: boolean;
  dot?: string;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex shrink-0 items-center gap-2.5 rounded-full px-3 py-2 text-sm whitespace-nowrap transition-all duration-200 md:rounded-xl ${
        active
          ? "bg-indigo-50 font-semibold text-indigo-700 ring-1 ring-indigo-100 dark:bg-indigo-500/15 dark:text-indigo-300 dark:ring-indigo-500/20"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`size-4 ${active ? "text-indigo-500 dark:text-indigo-400" : "text-zinc-400 dark:text-zinc-500"}`}
        aria-hidden
      >
        {icon}
      </svg>
      <span className="flex-1">{label}</span>
      {dot && (
        <span className={`hidden size-1.5 rounded-full md:block ${dot}`} />
      )}
    </Link>
  );
}
