import "server-only";
import { headers } from "next/headers";
import { getSession } from "./auth";
import { getProfile } from "./profiles";
import { isMasterAdmin } from "./admin-policy";
import { getDatabase } from "./mongodb";

export async function getCurrentAccount() {
  const session = await getSession(await headers());
  if (!session) return null;
  const { db } = await getDatabase();
  const storedUser = await db.collection("gh_auth_user").findOne({ _id: new (await import("mongodb")).ObjectId(session.user.id) }, { projection: { role: 1 } });
  return {
    user: { id: session.user.id, email: session.user.email, name: session.user.name },
    profile: await getProfile(session.user.id),
    isAdmin: isMasterAdmin(session.user),
    role: storedUser?.role === "volunteer" ? "volunteer" as const : "participant" as const,
  };
}
