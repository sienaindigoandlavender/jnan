import { Page, TopBar } from "@/components/Bits";
import { Izem } from "@/components/Izem";
import { ReviewSession } from "@/components/ReviewSession";
import { getTifinagh } from "@/content";
import { t } from "@/i18n";
import { dueItems, loadRoomProgress } from "@/lib/progress";
import { buildQuiz } from "@/lib/quiz";

export default async function ReviewPage() {
  const room = getTifinagh();
  const progress = await loadRoomProgress(room.id);
  const due = new Set(dueItems(progress));
  const targets = room.letters.filter((l) => due.has(l.id)).slice(0, 12);
  const words = room.words.filter((w) => due.has(`word:${w.id}`));
  const met = room.letters.filter((l) => progress.items.has(l.id));
  const pool = met.length >= 4 ? met : room.letters;
  const questions = targets.length
    ? buildQuiz({ targets, pool, words, wordPool: room.words, size: 14 })
    : [];

  return (
    <>
      <TopBar href="/tifinagh" />
      <Page>
        <h1 className="title text-[2.75rem] text-ink">{t("review.title")}</h1>
        {questions.length ? (
          <ReviewSession room={room.id} questions={questions} />
        ) : (
          <div className="flex flex-col items-center gap-4 pt-6 text-center">
            <Izem pose="sleep" size={190} />
            <p className="title text-[1.75rem] text-ink">{t("review.empty")}</p>
          </div>
        )}
      </Page>
    </>
  );
}
