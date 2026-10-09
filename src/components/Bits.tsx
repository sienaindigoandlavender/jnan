import Link from "next/link";
import { t } from "@/i18n";

/** A tiny sprout in a mound: a corner of the garden that hasn't opened yet. */
export function Seed({ hue = "#7cbf8a" }: { hue?: string }) {
  return (
    <svg viewBox="0 0 48 40" className="h-9 w-11" aria-hidden>
      <ellipse cx="24" cy="32" rx="18" ry="6.5" fill="#d9c3ae" />
      <path
        d="M24 30 Q22 18 28 10"
        stroke="#5f9a6b"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="32" cy="9" rx="7" ry="4" fill={hue} transform="rotate(-28 32 9)" />
      <ellipse cx="19" cy="18" rx="5.5" ry="3.2" fill={hue} transform="rotate(30 19 18)" />
    </svg>
  );
}

/** Top bar for inner pages: a soft way back. */
export function TopBar({ href, label }: { href: string; label?: string }) {
  return (
    <header className="flex h-[3.75rem] items-end px-5">
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 rounded-full bg-cloud px-4 py-2 font-medium text-ink"
      >
        <svg viewBox="0 0 20 20" className="size-4 rtl:rotate-180" aria-hidden>
          <path
            d="M12.5 4 L6.5 10 L12.5 16"
            stroke="currentColor"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {label ?? t("nav.back")}
      </Link>
    </header>
  );
}

export function Page({ children }: { children: React.ReactNode }) {
  return <main className="flex flex-1 flex-col gap-7 px-5 pt-5 pb-12">{children}</main>;
}
