"use client";

import { useEffect, useState } from "react";

// 화면 중앙 상단에 잠깐 떴다가 사라지는 메시지. 기본은 오류(빨강), success는 민트.
// id가 바뀔 때마다 다시 보여준다.
export default function Toast({
  message,
  id,
  tone = "error",
}: {
  message?: string;
  id?: number;
  tone?: "error" | "success";
}) {
  const [hiddenId, setHiddenId] = useState<number | undefined>();

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setHiddenId(id), 3000);
    return () => clearTimeout(timer);
  }, [message, id]);

  const visible = Boolean(message) && hiddenId !== id;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center px-5"
    >
      {visible && (
        <p
          key={id}
          className={`toast-enter rounded-[12px] ${tone === "success" ? "bg-[var(--accent)]" : "bg-[var(--error)]"} px-5 py-3 text-[14px] font-bold text-white shadow-[var(--shadow-card-hover)]`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
