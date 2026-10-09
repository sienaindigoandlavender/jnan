"use server";

import { revalidatePath } from "next/cache";
import { dueAt, nextBox } from "@/lib/review";
import { db } from "@/lib/supabase/server";

async function log(room: string, type: string, data: Record<string, unknown>) {
  try {
    await db()?.from("jnan_events").insert({ room, type, data });
  } catch {
    // the journal never interrupts learning
  }
}

/** One answer about one item (a letter, a word). Moves it between review boxes. */
export async function recordAnswer(room: string, itemId: string, correct: boolean): Promise<void> {
  const client = db();
  if (!client) return;
  const { data } = await client
    .from("jnan_progress")
    .select("box, seen, correct, wrong")
    .eq("room", room)
    .eq("item_id", itemId)
    .maybeSingle();
  const box = nextBox(data?.box ?? 0, correct);
  await client.from("jnan_progress").upsert({
    room,
    item_id: itemId,
    box,
    due_at: dueAt(box),
    seen: (data?.seen ?? 0) + 1,
    correct: (data?.correct ?? 0) + (correct ? 1 : 0),
    wrong: (data?.wrong ?? 0) + (correct ? 0 : 1),
    updated_at: new Date().toISOString(),
  });
  await log(room, "answer", { itemId, correct });
}

export async function completeLesson(room: string, lessonId: string): Promise<void> {
  const client = db();
  if (!client) return;
  await client
    .from("jnan_lessons")
    .upsert({ room, lesson_id: lessonId, completed_at: new Date().toISOString() });
  await log(room, "lesson_complete", { lessonId });
  revalidatePath("/", "layout");
}
