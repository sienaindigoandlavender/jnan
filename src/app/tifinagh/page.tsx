import Link from "next/link";
import { Page, TopBar } from "@/components/Bits";
import { Izem } from "@/components/Izem";
import { tint } from "@/components/LetterCard";
import { getTifinagh } from "@/content";
import { t } from "@/i18n";
import { dueItems, isKnown, loadRoomProgress } from "@/lib/progress";

export default async function TifinaghRoom() {
  const room = getTifinagh();
  const progress = await loadRoomProgress(room.id);
  const known = room.letters.filter((l) => isKnown(progress.items.get(l.id))).length;
  const due = dueItems(progress).filter((id) => !id.startsWith("word:")).length;
  const current = room.lessons.find((l) => !progress.lessonsDone.has(l.id))?.id;
  const glyph = new Map(room.letters.map((l) => [l.id, l.glyph]));

  return (
    <>
      <TopBar href="/" label={t("nav.garden")} />
      <Page>
        <header className="flex items-end gap-3">
          <div className="flex min-w-0 flex-1 flex-col">
            <h1 className="title mb-2 text-[3rem] text-ink">{room.title}</h1>
            <p className="text-[1.0625rem] text-ink">{room.tagline}</p>
            <p className="mt-3 text-[1rem] font-medium text-ink-soft">
              {t("room.progress", { known, total: room.letters.length })}
            </p>
          </div>
          <Izem pose={due ? "hello" : "sit"} size={120} className="shrink-0" />
        </header>

        <section className="flex flex-col gap-3">
          <h2 className="title text-[1.75rem] text-ink">{t("room.lessons")}</h2>
          <ol className="flex flex-col gap-2.5">
            {room.lessons.map((lesson, i) => {
              const done = progress.lessonsDone.has(lesson.id);
              const isCurrent = lesson.id === current;
              return (
                <li key={lesson.id}>
                  <Link
                    href={`/tifinagh/lecon/${lesson.id}`}
                    className={`flex items-center gap-4 rounded-big p-4 ${
                      isCurrent
                        ? tint(i)
                        : done
                          ? "bg-cloud"
                          : "bg-paper ring-2 ring-line ring-inset"
                    }`}
                  >
                    <span className="title flex size-11 shrink-0 items-center justify-center rounded-full bg-paper text-[1.5rem] text-ink">
                      {done ? (
                        <svg viewBox="0 0 20 20" className="size-5" aria-label={t("room.done")}>
                          <path
                            d="M4 10.5 L8.5 15 L16 6"
                            stroke="#5f9a6b"
                            strokeWidth="2.6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="font-semibold text-ink">{lesson.title}</span>
                      <span className="tif text-[1.5rem] leading-snug tracking-wide text-ink">
                        {lesson.letters.map((id) => glyph.get(id)).join(" ")}
                      </span>
                    </span>
                    {isCurrent ? (
                      <span className="pill bg-paper text-ink">{t("room.next")}</span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="grid grid-cols-2 gap-2.5">
          <Link href="/tifinagh/revision" className="flex flex-col gap-1 rounded-big bg-sky p-4">
            <span className="title text-[1.5rem] text-ink">{t("room.review")}</span>
            <span className="text-[0.9375rem] text-ink">
              {due ? t("room.reviewDue", { count: due }) : t("room.reviewNone")}
            </span>
          </Link>
          <Link
            href="/tifinagh/alphabet"
            className="flex flex-col gap-1 rounded-big bg-lavender p-4"
          >
            <span className="title text-[1.5rem] text-ink">{t("room.alphabet")}</span>
            <span className="text-[0.9375rem] text-ink">{t("room.alphabetSub")}</span>
          </Link>
        </section>
      </Page>
    </>
  );
}
