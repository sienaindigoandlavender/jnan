"use client";

import Link from "next/link";
import { useState } from "react";
import { completeLesson } from "@/app/actions";
import { t } from "@/i18n";
import type { Lesson, Letter, Word } from "@/content/schema";
import type { QuizQuestion } from "@/lib/quiz";
import { Izem } from "./Izem";
import { LetterCard } from "./LetterCard";
import { Quiz } from "./Quiz";

type Step =
  | { kind: "intro" }
  | { kind: "letter"; letter: Letter; index: number }
  | { kind: "words" }
  | { kind: "quizIntro" }
  | { kind: "quiz" }
  | { kind: "done" };

/** A lesson: hello, meet each letter, read a few words, play, done. */
export function LessonFlow({
  room,
  lesson,
  letters,
  words,
  questions,
  nextLessonId,
}: {
  room: string;
  lesson: Lesson;
  letters: Letter[];
  words: Word[];
  questions: QuizQuestion[];
  nextLessonId: string | null;
}) {
  const steps: Step[] = [
    { kind: "intro" },
    ...letters.map((letter, index) => ({ kind: "letter" as const, letter, index })),
    ...(words.length ? [{ kind: "words" as const }] : []),
    { kind: "quizIntro" },
    { kind: "quiz" },
    { kind: "done" },
  ];
  const [at, setAt] = useState(0);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const step = steps[at]!;
  const next = () => setAt((a) => Math.min(a + 1, steps.length - 1));
  const learnSteps = steps.length - 2; // the quiz and the end don't count on the bar

  return (
    <div className="flex flex-1 flex-col gap-6">
      {at < learnSteps ? (
        <div className="h-2.5 overflow-hidden rounded-full bg-cloud" aria-hidden>
          <div
            className="h-full rounded-full bg-clay transition-[width] duration-500"
            style={{ width: `${((at + 1) / learnSteps) * 100}%` }}
          />
        </div>
      ) : null}

      <div key={at} className="fade-in flex flex-1 flex-col gap-6">
        {step.kind === "intro" ? (
          <>
            <div className="flex justify-center pt-4">
              <Izem pose="hello" size={190} />
            </div>
            <h1 className="title text-center text-[2.5rem] text-ink">{lesson.title}</h1>
            <p className="text-center text-[1.125rem] text-ink">{lesson.intro}</p>
            <div className="flex justify-center gap-2">
              {letters.map((l) => (
                <span
                  key={l.id}
                  className="tif flex size-12 items-center justify-center rounded-full bg-saffron text-[1.75rem] text-ink"
                >
                  {l.glyph}
                </span>
              ))}
            </div>
          </>
        ) : null}

        {step.kind === "letter" ? <LetterCard letter={step.letter} index={step.index} /> : null}

        {step.kind === "words" ? (
          <>
            <div>
              <h2 className="title text-[2rem] text-ink">{t("lesson.readTitle")}</h2>
              <p className="text-[1.0625rem] text-ink-soft">{t("lesson.readHint")}</p>
            </div>
            <ul className="flex flex-col gap-3">
              {words.map((w) => {
                const open = revealed.has(w.id);
                return (
                  <li key={w.id}>
                    <button
                      type="button"
                      onClick={() => setRevealed((r) => new Set(r).add(w.id))}
                      className="flex w-full items-center justify-between gap-3 rounded-big bg-lavender px-5 py-4 text-start"
                    >
                      <span className="tif text-[2.25rem] leading-tight text-ink">
                        {w.tifinagh}
                      </span>
                      {open ? (
                        <span className="fade-in text-end">
                          <span className="block font-semibold text-ink">{w.latin}</span>
                          <span className="block text-ink-soft">{w.meaning}</span>
                        </span>
                      ) : (
                        <span className="pill bg-paper text-ink">{t("lesson.reveal")}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        ) : null}

        {step.kind === "quizIntro" ? (
          <>
            <div className="flex justify-center pt-4">
              <Izem pose="sit" size={170} />
            </div>
            <h2 className="title text-center text-[2.25rem] text-ink">{t("lesson.quizTitle")}</h2>
            <p className="text-center text-[1.125rem] text-ink">
              {t("lesson.quizIntro", { count: questions.length })}
            </p>
          </>
        ) : null}

        {step.kind === "quiz" ? (
          <Quiz
            room={room}
            questions={questions}
            onDone={() => {
              void completeLesson(room, lesson.id);
              next();
            }}
          />
        ) : null}

        {step.kind === "done" ? (
          <div className="flex flex-col items-center gap-5 pt-6 text-center">
            <Izem pose="cheer" size={200} />
            <h2 className="title text-[2.75rem] text-ink">{t("lesson.doneTitle")}</h2>
            <p className="text-[1.125rem] text-ink">{t("lesson.doneBody")}</p>
            <div className="flex w-full flex-col gap-3 pt-2">
              {nextLessonId ? (
                <Link href={`/tifinagh/lecon/${nextLessonId}`} className="btn">
                  {t("lesson.nextLesson")}
                </Link>
              ) : null}
              <Link href="/tifinagh" className="btn btn-quiet">
                {t("lesson.backToRoom")}
              </Link>
            </div>
          </div>
        ) : null}
      </div>

      {step.kind !== "quiz" && step.kind !== "done" ? (
        <div className="sticky bottom-0 -mx-5 mt-auto bg-paper/95 px-5 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <button type="button" onClick={next} className="btn w-full">
            {step.kind === "intro"
              ? t("lesson.start")
              : step.kind === "quizIntro"
                ? t("lesson.quizStart")
                : t("lesson.next")}
          </button>
        </div>
      ) : null}
    </div>
  );
}
