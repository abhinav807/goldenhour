"use client";

import Link from "next/link";
import { UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import s from "./Auth.module.css";

export default function LoginLink() {
  const { data: session } = authClient.useSession();
  return <Link href="/login" className={s.loginLink}>
    <UserRound size={15} aria-hidden="true" />{session ? "Account" : "Log in"}
  </Link>;
}
