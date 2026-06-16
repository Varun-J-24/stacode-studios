import { NextResponse } from "next/server";
import { handleApiError, jsonError } from "@/lib/api";
import { createServiceClient, requireAdminUser } from "@/lib/supabase/server";
import { portfolioSchema } from "@/lib/validation";

export async function GET(request: Request) {
  try {
    const auth = await requireAdminUser(request);

    if ("error" in auth) {
      return jsonError(auth.error, auth.status);
    }

    const { data, error } = await createServiceClient()
      .from("portfolio_projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAdminUser(request);

    if ("error" in auth) {
      return jsonError(auth.error, auth.status);
    }

    const payload = portfolioSchema.parse(await request.json());
    const { data, error } = await createServiceClient()
      .from("portfolio_projects")
      .insert({
        ...payload,
        thumbnail_url: payload.thumbnail_url || null
      })
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    return handleApiError(error);
  }
}
