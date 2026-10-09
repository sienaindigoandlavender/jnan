"use client";

import { useState } from "react";
import { t } from "@/i18n";
import type { Letter } from "@/content/schema";
import { LetterCard, tint } from "./LetterCard";

/** All the letters. Tap one to open its card; known ones wear a small leaf. */
export function AlphabetGrid({ letters, known }: { letters: Letter[]; known: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const knownSet = new Set(known);
  const current = open === null ? null : letters[open];

  return (
    <>
      <ul className="grid grid-cols-4 gap-2.5 sm:grid-cols-6">
        {letters.map((l, i) => (
          <li key={l.id}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className={`relative flex aspect-square w-full flex-col items-center justify-center rounded-big ${
                knownSet.has(l.id) ? tint(i) : "bg-cloud"
              }`}
            >
              <span className="tif text-[2.25rem] leading-none text-ink">{l.glyph}</span>
              <span className="mt-1 text-[0.9375rem] font-medium text-ink">{l.latin}</span>
              {knownSet.has(l.id) ? (
                <svg
                  viewBox="0 0 20 20"
                  className="absolute end-1.5 top-1.5 size-4"
                  aria-label={t("alphabet.known")}
                >
                  <path d="M3 17 Q3 4 17 3 Q16 17 3 17 Z" fill="#5f9a6b" />
                  <path d="M4 16 L12 8" stroke="#e1f0e0" strokeWidth="1.4" />
                </svg>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      {current ? (
        <div
          className="fixed inset-0 z-20 flex items-end justify-center bg-ink/30"
          onClick={() => setOpen(null)}
        >
          <div
            className="fade-in max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-t-big bg-paper p-5 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <LetterCard letter={current} index={open ?? 0} />
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="btn btn-quiet mt-5 w-full"
            >
              {t("room.done")}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
