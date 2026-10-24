/**
 * Optional Supabase adapter.
 * When NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (or anon) are set,
 * inserts go to Supabase. Otherwise we log and return success.
 *
 * Tables expected (see README):
 * - event_registrations
 * - contacts
 * - newsletter_subscribers
 */

export type DbResult = { ok: true } | { ok: false; error: string };

function hasSupabaseEnv(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

async function insert(
  table: string,
  row: Record<string, unknown>
): Promise<DbResult> {
  if (!hasSupabaseEnv()) {
    console.log(`[db:mock] ${table}`, row);
    return { ok: true };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  try {
    const res = await fetch(`${url}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`[db] ${table} insert failed`, res.status, text);
      return { ok: false, error: "Database insert failed" };
    }

    return { ok: true };
  } catch (e) {
    console.error(`[db] ${table} error`, e);
    return { ok: false, error: "Database unavailable" };
  }
}

export const db = {
  eventRegistration: (row: Record<string, unknown>) =>
    insert("event_registrations", row),
  contact: (row: Record<string, unknown>) => insert("contacts", row),
  newsletter: (row: Record<string, unknown>) =>
    insert("newsletter_subscribers", row),
};
