import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSession, getAdminByEmail, verifyPassword, logAudit } from "@/lib/auth";
import { adminLoginSchema } from "@/lib/validations";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = adminLoginSchema.parse(body);

    const admin = await getAdminByEmail(validated.email);
    if (!admin || !admin.active) {
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await verifyPassword(validated.password, admin.password);
    if (!valid) {
      await logAudit("login_failed", "Admin", admin.id, admin.id, { email: validated.email });
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
    }

    const session = await createSession(admin.id);

    (await cookies()).set("gingerly_admin_session", session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: session.expiresAt,
    });

    await logAudit("login", "Admin", admin.id, admin.id, { email: validated.email });

    return NextResponse.json({ ok: true, admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role } });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || "Login failed" }, { status: 400 });
  }
}
