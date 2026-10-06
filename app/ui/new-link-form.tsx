"use client";

import { useActionState } from "react";
import { createLink, type CreateLinkState } from "@/app/lib/actions";

const initialState: CreateLinkState = {};

export default function NewLinkForm() {
  const [state, formAction, pending] = useActionState(createLink, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3.5">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="url"
          className="text-[13px] font-bold text-[var(--text)]"
        >
          링크 URL
        </label>
        <input
          id="url"
          name="url"
          type="url"
          required
          placeholder="https://example.com"
          aria-invalid={state.error ? true : undefined}
          aria-describedby="url-error"
          className={`input-field w-full rounded-[10px] border bg-[var(--card)] px-3.5 py-3 text-[16px] text-[var(--text)] placeholder:text-[var(--placeholder)] ${
            state.error ? "border-[var(--error)]" : "border-[var(--border)]"
          }`}
        />
        <p
          id="url-error"
          aria-live="polite"
          className="text-[13px] leading-[1.4] text-[var(--error)] empty:hidden"
        >
          {state.error}
        </p>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="btn-primary w-full rounded-[12px] bg-[var(--accent)] px-6 py-3.5 text-[16px] font-bold text-white"
      >
        {pending ? "저장 중..." : "저장하기"}
      </button>
    </form>
  );
}
