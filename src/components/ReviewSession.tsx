"use client";

import Link from "next/link";
import { useState } from "react";
import { t } from "@/i18n";
import type { QuizQuestion } from "@/lib/quiz";
import { Izem } from "./Izem";
import { Quiz } from "./Quiz";

export function ReviewSession({ room, questions }: { room: string; questions: QuizQuestion[] }) {
  const [phase, setPhase] = useState<"intro" | "quiz" | "done">("intro");

  if (phase === "quiz")
    return <Quiz room={room} questions={questions} onDone={() => setPhase("done")} />;

  return (
    <div className="fade-in flex flex-col items-center gap-5 pt-4 text-center">
      <Izem pose={phase === "done" ? "cheer" : "sit"} size={180} />
      <p className="title text-[2rem] text-ink">
        {phase === "done" ? t("review.done") : t("review.intro", { count: questions.length })}
      </p>
      {phase === "done" ? (
        <Link href="/tifinagh" className="btn w-full">
          {t("lesson.backToRoom")}
        </Link>
      ) : (
        <button type="button" onClick={() => setPhase("quiz")} className="btn w-full">
          {t("review.start")}
        </button>
      )}
    </div>
  );
}
