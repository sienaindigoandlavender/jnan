import fs from "node:fs";
import path from "node:path";
import { scriptRoomSchema, type ScriptRoom } from "./schema";

const ROOT = path.join(process.cwd(), "content", "rooms");

/** Reads and validates a script room (an alphabet to learn), e.g. "tifinagh". */
export function readScriptRoom(id: string): ScriptRoom {
  const file = path.join(ROOT, `${id}.json`);
  return scriptRoomSchema.parse(JSON.parse(fs.readFileSync(file, "utf8")));
}

/** Cross-checks a room: lessons point to real letters, every letter is taught once. */
export function checkScriptRoom(room: ScriptRoom): string[] {
  const errors: string[] = [];
  const letters = new Set(room.letters.map((l) => l.id));
  const lessons = new Set(room.lessons.map((l) => l.id));
  const taught = new Map<string, string>();
  for (const lesson of room.lessons) {
    for (const id of lesson.letters) {
      if (!letters.has(id)) errors.push(`lesson ${lesson.id}: unknown letter "${id}"`);
      if (taught.has(id))
        errors.push(`letter "${id}" taught twice (${taught.get(id)}, ${lesson.id})`);
      taught.set(id, lesson.id);
    }
  }
  for (const id of letters) if (!taught.has(id)) errors.push(`letter "${id}" is never taught`);
  for (const w of room.words) {
    if (!lessons.has(w.lesson)) errors.push(`word ${w.id}: unknown lesson "${w.lesson}"`);
  }
  return errors;
}
