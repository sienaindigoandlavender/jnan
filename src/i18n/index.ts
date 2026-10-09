import { en, type MessageKey } from "./en";

export type { MessageKey };

/** Translate a key, filling `{placeholders}`. */
export function t(key: MessageKey, params?: Record<string, string | number>): string {
  let s: string = en[key];
  if (params) for (const [k, v] of Object.entries(params)) s = s.replaceAll(`{${k}}`, String(v));
  return s;
}
