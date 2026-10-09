"use client";

import { useState } from "react";
import { recordAnswer } from "@/app/actions";
import { t } from "@/i18n";
import type { QuizQuestion } from "@/lib/quiz";
import { Izem } from "./Izem";

/**
 * One question per screen. A tap answers; the right option turns leaf green,
 * a wrong pick turns soft apricot, and the correct one is shown. No timer.
 */
export function Quiz({
  room,
  questions,
  onDone,
}: {
  room: string;
  questions: QuizQuestion[];
  onDone: (score: number) => void;
}) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const q = questions[i];
  if (!q) return null;

  const answered = picked !== null;
  const right = picked === q.answer;
  const answerLabel = q.options.find((o) => o.id === q.answer)?.label ?? "";
  const answerIsGlyph = q.options.find((o) => o.id === q.answer)?.tifinagh;

  function pick(id: string) {
    if (answered || !q) return;
    setPicked(id);
    const ok = id === q.answer;
    if (ok) setScore((s) => s + 1);
    void recordAnswer(room, q.itemId, ok);
  }

  function next() {
    const last = i === questions.length - 1;
    if (last) return onDone(score);
    setI(i + 1);
    setPicked(null);
  }

  return (
    <div className="fade-in flex flex-col gap-6" key={q.id}>
      <div className="flex items-center gap-3">
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-cloud">
          <div
            className="h-full rounded-full bg-leaf transition-[width] duration-500"
            style={{ width: `${((i + (answered ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-[0.9375rem] font-medium text-ink-soft">
          {t("quiz.count", { current: i + 1, total: questions.length })}
        </span>
      </div>

      <div className="flex flex-col items-center gap-3 rounded-big bg-saffron px-5 py-7 text-center">
        <p className="text-[1.125rem] font-medium text-ink">
          {t(q.prompt, { latin: q.latin ?? "" })}
        </p>
        {q.display ? <p className="tif text-[4.5rem] leading-tight text-ink">{q.display}</p> : null}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {q.options.map((o) => {
          const isAnswer = o.id === q.answer;
          const isPicked = o.id === picked;
          const state = !answered
            ? "bg-paper ring-2 ring-line"
            : isAnswer
              ? "bg-sage ring-2 ring-leaf"
              : isPicked
                ? "bg-apricot ring-2 ring-apricot"
                : "bg-paper ring-2 ring-line opacity-60";
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => pick(o.id)}
              disabled={answered}
              className={`flex min-h-20 items-center justify-center rounded-big px-3 py-3 text-ink ring-inset transition ${state} ${
                o.tifinagh ? "tif text-[2.5rem]" : "text-[1.125rem] font-medium"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>

      {answered ? (
        <div className="fade-in flex items-center gap-3 rounded-big bg-cloud p-4">
          <Izem pose={right ? "cheer" : "sit"} size={64} className="shrink-0" />
          <p className="flex-1 text-[1.0625rem] text-ink">
            {right ? (
              t("quiz.right")
            ) : (
              <>
                {t("quiz.wrong")}{" "}
                <span className={answerIsGlyph ? "tif text-[1.5rem]" : "font-semibold"}>
                  {answerLabel}
                </span>
              </>
            )}
          </p>
          <button type="button" onClick={next} className="btn">
            {i === questions.length - 1 ? t("quiz.finish") : t("quiz.continue")}
          </button>
        </div>
      ) : null}
    </div>
  );
}
