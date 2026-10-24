import { NextResponse } from "next/server";
import { eventRegisterSchema } from "@/lib/validators";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { db } from "@/lib/supabase";

export async function POST(request: Request) {
  const ip = clientIp(request);
  const rl = rateLimit(`register:${ip}`, 5, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    if (body.website && String(body.website).length > 0) {
      return NextResponse.json({ ok: true, message: "Registration received" });
    }

    const parsed = eventRegisterSchema.safeParse(body);
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

    const { website: _hp, ...data } = parsed.data;
    const result = await db.eventRegistration({
      ...data,
      created_at: new Date().toISOString(),
    });

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Registration received",
      registrationId: `reg_${Date.now()}`,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
