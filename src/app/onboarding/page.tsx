import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentAccount } from "@/lib/account";
import AuthShell from "@/components/auth/AuthShell";
import ProfileForm from "@/components/auth/ProfileForm";

export const metadata: Metadata = { title: "Create your profile | GoldenHour Delhi", robots: { index: false, follow: false } };

export default async function OnboardingPage() {
  const account = await getCurrentAccount();
  if (!account) redirect("/login");
  if (account.profile) redirect("/profile");
  const lastBirthDate = new Date();
  lastBirthDate.setUTCDate(lastBirthDate.getUTCDate() - 1);
  return <AuthShell eyebrow="GoldenHour / Meet the builder" title="A little about you." description="Your name, your story, your place in GoldenHour. Add your details to finish setting up." step={2} accountNav={{ isAdmin: account.isAdmin, active: "profile" }}>
    <ProfileForm email={account.user.email} defaultName={account.user.name} today={lastBirthDate.toISOString().slice(0, 10)} />
  </AuthShell>;
}
