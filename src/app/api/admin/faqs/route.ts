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

  const faqs = await prisma.fAQ.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json({ faqs });
}

export async function POST(req: Request) {
  const session = await assertAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const faq = await prisma.fAQ.create({
      data: {
        question: body.question,
        answer: body.answer || null,
        category: body.category || null,
        active: body.active === true,
        unverified: body.unverified === true,
        order: body.order ?? 0,
      },
    });
    return NextResponse.json({ ok: true, faq });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
  }
}
