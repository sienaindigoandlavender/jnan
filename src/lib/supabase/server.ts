import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Single-person app: the server talks to Supabase with the service-role key.
 * If the env vars are missing, Jnan still works; progress just isn't saved.
 */
export function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
