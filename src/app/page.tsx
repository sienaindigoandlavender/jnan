import Link from "next/link";
import { Seed } from "@/components/Bits";
import { Garden } from "@/components/Garden";
import { getTifinagh } from "@/content";
import { t, type MessageKey } from "@/i18n";
import { greetingKey } from "@/lib/greeting";
import { isKnown, loadRoomProgress } from "@/lib/progress";

const SLEEPING: { key: MessageKey; hue: string; bg: string }[] = [
  { key: "corner.darija", hue: "#f4a29a", bg: "bg-petal" },
  { key: "corner.arabic", hue: "#c9b6f2", bg: "bg-lavender" },
  { key: "corner.languages", hue: "#ffd36b", bg: "bg-saffron" },
  { key: "corner.art", hue: "#f7b6cf", bg: "bg-petal" },
  { key: "corner.stoic", hue: "#9fd3a9", bg: "bg-sage" },
  { key: "corner.quantum", hue: "#8fc1ea", bg: "bg-sky" },
  { key: "corner.oracle", hue: "#c9b6f2", bg: "bg-lavender" },
  { key: "corner.green", hue: "#7cbf8a", bg: "bg-sage" },
  { key: "corner.journals", hue: "#f4a29a", bg: "bg-apricot" },
  { key: "corner.money", hue: "#ffd36b", bg: "bg-saffron" },
];

export default async function Home() {
  const room = getTifinagh();
  const progress = await loadRoomProgress(room.id);
  const known = room.letters.filter((l) => isKnown(progress.items.get(l.id))).length;
  const nextLesson = room.lessons.find((l) => !progress.lessonsDone.has(l.id));
  const started = progress.lessonsDone.size > 0;

  return (
    <main className="flex flex-1 flex-col gap-7 px-5 pt-8 pb-12">
      <header>
        <p className="title text-[1.5rem] text-leaf">{t("app.name")}</p>
        <h1 className="title text-[2.75rem] text-ink">{t(greetingKey())}</h1>
        <p className="text-[1.125rem] text-ink-soft">{t("home.sub")}</p>
      </header>

      <section className="flex flex-col gap-3">
        <Garden bloomed={known} />
        <p className="text-center text-[1rem] font-medium text-ink-soft">
          {t("home.growing", { count: known, total: room.letters.length })}
        </p>
      </section>

      <Link
        href={nextLesson ? `/tifinagh/lecon/${nextLesson.id}` : "/tifinagh"}
        className="flex items-center gap-4 rounded-big bg-saffron p-5"
      >
        <span className="tif flex size-16 shrink-0 items-center justify-center rounded-full bg-paper text-[2.25rem] text-ink">
          ⵣ
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="title text-[1.75rem] text-ink">{t("corner.tifinagh")}</span>
          <span className="text-[1rem] text-ink">
            {nextLesson
              ? started
                ? t("home.resume", { title: nextLesson.title })
                : t("home.letGo")
              : t("home.allDone")}
          </span>
        </span>
      </Link>

      <section className="flex flex-col gap-3">
        <h2 className="title text-[1.75rem] text-ink">{t("home.corners")}</h2>
        <ul className="grid grid-cols-2 gap-2.5">
          {SLEEPING.map((c) => (
            <li key={c.key} className={`flex flex-col gap-1 rounded-big p-4 ${c.bg}`}>
              <Seed hue={c.hue} />
              <span className="font-semibold leading-snug text-ink">{t(c.key)}</span>
              <span className="text-[0.9375rem] text-ink-soft">{t("home.soon")}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
