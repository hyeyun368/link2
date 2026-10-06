import Link from "next/link";

export default function AddLinkButton() {
  return (
    <Link
      href="/new"
      aria-label="링크 추가"
      className="btn-secondary inline-flex items-center gap-1.5 rounded-[12px] bg-[var(--hover-bg)] px-3.5 py-2 text-[14px] font-bold text-[var(--accent)]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        className="size-4"
        aria-hidden
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
      링크 추가
    </Link>
  );
}
