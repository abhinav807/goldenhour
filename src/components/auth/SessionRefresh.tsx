"use client";

import { authClient } from "@/lib/auth-client";

// The browser endpoint can refresh the session cookie; Server Components cannot.
export default function SessionRefresh() {
  authClient.useSession();
  return null;
}
