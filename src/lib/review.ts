const DAY = 24 * 60 * 60 * 1000;
/** Box n comes back after INTERVALS[n] days. Box 5 is "mastered" but still visits now and then. */
export const INTERVALS = [0, 1, 2, 4, 8, 16];

/** Gentle Leitner step: right moves up one box, wrong steps back one (never to zero). */
export function nextBox(box: number, correct: boolean): number {
  if (correct) return Math.min(box + 1, INTERVALS.length - 1);
  return Math.max(1, box - 1);
}

export function dueAt(box: number, now = Date.now()): string {
  return new Date(now + (INTERVALS[box] ?? 1) * DAY).toISOString();
}
