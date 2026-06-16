import { createClient, type User } from "@supabase/supabase-js";

type AdminResult =
  | { user: User; status: 200 }
  | { error: string; status: 401 | 403 };

export function hasSupabaseEnv() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function createServiceClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase service environment variables are missing.");
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

export function createAnonServerClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase anon environment variables are missing.");
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

export async function requireAdminUser(request: Request): Promise<AdminResult> {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace(/^Bearer\s+/i, "");

  if (!token) {
    return { error: "Missing admin session", status: 401 as const };
  }

  const supabase = createAnonServerClient();
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user?.email) {
    return { error: "Invalid admin session", status: 401 as const };
  }

  const allowedEmails = process.env.ADMIN_EMAILS?.split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);

  if (allowedEmails?.length && !allowedEmails.includes(data.user.email.toLowerCase())) {
    return { error: "Admin email is not authorized", status: 403 as const };
  }

  return { user: data.user, status: 200 as const };
}
