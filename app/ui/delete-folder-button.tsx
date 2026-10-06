"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteFolder } from "@/app/lib/actions";

export default function DeleteFolderButton({
  folderId,
  folderName,
  active,
}: {
  folderId: string;
  folderName: string;
  active: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();

  function openConfirm() {
    setError(undefined);
    dialogRef.current?.showModal();
  }

  function confirmDelete() {
    startTransition(async () => {
      const result = await deleteFolder(folderId);
      if (result.error) {
        setError(result.error);
        return;
      }
      dialogRef.current?.close();
      // 보고 있던 폴더를 지웠다면 전체 목록으로 이동한다.
      if (active) router.replace("/");
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={openConfirm}
        aria-label={`${folderName} 폴더 삭제`}
        className="tab-action tab-action-delete flex size-7 items-center justify-center rounded-[8px]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
          aria-hidden
        >
          <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" />
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={`delete-folder-${folderId}`}
        className="m-auto w-[calc(100%-40px)] max-w-[400px] rounded-[16px] bg-[var(--card)] p-0 text-[16px] font-normal text-[var(--text)] shadow-[var(--shadow-card-hover)] backdrop:bg-black/40"
      >
        <div className="flex flex-col gap-5 p-6">
          <div className="flex flex-col items-center gap-3.5 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-[var(--error-bg)] text-[var(--error)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6"
                aria-hidden
              >
                <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" />
              </svg>
            </span>
            <div className="flex flex-col gap-1">
              <h2
                id={`delete-folder-${folderId}`}
                className="text-[20px] leading-[1.4] font-bold text-[var(--text)]"
              >
                폴더를 삭제할까요?
              </h2>
              <p className="text-[14px] leading-[1.5] text-[var(--text-sub)]">
                <strong className="font-bold text-[var(--text)]">
                  {folderName}
                </strong>{" "}
                폴더가 삭제돼요.
                <br />
                폴더 안의 링크는 지워지지 않아요.
              </p>
            </div>
          </div>
          <p
            aria-live="polite"
            className="text-center text-[13px] leading-[1.4] text-[var(--error)] empty:hidden"
          >
            {error}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="btn-secondary flex-1 rounded-[12px] bg-[var(--hover-bg)] px-6 py-3.5 text-[16px] font-bold text-[var(--accent)]"
            >
              취소
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              disabled={pending}
              className="btn-danger flex-1 rounded-[12px] bg-[var(--error)] px-6 py-3.5 text-[16px] font-bold text-white"
            >
              {pending ? "삭제 중..." : "삭제"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
