import "server-only";
import { headers } from "next/headers";
import { getSession } from "./auth";
import { getProfile } from "./profiles";

export async function getCurrentAccount() {
  const session = await getSession(await headers());
  if (!session) return null;
  return {
    user: { id: session.user.id, email: session.user.email, name: session.user.name },
    profile: await getProfile(session.user.id),
  };
}
