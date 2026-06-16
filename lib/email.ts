import { Resend } from "resend";
import { business } from "@/lib/constants";
import type { ContactInput } from "@/lib/validation";

type EmailResult = {
  ok: boolean;
  ownerId?: string;
  clientId?: string;
  error?: string;
};

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }

  return new Resend(process.env.RESEND_API_KEY);
}

function fromAddress() {
  return process.env.RESEND_FROM_EMAIL || "Stacode Studios <onboarding@resend.dev>";
}

export async function sendLeadEmails(lead: ContactInput): Promise<EmailResult> {
  const resend = getResend();

  if (!resend) {
    return { ok: false, error: "RESEND_API_KEY is missing" };
  }

  const ownerHtml = `
    <div style="font-family:Inter,Arial,sans-serif;color:#0f172a;line-height:1.6">
      <h1>New Website Inquiry - Stacode Studios</h1>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Business:</strong> ${lead.businessName}</p>
      <p><strong>Phone:</strong> ${lead.phone}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Project Type:</strong> ${lead.projectType}</p>
      <p><strong>Description:</strong></p>
      <p>${lead.projectDescription.replace(/\n/g, "<br />")}</p>
    </div>
  `;

  const clientHtml = `
    <div style="font-family:Inter,Arial,sans-serif;color:#0f172a;line-height:1.6">
      <h1>Thank You For Contacting Stacode Studios</h1>
      <p>Thank you for reaching out.</p>
      <p>We have received your inquiry and will get back to you within 24 hours.</p>
      <p>Regards,<br />Stacode Studios</p>
    </div>
  `;

  try {
    const [owner, client] = await Promise.all([
      resend.emails.send({
        from: fromAddress(),
        to: process.env.OWNER_EMAIL || business.email,
        replyTo: lead.email,
        subject: "New Website Inquiry - Stacode Studios",
        html: ownerHtml
      }),
      resend.emails.send({
        from: fromAddress(),
        to: lead.email,
        subject: "Thank You For Contacting Stacode Studios",
        html: clientHtml
      })
    ]);

    const ownerError = owner.error?.message;
    const clientError = client.error?.message;

    if (ownerError || clientError) {
      return { ok: false, error: [ownerError, clientError].filter(Boolean).join("; ") };
    }

    return {
      ok: true,
      ownerId: owner.data?.id,
      clientId: client.data?.id
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Email sending failed"
    };
  }
}
