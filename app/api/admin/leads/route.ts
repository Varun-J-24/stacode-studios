import { NextResponse } from "next/server";
import { handleApiError, jsonError } from "@/lib/api";
import { requireAdminUser, createServiceClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const auth = await requireAdminUser(request);

    if ("error" in auth) {
      return jsonError(auth.error, auth.status);
    }

    const url = new URL(request.url);
    const search = url.searchParams.get("search")?.trim();
    const status = url.searchParams.get("status")?.trim();
    const supabase = createServiceClient();

    let query = supabase.from("leads").select("*").order("created_at", { ascending: false });

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,business_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    return handleApiError(error);
  }
}
