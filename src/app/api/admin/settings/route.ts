import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

async function assertAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("gingerly_admin_session")?.value;
  if (!token) return null;
  return getSession(token);
}

export async function GET() {
  const session = await assertAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const settings = await prisma.setting.findMany();
  return NextResponse.json({ settings });
}

export async function POST(req: Request) {
  const session = await assertAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    for (const [key, value] of Object.entries(body)) {
      await prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
  }
}
