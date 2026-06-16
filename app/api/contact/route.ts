import { NextResponse } from "next/server";
import { jsonError, handleApiError } from "@/lib/api";
import { verifyCsrf } from "@/lib/csrf";
import { sendLeadEmails } from "@/lib/email";
import { rateLimit, requestIp } from "@/lib/rate-limit";
import { createServiceClient } from "@/lib/supabase/server";
import { contactSchema } from "@/lib/validation";

async function retry<T>(task: () => Promise<T>, attempts = 3) {
  let lastError: unknown;

  for (let index = 0; index < attempts; index += 1) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 250 * (index + 1)));
    }
  }

  throw lastError;
}

export async function POST(request: Request) {
  try {
    const limit = rateLimit(`contact:${requestIp(request)}`, 5, 60_000);

    if (!limit.allowed) {
      return jsonError("Too many submissions. Please wait a moment and try again.", 429);
    }

    const payload = await request.json();
    const parsed = contactSchema.parse(payload);

    if (!verifyCsrf(request, parsed.csrfToken)) {
      return jsonError("Security token expired. Please refresh and try again.", 403);
    }

    const supabase = createServiceClient();

    const savedLead = await retry(async () => {
      const { data, error } = await supabase
        .from("leads")
        .insert({
          name: parsed.name,
          business_name: parsed.businessName,
          phone: parsed.phone,
          email: parsed.email,
          project_type: parsed.projectType,
          project_description: parsed.projectDescription,
          status: "new"
        })
        .select("id, created_at")
        .single();

      if (error) {
        throw error;
      }

      return data;
    });

    const emailResult = await sendLeadEmails(parsed);

    await supabase.from("email_events").insert({
      lead_id: savedLead.id,
      owner_email_id: emailResult.ownerId || null,
      client_email_id: emailResult.clientId || null,
      status: emailResult.ok ? "sent" : "failed",
      error_message: emailResult.error || null
    });

    return NextResponse.json({
      ok: true,
      message: "Inquiry received. We will get back to you within 24 hours.",
      leadId: savedLead.id,
      emailQueued: emailResult.ok
    });
  } catch (error) {
    return handleApiError(error);
  }
}
