import { NextResponse } from "next/server";
import { handleApiError, jsonError } from "@/lib/api";
import { createServiceClient, requireAdminUser } from "@/lib/supabase/server";
import { portfolioSchema } from "@/lib/validation";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: Params) {
  try {
    const auth = await requireAdminUser(request);

    if ("error" in auth) {
      return jsonError(auth.error, auth.status);
    }

    const { id } = await params;
    const payload = portfolioSchema.partial().parse(await request.json());
    const { data, error } = await createServiceClient()
      .from("portfolio_projects")
      .update(payload)
      .eq("id", id)
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

export async function DELETE(request: Request, { params }: Params) {
  try {
    const auth = await requireAdminUser(request);

    if ("error" in auth) {
      return jsonError(auth.error, auth.status);
    }

    const { id } = await params;
    const { error } = await createServiceClient().from("portfolio_projects").delete().eq("id", id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
