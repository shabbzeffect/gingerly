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

  const projects = await prisma.lookbookProject.findMany({
    include: { images: { select: { id: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ projects });
}

export async function POST(req: Request) {
  const session = await assertAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const projectSlug = body.slug || slugify(body.title || "");
    const project = await prisma.lookbookProject.create({
      data: {
        title: body.title,
        slug: projectSlug,
        occasion: body.occasion || null,
        garmentType: body.garmentType || null,
        fabric: body.fabric || null,
        description: body.description || null,
        featured: body.featured === true,
        order: 0,
      },
    });
    return NextResponse.json({ ok: true, project });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
  }
}
