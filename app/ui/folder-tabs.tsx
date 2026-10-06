import Link from "next/link";
import type { Folder } from "@/app/lib/data";
import DeleteFolderButton from "@/app/ui/delete-folder-button";
import EditFolderButton from "@/app/ui/edit-folder-button";

export default function FolderTabs({
  folders,
  selectedFolderId,
  counts,
  total,
}: {
  folders: Folder[];
  selectedFolderId: string | null;
  counts: Record<string, number>;
  total: number;
}) {
  const tabs = [
    { id: null, name: "전체", count: total },
    ...folders.map((f) => ({ id: f.id, name: f.name, count: counts[f.id] ?? 0 })),
  ];

  return (
    <nav aria-label="폴더" className="-mx-5 overflow-x-auto px-5 py-1">
      <ul className="flex gap-2">
        {tabs.map((tab) => {
          const active = tab.id === selectedFolderId;
          return (
            <li
              key={tab.id ?? "all"}
              className={`tab-wrap flex shrink-0 items-center rounded-[12px] text-[14px] font-bold ${
                active
                  ? "bg-[var(--accent)] text-white"
                  : "tab-item bg-[var(--card)] text-[var(--text)] shadow-[var(--shadow-card)]"
              }`}
            >
              <Link
                href={tab.id ? `/?folder=${tab.id}` : "/"}
                aria-current={active ? "page" : undefined}
                className="flex items-center gap-1.5 px-4 py-2 whitespace-nowrap"
              >
                {tab.name}
                <span
                  className={`text-[13px] ${active ? "text-white/90" : "text-[var(--text-sub)]"}`}
                >
                  {tab.count}
                </span>
              </Link>
              {/* "전체"는 수정·삭제할 수 없다 */}
              {tab.id && (
                <span className="tab-actions">
                  <span className="flex items-center gap-0.5 pr-1.5">
                    <EditFolderButton folderId={tab.id} folderName={tab.name} />
                    <DeleteFolderButton
                      folderId={tab.id}
                      folderName={tab.name}
                      active={active}
                    />
                  </span>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
