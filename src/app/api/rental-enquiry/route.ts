import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail, atelierContactEmail } from "@/lib/email";
import { rentalEnquirySchema } from "@/lib/validations";
import { logAudit } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = rentalEnquirySchema.parse(body);

    const enquiry = await prisma.rentalEnquiry.create({
      data: {
        status: "PENDING",
        firstName: validated.firstName,
        lastName: validated.lastName,
        email: validated.email,
        phone: validated.phone || undefined,
        rentalId: validated.rentalId || undefined,
        eventDate: validated.eventDate ? new Date(validated.eventDate) : null,
        message: validated.message || undefined,
      },
      include: { rental: true },
    });

    await logAudit("create", "RentalEnquiry", enquiry.id, undefined, {
      rentalId: validated.rentalId,
    });

    await sendMail({
      to: atelierContactEmail(),
      subject: `Rental enquiry: ${validated.firstName} ${validated.lastName}`,
      html: `
        <h2>New rental enquiry</h2>
        <p><strong>Name:</strong> ${validated.firstName} ${validated.lastName}</p>
        <p><strong>Email:</strong> ${validated.email}</p>
        <p><strong>Phone:</strong> ${validated.phone || "—"}</p>
        ${validated.rentalId ? `<p><strong>Rental item:</strong> ${enquiry.rental?.title}</p>` : ""}
        <p><strong>Event date:</strong> ${validated.eventDate || "—"}</p>
        ${validated.message ? `<p><strong>Message:</strong> ${validated.message}</p>` : ""}
      `,
    });

    return NextResponse.json({ ok: true, id: enquiry.id });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || "Enquiry failed" }, { status: 400 });
  }
}
