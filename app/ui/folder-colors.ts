// 폴더마다 고정된 포인트 색 (Tailwind가 클래스를 인식하도록 전체 문자열로 둔다)
// 폴더 id(숫자) 순서대로 돌아가며 색을 정한다.
const folderColors: { badge: string; dot: string }[] = [
  {
    badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
    dot: "bg-indigo-500",
  },
  {
    badge: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
    dot: "bg-rose-500",
  },
  {
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  {
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
];

const fallback = {
  badge: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
  dot: "bg-zinc-400",
};

export function getFolderColor(folderId: string | undefined) {
  const n = Number(folderId);
  if (!folderId || !Number.isInteger(n) || n < 1) return fallback;
  return folderColors[(n - 1) % folderColors.length];
}
