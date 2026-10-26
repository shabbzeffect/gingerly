import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

const PRIVATE_ROOT = path.join(process.cwd(), "storage", "private");

export async function GET(
  req: Request,
  { params }: { params: any },
) {
  try {
    const { path: pathSegments } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("gingerly_admin_session")?.value;
    if (!token || !(await getSession(token))) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const filePath = path.join(PRIVATE_ROOT, ...pathSegments);
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    const buffer = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const mimeMap: Record<string, string> = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".pdf": "application/pdf",
      ".webp": "image/webp",
      ".heic": "image/heic",
    };
    const contentType = mimeMap[ext] || "application/octet-stream";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${path.basename(filePath)}"`,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (err: any) {
    if (err.code === "ENOENT") {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
