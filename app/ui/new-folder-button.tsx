"use client";

import { useActionState, useRef } from "react";
import { createFolder, type CreateFolderState } from "@/app/lib/actions";

const initialState: CreateFolderState = {};

export default function NewFolderButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, pending] = useActionState(
    async (prevState: CreateFolderState, formData: FormData) => {
      const result = await createFolder(prevState, formData);
      // 저장에 성공하면 입력값을 비우고 모달을 닫는다.
      if (result.ok) {
        formRef.current?.reset();
        dialogRef.current?.close();
      }
      return result;
    },
    initialState,
  );
  const error = state.ok ? undefined : state.error;

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="btn-secondary inline-flex items-center gap-1.5 rounded-[12px] bg-[var(--hover-bg)] px-3.5 py-2 text-[14px] font-bold text-[var(--accent)]"
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
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
          <path d="M12 10v6M9 13h6" />
        </svg>
        새 폴더
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="new-folder-title"
        className="m-auto w-[calc(100%-40px)] max-w-[400px] rounded-[16px] bg-[var(--card)] p-0 text-[var(--text)] shadow-[var(--shadow-card-hover)] backdrop:bg-black/40"
      >
        <form ref={formRef} action={formAction} className="flex flex-col gap-5 p-6">
          <h2
            id="new-folder-title"
            className="text-[20px] leading-[1.4] font-bold text-[var(--text)]"
          >
            새 폴더 만들기
          </h2>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="folder-name"
              className="text-[13px] font-bold text-[var(--text)]"
            >
              폴더 이름
            </label>
            <input
              id="folder-name"
              name="name"
              required
              maxLength={20}
              autoFocus
              placeholder="예: 맛집, 여행"
              aria-invalid={error ? true : undefined}
              aria-describedby="folder-name-error"
              className={`input-field w-full rounded-[10px] border bg-[var(--card)] px-3.5 py-3 text-[16px] text-[var(--text)] placeholder:text-[var(--placeholder)] ${
                error ? "border-[var(--error)]" : "border-[var(--border)]"
              }`}
            />
            <p
              id="folder-name-error"
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
