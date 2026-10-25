"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import s from "./Auth.module.css";

export default function SignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function signOut() {
    setBusy(true);
    setError("");
    try {
      const result = await authClient.signOut();
      if (result.error) throw new Error("Sign out failed");
      router.replace("/");
      router.refresh();
    } catch {
      setError("Could not log out. Please try again.");
      setBusy(false);
    }
  }
  return <div>
    <button className={s.textButton} type="button" disabled={busy} onClick={signOut}>{busy ? "Logging out…" : "Log out"}</button>
    {error && <p className={s.fieldError} role="alert">{error}</p>}
  </div>;
}
