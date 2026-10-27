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

  const rentals = await prisma.rentalItem.findMany({
    include: { images: { select: { id: true } } },
    orderBy: { order: "asc" },
  });
  return NextResponse.json({ rentals });
}

export async function POST(req: Request) {
  const session = await assertAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const rental = await prisma.rentalItem.create({
      data: {
        slug: body.slug || slugify(body.title || ""),
        title: body.title,
        occasion: body.occasion || null,
        size: body.size || null,
        color: body.color || null,
        priceKes: body.priceKes ? Number(body.priceKes) : null,
        depositKes: body.depositKes ? Number(body.depositKes) : null,
        terms: body.terms || null,
        active: body.active === true,
        available: body.available === true,
        order: body.order ?? 0,
      },
    });
    return NextResponse.json({ ok: true, rental });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
  }
}
