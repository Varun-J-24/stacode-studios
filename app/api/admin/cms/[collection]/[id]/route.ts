import { NextResponse } from "next/server";
import { handleApiError, jsonError } from "@/lib/api";
import { createServiceClient, requireAdminUser } from "@/lib/supabase/server";
import { faqSchema, pricingSchema, serviceSchema } from "@/lib/validation";

const collections = {
  services: { table: "services", schema: serviceSchema },
  faqs: { table: "faqs", schema: faqSchema },
  pricing: { table: "pricing_packages", schema: pricingSchema }
};

type Params = {
  params: Promise<{ collection: string; id: string }>;
};

function getCollection(collection: string) {
  return collections[collection as keyof typeof collections];
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const auth = await requireAdminUser(request);

    if ("error" in auth) {
      return jsonError(auth.error, auth.status);
    }

    const { collection, id } = await params;
    const config = getCollection(collection);

    if (!config) {
      return jsonError("Unknown CMS collection", 404);
    }

    const payload = config.schema.partial().parse(await request.json());
    const { data, error } = await createServiceClient()
      .from(config.table)
      .update(payload as never)
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

    const { collection, id } = await params;
    const config = getCollection(collection);

    if (!config) {
      return jsonError("Unknown CMS collection", 404);
    }

    const { error } = await createServiceClient().from(config.table).delete().eq("id", id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
