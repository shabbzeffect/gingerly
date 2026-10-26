import { NextResponse } from "next/server";
import { uploadPrivateFile } from "@/lib/storage";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "") ||
      req.headers.get("cookie")?.match(/gingerly_admin_session=([^;]+)/)?.[1];

    if (!token || !(await getSession(token))) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ ok: false, error: "Expected multipart/form-data" }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file || typeof file === "string") {
      return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 });
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadPrivateFile({
      buffer: buf,
      filename: file.name,
      contentType: file.type,
      folder,
    });

    return NextResponse.json({ ok: true, url: uploaded.url, key: uploaded.key, size: uploaded.size });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || "Upload failed" }, { status: 500 });
  }
}
