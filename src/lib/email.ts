export type EmailProvider = "log" | "resend" | "smtp" | "none";

export interface MailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

let provider: EmailProvider = "none";

export function configureEmail(p: EmailProvider) {
  provider = p;
}

export async function sendMail(options: MailOptions): Promise<{ ok: boolean; error?: string }> {
  if (provider === "none" || !provider) {
    console.log("[email:no-op]", { to: options.to, subject: options.subject });
    return { ok: true };
  }

  if (provider === "resend") {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return { ok: false, error: "RESEND_API_KEY not configured" };
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "Gingerly Atelier <noreply@example.com>",
          to: options.to,
          subject: options.subject,
          html: options.html,
          text: options.text,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        return { ok: false, error: `Resend ${res.status}: ${text}` };
      }
      return { ok: true };
    } catch (err: unknown) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  }

  if (provider === "smtp") {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const nodemailer = (await import("nodemailer")).default;
      const host = process.env.SMTP_HOST;
      const port = Number(process.env.SMTP_PORT || 587);
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;
      if (!host || !user || !pass) {
        return { ok: false, error: "SMTP credentials not configured" };
      }
      const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
      await transporter.sendMail({
        from: process.env.SMTP_FROM || `Gingerly Atelier <${user}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });
      return { ok: true };
    } catch (err: unknown) {
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  }

  return { ok: false, error: `Unknown email provider: ${provider}` };
}

export function atelierContactEmail() {
  return process.env.ATELIER_EMAIL || "enquiries@example.com";
}
