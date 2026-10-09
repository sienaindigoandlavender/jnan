import { t } from "@/i18n";
import type { Letter } from "@/content/schema";

const TINTS = ["bg-petal", "bg-lavender", "bg-sky", "bg-sage", "bg-apricot", "bg-saffron"];
export const tint = (i: number) => TINTS[i % TINTS.length]!;

/** One letter, big and friendly: glyph, sound, name and a little story. */
export function LetterCard({ letter, index }: { letter: Letter; index: number }) {
  return (
    <article className="flex flex-col gap-5">
      <div
        className={`flex aspect-[4/3] flex-col items-center justify-center rounded-big ${tint(index)}`}
      >
        <span className="tif text-[8rem] leading-none text-ink">{letter.glyph}</span>
        <span className="title mt-2 text-[2.25rem] text-ink">{letter.latin}</span>
      </div>
      <dl className="flex flex-col gap-4">
        <div>
          <dt className="text-[0.9375rem] font-semibold text-ink-soft">{t("lesson.sound")}</dt>
          <dd className="text-[1.125rem] text-ink">{letter.sound}</dd>
        </div>
        <div>
          <dt className="text-[0.9375rem] font-semibold text-ink-soft">{t("lesson.story")}</dt>
          <dd className="title text-[1.5rem] leading-snug text-ink">{letter.story}</dd>
        </div>
        <div>
          <dt className="text-[0.9375rem] font-semibold text-ink-soft">{t("lesson.name")}</dt>
          <dd className="text-[1.125rem] text-ink">{letter.name}</dd>
        </div>
      </dl>
    </article>
  );
}
