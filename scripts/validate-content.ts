import fs from "node:fs";
import path from "node:path";
import { checkScriptRoom, readScriptRoom } from "@/content/load";

let failed = false;
const dir = path.join(process.cwd(), "content", "rooms");
for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  const id = file.replace(/\.json$/, "");
  try {
    const room = readScriptRoom(id);
    const errors = checkScriptRoom(room);
    if (errors.length) {
      failed = true;
      console.error(`✗ ${id}: ${errors.join("; ")}`);
    } else {
      console.log(
        `✓ ${id}: ${room.letters.length} letters, ${room.lessons.length} lessons, ${room.words.length} words`,
      );
    }
  } catch (err) {
    failed = true;
    console.error(`✗ ${id}: ${err instanceof Error ? err.message : String(err)}`);
  }
}
process.exit(failed ? 1 : 0);
