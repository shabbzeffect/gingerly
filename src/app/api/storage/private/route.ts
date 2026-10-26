import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { deleteFile } from "@/lib/storage";
import { cookies } from "next/headers";
import { logAudit } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(
  req: Request,
  { params }: { params: any },
) {
  try {
    const { path } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("gingerly_admin_session")?.value;
    if (!token || !(await getSession(token))) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const key = path.join("/");
    const url = `/api/storage/private-file/${encodeURIComponent(key)}`;
    return NextResponse.json({ url });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: any },
) {
  try {
    const { path } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("gingerly_admin_session")?.value;
    const session = token ? await getSession(token) : null;
    if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const key = path.join("/");
    await deleteFile(key);
    await logAudit("delete", "File", key, session.admin.id, { key });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
