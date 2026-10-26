import { cookies } from "next/headers";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("gingerly_admin_session")?.value;
  if (!token) redirect("/admin/login");
  const session = await getSession(token);
  if (!session) redirect("/admin/login");
  return session;
}
