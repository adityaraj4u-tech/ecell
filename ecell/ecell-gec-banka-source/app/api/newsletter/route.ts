import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validators";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { db } from "@/lib/supabase";

export async function POST(request: Request) {
  const ip = clientIp(request);
  const rl = rateLimit(`newsletter:${ip}`, 5, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    if (body.website && String(body.website).length > 0) {
      return NextResponse.json({ ok: true, message: "Subscribed" });
    }

    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Validation failed",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const result = await db.newsletter({
      email: parsed.data.email,
      created_at: new Date().toISOString(),
    });

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, message: "Subscribed" });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
