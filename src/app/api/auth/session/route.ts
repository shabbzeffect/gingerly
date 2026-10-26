import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("gingerly_admin_session")?.value;
    if (!token) return NextResponse.json({ authenticated: false }, { status: 401 });

    const session = await getSession(token);
    if (!session) return NextResponse.json({ authenticated: false }, { status: 401 });

    return NextResponse.json({
      authenticated: true,
      admin: { id: session.admin.id, email: session.admin.email, name: session.admin.name, role: session.admin.role },
    });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
