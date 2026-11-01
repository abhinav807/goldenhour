"use client";

import Link from "next/link";
import { UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import s from "./Auth.module.css";

export default function LoginLink() {
  const { data: session } = authClient.useSession();
  return <Link href="/login" className={s.loginLink} title="Manage your profile and view private event tickets">
    <UserRound size={15} aria-hidden="true" />{session ? "Account" : "My tickets"}
  </Link>;
}
