import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

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

  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json({ services });
}

export async function POST(req: Request) {
  const session = await assertAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const service = await prisma.service.create({
      data: {
        key: body.key || slugify(body.title || ""),
        title: body.title,
        description: body.description || null,
        category: body.category || null,
        active: body.active === true,
        order: body.order ?? 0,
      },
    });
    return NextResponse.json({ ok: true, service });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
  }
}
