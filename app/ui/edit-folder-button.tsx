"use client";

import { useRef, useState, useTransition } from "react";
import { updateFolder } from "@/app/lib/actions";

export default function EditFolderButton({
  folderId,
  folderName,
}: {
  folderId: string;
  folderName: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState<string>();
  // 열 때마다 폼을 새로 그려 입력값을 현재 이름으로 되돌린다.
  const [formKey, setFormKey] = useState(0);
  const [pending, startTransition] = useTransition();

  function openEditor() {
    setError(undefined);
    setFormKey((key) => key + 1);
    dialogRef.current?.showModal();
  }

  function save(formData: FormData) {
    const name = String(formData.get("name") ?? "");
    startTransition(async () => {
      const result = await updateFolder(folderId, name);
      if (result.error) {
        setError(result.error);
        return;
      }
      dialogRef.current?.close();
    });
  }

  const titleId = `edit-folder-${folderId}`;
  const inputId = `edit-folder-name-${folderId}`;
  const errorId = `edit-folder-error-${folderId}`;

  return (
    <>
      <button
        type="button"
        onClick={openEditor}
        aria-label={`${folderName} 폴더 이름 수정`}
        className="tab-action tab-action-edit flex size-7 items-center justify-center rounded-[8px]"
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
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="m-auto w-[calc(100%-40px)] max-w-[400px] rounded-[16px] bg-[var(--card)] p-0 text-[16px] font-normal text-[var(--text)] shadow-[var(--shadow-card-hover)] backdrop:bg-black/40"
      >
        <form key={formKey} action={save} className="flex flex-col gap-5 p-6">
          <h2
            id={titleId}
            className="text-[20px] leading-[1.4] font-bold text-[var(--text)]"
          >
            폴더 이름 수정
          </h2>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={inputId}
              className="text-[13px] font-bold text-[var(--text)]"
            >
              폴더 이름
            </label>
            <input
              id={inputId}
              name="name"
              required
              maxLength={20}
              autoFocus
              defaultValue={folderName}
              aria-invalid={error ? true : undefined}
              aria-describedby={errorId}
              className={`input-field w-full rounded-[10px] border bg-[var(--card)] px-3.5 py-3 text-[16px] text-[var(--text)] placeholder:text-[var(--placeholder)] ${
                error ? "border-[var(--error)]" : "border-[var(--border)]"
              }`}
            />
            <p
              id={errorId}
              aria-live="polite"
              className="text-[13px] leading-[1.4] text-[var(--error)] empty:hidden"
            >
              {error}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="btn-secondary flex-1 rounded-[12px] bg-[var(--hover-bg)] px-6 py-3.5 text-[16px] font-bold text-[var(--accent)]"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={pending}
              className="btn-primary flex-1 rounded-[12px] bg-[var(--accent)] px-6 py-3.5 text-[16px] font-bold text-white"
            >
              {pending ? "저장 중..." : "저장"}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
