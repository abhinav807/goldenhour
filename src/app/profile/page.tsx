import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentAccount } from "@/lib/account";
import AuthShell from "@/components/auth/AuthShell";
import ProfileSummary from "@/components/auth/ProfileSummary";

export const metadata: Metadata = { title: "Your profile | GoldenHour Delhi", description: "View and manage your private GoldenHour participant profile.", robots: { index: false, follow: false } };

export default async function ProfilePage() {
  const account = await getCurrentAccount();
  if (!account) redirect("/login");
  if (!account.profile) redirect("/onboarding");
  return <AuthShell eyebrow="GoldenHour / Your profile" title="Good to have you here." description="Your GoldenHour profile is ready. This is your space." accountNav={{ isAdmin: account.isAdmin, active: "profile" }}>
    <ProfileSummary profile={account.profile} email={account.user.email} />
  </AuthShell>;
}
