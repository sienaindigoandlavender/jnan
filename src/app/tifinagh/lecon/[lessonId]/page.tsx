import { connection } from "next/server";
import { notFound } from "next/navigation";
import { TopBar } from "@/components/Bits";
import { LessonFlow } from "@/components/LessonFlow";
import { getTifinagh } from "@/content";
import { buildQuiz } from "@/lib/quiz";

export function generateMetadata() {
  return { title: "Tifinagh" };
}

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  await connection(); // a fresh quiz every visit
  const { lessonId } = await params;
  const room = getTifinagh();
  const index = room.lessons.findIndex((l) => l.id === lessonId);
  const lesson = room.lessons[index];
  if (!lesson) notFound();

  const byId = new Map(room.letters.map((l) => [l.id, l]));
  const letters = lesson.letters.map((id) => byId.get(id)!);
  const taughtSoFar = room.lessons
    .slice(0, index + 1)
    .flatMap((l) => l.letters.map((id) => byId.get(id)!));
  const words = room.words.filter((w) => w.lesson === lesson.id);
  const wordPool = room.words.filter((w) =>
    room.lessons.slice(0, index + 1).some((l) => l.id === w.lesson),
  );
  // Distractors come from letters she has met, topped up so there are always four options.
  const pool = taughtSoFar.length >= 4 ? taughtSoFar : room.letters.slice(0, 8);
  const questions = buildQuiz({ targets: letters, pool, words, wordPool });

  return (
    <>
      <TopBar href="/tifinagh" />
      <main className="flex flex-1 flex-col px-5 pt-5">
        <LessonFlow
          room={room.id}
          lesson={lesson}
          letters={letters}
          words={words}
          questions={questions}
          nextLessonId={room.lessons[index + 1]?.id ?? null}
        />
      </main>
    </>
  );
}
