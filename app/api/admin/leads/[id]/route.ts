import { NextResponse } from "next/server";
import { handleApiError, jsonError } from "@/lib/api";
import { createServiceClient, requireAdminUser } from "@/lib/supabase/server";
import { leadUpdateSchema } from "@/lib/validation";

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
    const payload = leadUpdateSchema.parse(await request.json());
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("leads")
      .update({ status: payload.status })
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
    const supabase = createServiceClient();
    const { error } = await supabase.from("leads").delete().eq("id", id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
