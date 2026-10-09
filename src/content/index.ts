import "server-only";
import { cache } from "react";
import { readScriptRoom } from "./load";

export const getTifinagh = cache(() => readScriptRoom("tifinagh"));
export * from "./schema";
