/**
 * Server-only Supabase adapter (PostgREST + Storage over fetch).
 * Uses SUPABASE_SERVICE_ROLE_KEY (or anon) for auth. When no key is set,
 * public inserts are logged and reported as success.
 *
 * Tables + bucket: see supabase/schema.sql
 */

export type DbResult = { ok: true } | { ok: false; error: string };

export type QueryResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; missingTable?: boolean };

/** Project URL used when NEXT_PUBLIC_SUPABASE_URL is unset or not a URL */
const DEFAULT_SUPABASE_URL = "https://nwiudwwmixzvbmlnacqa.supabase.co";

export const EVENT_IMAGES_BUCKET = "event-images";

function supabaseUrl(): string {
  const candidate =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  return /^https?:\/\//.test(candidate)
    ? candidate.replace(/\/+$/, "")
    : DEFAULT_SUPABASE_URL;
}

function supabaseKey(): string | undefined {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function hasSupabaseEnv(): boolean {
  return Boolean(supabaseKey());
}

function authHeaders(): Record<string, string> {
  const key = supabaseKey()!;
  return { apikey: key, Authorization: `Bearer ${key}` };
}

/** Low-level PostgREST call, e.g. rest("events?select=*", { method: "GET" }) */
export async function rest<T = unknown>(
  path: string,
  init: RequestInit & { prefer?: string } = {}
): Promise<QueryResult<T>> {
  if (!hasSupabaseEnv()) {
    return { ok: false, error: "Supabase is not configured" };
  }

  const { prefer, headers, ...options } = init;

  try {
    const res = await fetch(`${supabaseUrl()}/rest/v1/${path}`, {
      cache: "no-store",
      ...options,
      headers: {
        ...authHeaders(),
        "Content-Type": "application/json",
        ...(prefer ? { Prefer: prefer } : {}),
        ...headers,
      },
    });

    const text = await res.text();
    const body = text ? JSON.parse(text) : null;

    if (!res.ok) {
      console.error(`[db] ${path} failed`, res.status, text);
      return {
        ok: false,
        error: body?.message || "Database request failed",
        missingTable: body?.code === "PGRST205" || body?.code === "42P01",
      };
    }

    return { ok: true, data: body as T };
  } catch (e) {
    console.error(`[db] ${path} error`, e);
    return { ok: false, error: "Database unavailable" };
  }
}

async function insert(
  table: string,
  row: Record<string, unknown>
): Promise<DbResult> {
  if (!hasSupabaseEnv()) {
    console.log(`[db:mock] ${table}`, row);
    return { ok: true };
  }

  const result = await rest(table, {
    method: "POST",
    body: JSON.stringify(row),
    prefer: "return=minimal",
  });

  return result.ok ? { ok: true } : { ok: false, error: result.error };
}

/** Uploads a file to Supabase Storage and returns its public URL */
export async function uploadPublicFile(
  bucket: string,
  objectPath: string,
  file: Blob,
  contentType: string
): Promise<QueryResult<{ url: string }>> {
  if (!hasSupabaseEnv()) {
    return { ok: false, error: "Supabase is not configured" };
  }

  try {
    const res = await fetch(
      `${supabaseUrl()}/storage/v1/object/${bucket}/${objectPath}`,
      {
        method: "POST",
        headers: { ...authHeaders(), "Content-Type": contentType },
        body: file,
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error(`[storage] ${bucket} upload failed`, res.status, text);
      return {
        ok: false,
        error: /bucket not found/i.test(text)
          ? `Storage bucket "${bucket}" is missing — run supabase/schema.sql`
          : "Upload failed",
      };
    }

    return {
      ok: true,
      data: {
        url: `${supabaseUrl()}/storage/v1/object/public/${bucket}/${objectPath}`,
      },
    };
  } catch (e) {
    console.error(`[storage] ${bucket} error`, e);
    return { ok: false, error: "Storage unavailable" };
  }
}

export const db = {
  eventRegistration: (row: Record<string, unknown>) =>
    insert("event_registrations", row),
  contact: (row: Record<string, unknown>) => insert("contacts", row),
  newsletter: (row: Record<string, unknown>) =>
    insert("newsletter_subscribers", row),
  idea: (row: Record<string, unknown>) => insert("idea_submissions", row),
};
