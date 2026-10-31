import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentAccount } from "@/lib/account";
import { listAccounts } from "@/lib/admin-accounts";
import AdminShell from "@/components/admin/AdminShell";
import AccountsDashboard from "@/components/admin/AccountsDashboard";

export const metadata: Metadata = { title: "Manage accounts | GoldenHour Delhi", description: "Manage GoldenHour participant accounts and event tickets.", robots: { index: false, follow: false } };

export default async function AdminPage() {
  const account = await getCurrentAccount();
  if (!account) redirect("/login");
  if (!account.isAdmin) redirect("/profile");
  const initial = await listAccounts({ q: "", page: 1 });
  return <AdminShell active="accounts" title="The people behind the builds." description="Find any account, update member details, and assign their tickets for the next event."><AccountsDashboard initial={initial} /></AdminShell>;
}
