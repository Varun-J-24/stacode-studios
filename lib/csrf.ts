import { cookies } from "next/headers";

export const csrfCookieName = "stacode_csrf";

export async function getCsrfToken() {
  const cookieStore = await cookies();
  return cookieStore.get(csrfCookieName)?.value || "";
}

export function verifyCsrf(request: Request, token?: string) {
  const cookie = request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${csrfCookieName}=`))
    ?.split("=")[1];

  return Boolean(cookie && token && decodeURIComponent(cookie) === token);
}
