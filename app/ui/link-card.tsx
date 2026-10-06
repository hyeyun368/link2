import type { Folder, Link } from "@/app/lib/data";

export default function LinkCard({
  link,
  folder,
}: {
  link: Link;
  folder?: Folder;
}) {
  const hostname = new URL(link.url).hostname.replace(/^www\./, "");

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover flex items-center gap-3.5 rounded-[16px] bg-[var(--card)] p-5 shadow-[var(--shadow-card)]"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-[var(--hover-bg)] text-[20px] font-bold text-[var(--accent)] uppercase">
        {hostname[0]}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-[16px] leading-[1.4] font-bold text-[var(--text)]">
            {link.title}
          </h3>
          {folder && (
            <span className="shrink-0 rounded-[8px] bg-[var(--hover-bg)] px-2.5 py-1 text-[13px] leading-none font-bold text-[var(--accent)]">
              {folder.name}
            </span>
          )}
        </div>
        {link.description && (
          <p className="truncate text-[14px] leading-[1.5] text-[var(--text)]/80">
            {link.description}
          </p>
        )}
        <span className="truncate text-[13px] leading-[1.4] text-[var(--text-sub)]">
          {hostname}
        </span>
      </div>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="arrow-hover size-5 shrink-0 text-[var(--text-sub)]"
        aria-hidden
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </a>
  );
}
