import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail, atelierContactEmail } from "@/lib/email";
import { virtualFittingSchema } from "@/lib/validations";
import { logAudit } from "@/lib/auth";
import { uploadPrivateFile } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let body: any;
    const files: { buffer: Buffer; filename: string; contentType: string }[] = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      body = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        measurements: formData.get("measurements") ? JSON.parse(formData.get("measurements") as string) : {},
        notes: formData.get("notes") || undefined,
        consent: formData.get("consent") === "true",
      };
      const fileEntries = formData.getAll("files");
      for (const f of fileEntries) {
        if (typeof f !== "string" && f instanceof File) {
          const buf = Buffer.from(await f.arrayBuffer());
          files.push({ buffer: buf, filename: f.name, contentType: f.type });
        }
      }
    } else {
      body = await req.json();
    }

    const validated = virtualFittingSchema.parse(body);

    const uploadedFiles: any[] = [];
    for (const file of files) {
      const uploaded = await uploadPrivateFile({
        buffer: file.buffer,
        filename: file.filename,
        contentType: file.contentType,
        folder: "virtual-fittings",
      });
      uploadedFiles.push({
        url: uploaded.url,
        key: uploaded.key,
        filename: file.filename,
        mimeType: file.contentType,
      });
    }

    const submission = await prisma.virtualFittingSubmission.create({
      data: {
        status: "RECEIVED",
        firstName: validated.firstName,
        lastName: validated.lastName,
        email: validated.email,
        measurements: validated.measurements,
        notes: validated.notes,
        files: uploadedFiles,
      },
    });

    await logAudit("create", "VirtualFittingSubmission", submission.id, undefined, {
      firstName: validated.firstName,
      email: validated.email,
    });

    // Notify atelier
    await sendMail({
      to: atelierContactEmail(),
      subject: `New virtual fitting submission: ${validated.firstName} ${validated.lastName}`,
      html: `
        <h2>New virtual fitting submission</h2>
        <p><strong>Name:</strong> ${validated.firstName} ${validated.lastName}</p>
        <p><strong>Email:</strong> ${validated.email}</p>
        <p><strong>Measurements:</strong> ${JSON.stringify(validated.measurements)}</p>
        ${validated.notes ? `<p><strong>Notes:</strong> ${validated.notes}</p>` : ""}
        ${uploadedFiles.length > 0 ? `<p><strong>Files:</strong> ${uploadedFiles.length} file(s) uploaded (private)</p>` : ""}
        <p><a href="${process.env.NEXTAUTH_URL}/admin/virtual-fittings">View in admin</a></p>
      `,
    });

    return NextResponse.json({ ok: true, id: submission.id });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || "Submission failed" }, { status: 400 });
  }
}
