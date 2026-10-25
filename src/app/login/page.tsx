import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentAccount } from "@/lib/account";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Log in | GoldenHour Delhi", robots: { index: false, follow: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const account = await getCurrentAccount();
  if (account) redirect(account.isAdmin ? "/admin" : account.profile ? "/profile" : "/onboarding");
  const query = await searchParams;
  return <AuthShell eyebrow="GoldenHour / Your account" title="Your next chapter starts here." description="Log in with Google or email, then make your GoldenHour profile your own." step={1}><LoginForm googleError={Boolean(query.error)} /></AuthShell>;
}
