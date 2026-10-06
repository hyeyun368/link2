import type { Metadata } from "next";
import { pageMetadata } from "@/app/lib/metadata";
import Link from "next/link";
import NewLinkForm from "@/app/ui/new-link-form";

export const metadata: Metadata = pageMetadata({
  title: "새 링크 등록",
  description: "URL만 붙여넣으면 제목과 설명을 자동으로 가져와 링크를 저장해요.",
});

export default function NewLinkPage() {
  return (
    <main className="mx-auto flex w-full max-w-[640px] flex-col gap-7 px-5 pt-9 pb-16">
      <Link
        href="/"
        className="text-link inline-flex w-fit items-center gap-1 text-[14px] font-bold text-[var(--accent)]"
      >
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
          <path d="m15 18-6-6 6-6" />
        </svg>
        목록으로
      </Link>
      <section className="flex flex-col gap-5 rounded-[16px] bg-[var(--card)] p-5 shadow-[var(--shadow-card)] sm:p-7">
        <div className="flex flex-col gap-1">
          <h1 className="text-[26px] leading-[1.3] font-bold text-[var(--text)]">
            새 링크 등록
          </h1>
          <p className="text-[13px] leading-[1.4] text-[var(--text-sub)]">
            URL을 붙여넣으면 제목과 설명을 자동으로 가져와요.
          </p>
        </div>
        <NewLinkForm />
      </section>
    </main>
  );
}
