import Link from "next/link";

// 로그인/회원가입 공통 UI.

export function AuthLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="relative flex size-12 items-center justify-center rounded-[14px] bg-[var(--accent-bright)] text-white">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6"
          aria-hidden
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        <span className="absolute -top-0.5 -right-0.5 size-3 rounded-full border-2 border-[var(--card)] bg-[var(--sub-accent)]" />
      </span>
      <span className="text-[26px] leading-[1.3] font-bold text-[var(--text)]">
        링크
      </span>
    </div>
  );
}

export function AuthField({
  id,
  label,
  type,
  placeholder,
  autoComplete,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type: "email" | "password";
  placeholder: string;
  autoComplete: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-bold text-[var(--text)]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange && ((e) => onChange(e.target.value))}
        className="input-field w-full rounded-[10px] border border-[var(--border)] bg-[var(--card)] px-3.5 py-3 text-[16px] text-[var(--text)] placeholder:text-[var(--placeholder)]"
      />
    </div>
  );
}

// type을 주지 않으면 아무 동작도 하지 않는 버튼이 된다.
export function AuthButton({
  children,
  type = "button",
  disabled,
}: {
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="btn-primary w-full rounded-[12px] bg-[var(--accent)] px-6 py-3.5 text-[16px] font-bold text-white"
    >
      {children}
    </button>
  );
}

export function AuthSwitch({
  text,
  href,
  linkText,
}: {
  text: string;
  href: string;
  linkText: string;
}) {
  return (
    <p className="text-center text-[13px] leading-[1.4] text-[var(--text-sub)]">
      {text}{" "}
      <Link href={href} className="text-link font-bold text-[var(--accent)]">
        {linkText}
      </Link>
    </p>
  );
}
