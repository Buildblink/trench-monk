import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null | undefined;

export class SupabaseNotConfiguredError extends Error {
  constructor(message = "Supabase environment variables are not configured.") {
    super(message);
    this.name = "SupabaseNotConfiguredError";
  }
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  );
}

/**
 * Server-only Supabase client using the service role key.
 * Returns null when env vars are missing (persistence disabled).
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  if (cachedClient !== undefined) {
    return cachedClient;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceRoleKey) {
    cachedClient = null;
    return null;
  }

  cachedClient = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return cachedClient;
}

/**
 * Returns a server client or throws when persistence was explicitly required.
 */
export function requireSupabaseServerClient(): SupabaseClient {
  const client = getSupabaseServerClient();
  if (!client) {
    throw new SupabaseNotConfiguredError();
  }
  return client;
}
