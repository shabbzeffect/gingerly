import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail, atelierContactEmail } from "@/lib/email";
import { enquirySchema } from "@/lib/validations";
import { logAudit } from "@/lib/auth";
import { uploadPrivateFile } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let body: any;
    let referenceFile: { buffer: Buffer; filename: string; contentType: string } | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      body = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        kind: formData.get("kind"),
        occasion: formData.get("occasion"),
        eventDate: formData.get("eventDate") || undefined,
        garmentType: formData.get("garmentType") || undefined,
        budget: formData.get("budget") || undefined,
        inspiration: formData.get("inspiration") || undefined,
        message: formData.get("message") || undefined,
        preferredDates: formData.get("preferredDates") ? JSON.parse(formData.get("preferredDates") as string) : [],
        timeZone: formData.get("timeZone") || "UTC",
        consent: formData.get("consent") === "true",
      };
      const file = formData.get("referenceImage");
      if (file && typeof file !== "string" && file instanceof File) {
        const buf = Buffer.from(await file.arrayBuffer());
        referenceFile = { buffer: buf, filename: file.name, contentType: file.type };
      }
    } else {
      body = await req.json();
    }

    const validated = enquirySchema.parse({
      ...body,
      referenceImage: referenceFile ? referenceFile : undefined,
    });

    let referenceImageUrl: string | undefined;
    let referenceImageKey: string | undefined;

    if (validated.referenceImage) {
      const uploaded = await uploadPrivateFile({
        buffer: validated.referenceImage.buffer,
        filename: validated.referenceImage.filename,
        contentType: validated.referenceImage.contentType,
        folder: "enquiries",
      });
      referenceImageUrl = uploaded.url;
      referenceImageKey = uploaded.key;
    }

    const enquiry = await prisma.consultationEnquiry.create({
      data: {
        status: "PENDING",
        kind: validated.kind,
        firstName: validated.firstName,
        lastName: validated.lastName,
        email: validated.email,
        phone: validated.phone || undefined,
        occasion: validated.occasion,
        eventDate: validated.eventDate ? new Date(validated.eventDate) : null,
        garmentType: validated.garmentType || undefined,
        budget: validated.budget || undefined,
        inspiration: validated.inspiration || undefined,
        message: validated.message || undefined,
        preferredDates: validated.preferredDates || [],
        timeZone: validated.timeZone,
        referenceImageUrl,
        referenceImageKey,
        consent: validated.consent,
      },
    });

    await logAudit("create", "ConsultationEnquiry", enquiry.id, undefined, { kind: validated.kind });

    // Notify atelier
    const to = atelierContactEmail();
    await sendMail({
      to,
      subject: `New consultation enquiry: ${validated.firstName} ${validated.lastName} — ${validated.occasion}`,
      html: `
        <h2>New consultation enquiry</h2>
        <p><strong>Name:</strong> ${validated.firstName} ${validated.lastName}</p>
        <p><strong>Email:</strong> ${validated.email}</p>
        <p><strong>Phone:</strong> ${validated.phone || "—"}</p>
        <p><strong>Occasion:</strong> ${validated.occasion}</p>
        <p><strong>Kind:</strong> ${validated.kind}</p>
        <p><strong>Event date:</strong> ${validated.eventDate || "—"}</p>
        <p><strong>Time zone:</strong> ${validated.timeZone}</p>
        <p><strong>Garment type:</strong> ${validated.garmentType || "—"}</p>
        <p><strong>Budget:</strong> ${validated.budget || "—"}</p>
        <p><strong>Consent:</strong> ${validated.consent}</p>
        ${validated.inspiration ? `<p><strong>Inspiration:</strong> ${validated.inspiration}</p>` : ""}
        ${validated.message ? `<p><strong>Message:</strong> ${validated.message}</p>` : ""}
        ${referenceImageUrl ? `<p><strong>Reference image:</strong> <a href="${referenceImageUrl}">View (private)</a></p>` : ""}
        <p><a href="${process.env.NEXTAUTH_URL}/admin/enquiries">View in admin</a></p>
      `,
    });

    return NextResponse.json({ ok: true, id: enquiry.id });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || "Submission failed" }, { status: 400 });
  }
}
