import type { Letter, Word } from "@/content/schema";

export type QuizQuestion = {
  id: string;
  /** What progress is recorded against: a letter or word id. */
  itemId: string;
  kind: "sound" | "glyph" | "word";
  /** Message key for the question; `latin` fills {latin} for glyph questions. */
  prompt: "quiz.whichSound" | "quiz.whichGlyph" | "quiz.whatMeans";
  latin?: string;
  /** Shown big: a glyph or a word in Tifinagh. */
  display?: string;
  options: { id: string; label: string; tifinagh?: boolean }[];
  answer: string;
};

function shuffle<T>(a: T[]): T[] {
  const c = [...a];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j]!, c[i]!];
  }
  return c;
}

function pickDistractors<T extends { id: string }>(pool: T[], target: T, n = 3): T[] {
  return shuffle(pool.filter((p) => p.id !== target.id)).slice(0, n);
}

/** Builds a gentle mixed quiz: read a glyph, find a glyph, read a word. */
export function buildQuiz(opts: {
  targets: Letter[];
  pool: Letter[];
  words?: Word[];
  wordPool?: Word[];
  size?: number;
}): QuizQuestion[] {
  const { targets, pool, words = [], wordPool = [], size = 10 } = opts;
  const qs: QuizQuestion[] = [];
  const wordCount = Math.min(words.length, 2);
  shuffle(targets)
    .slice(0, Math.max(1, size - wordCount))
    .forEach((l, i) => {
      const distract = pickDistractors(pool, l);
      if (i % 2 === 0) {
        qs.push({
          id: `sound-${l.id}`,
          itemId: l.id,
          kind: "sound",
          prompt: "quiz.whichSound",
          display: l.glyph,
          options: shuffle([l, ...distract]).map((o) => ({ id: o.id, label: o.latin })),
          answer: l.id,
        });
      } else {
        qs.push({
          id: `glyph-${l.id}`,
          itemId: l.id,
          kind: "glyph",
          prompt: "quiz.whichGlyph",
          latin: l.latin,
          options: shuffle([l, ...distract]).map((o) => ({
            id: o.id,
            label: o.glyph,
            tifinagh: true,
          })),
          answer: l.id,
        });
      }
    });
  for (const w of shuffle(words).slice(0, 2)) {
    const distract = pickDistractors(wordPool.length > 3 ? wordPool : words, w);
    if (distract.length < 2) continue;
    qs.push({
      id: `word-${w.id}`,
      itemId: `word:${w.id}`,
      kind: "word",
      prompt: "quiz.whatMeans",
      display: w.tifinagh,
      options: shuffle([w, ...distract]).map((o) => ({ id: o.id, label: o.meaning })),
      answer: w.id,
    });
  }
  return shuffle(qs);
}
