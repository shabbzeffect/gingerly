import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail, atelierContactEmail } from "@/lib/email";
import { contactSchema } from "@/lib/validations";
import { logAudit } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = contactSchema.parse(body);

    const message = await prisma.contactMessage.create({
      data: {
        name: validated.name,
        email: validated.email,
        subject: validated.subject,
        message: validated.message,
      },
    });

    await logAudit("create", "ContactMessage", message.id, undefined, {
      subject: validated.subject,
    });

    await sendMail({
      to: atelierContactEmail(),
      subject: `Contact message: ${validated.subject}`,
      html: `
        <h2>New contact message</h2>
        <p><strong>Name:</strong> ${validated.name}</p>
        <p><strong>Email:</strong> ${validated.email}</p>
        <p><strong>Subject:</strong> ${validated.subject}</p>
        <p><strong>Message:</strong><br/>${validated.message}</p>
      `,
    });

    return NextResponse.json({ ok: true, id: message.id });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || "Message failed" }, { status: 400 });
  }
}
