import "server-only";
import { connection } from "next/server";
import { db } from "@/lib/supabase/server";

export type ItemState = { box: number; due_at: string | null; seen: number; correct: number };
export type RoomProgress = {
  lessonsDone: Set<string>;
  items: Map<string, ItemState>;
  lastActivity: string | null;
};

/** Everything learnt in one room. Always read fresh. */
export async function loadRoomProgress(room: string): Promise<RoomProgress> {
  await connection();
  const empty: RoomProgress = { lessonsDone: new Set(), items: new Map(), lastActivity: null };
  const client = db();
  if (!client) return empty;
  const [lessons, items] = await Promise.all([
    client.from("jnan_lessons").select("lesson_id, completed_at").eq("room", room),
    client
      .from("jnan_progress")
      .select("item_id, box, due_at, seen, correct, updated_at")
      .eq("room", room),
  ]);
  if (lessons.error || items.error) return empty;
  let last: string | null = null;
  for (const r of [...(lessons.data ?? []), ...(items.data ?? [])] as {
    completed_at?: string;
    updated_at?: string;
  }[]) {
    const at = r.completed_at ?? r.updated_at ?? null;
    if (at && (!last || at > last)) last = at;
  }
  return {
    lessonsDone: new Set((lessons.data ?? []).map((r) => r.lesson_id as string)),
    items: new Map(
      (items.data ?? []).map((r) => [
        r.item_id as string,
        {
          box: r.box as number,
          due_at: r.due_at as string | null,
          seen: r.seen as number,
          correct: r.correct as number,
        },
      ]),
    ),
    lastActivity: last,
  };
}

/** A letter blooms the first time she reads it right, and never wilts. */
export const isKnown = (s: ItemState | undefined) => (s?.correct ?? 0) > 0;

/** Items whose next visit has arrived. */
export function dueItems(p: RoomProgress, now = Date.now()): string[] {
  return [...p.items.entries()]
    .filter(([, s]) => s.due_at && Date.parse(s.due_at) <= now)
    .map(([id]) => id);
}
