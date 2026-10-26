import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { destroySession, logAudit } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("gingerly_admin_session")?.value;
    if (token) {
      await destroySession(token);
      await logAudit("logout", "Admin", "unknown", undefined);
      cookieStore.delete("gingerly_admin_session");
    }
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || "Logout failed" }, { status: 500 });
  }
}
