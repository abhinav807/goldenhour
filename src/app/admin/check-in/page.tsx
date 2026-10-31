import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentAccount } from "@/lib/account";
import AdminShell from "@/components/admin/AdminShell";
import CheckInScanner from "@/components/admin/CheckInScanner";

export const metadata: Metadata = { title: "Venue check-in | GoldenHour Delhi", description: "Check in GoldenHour participants by scanning a QR or entering their ticket serial.", robots: { index: false, follow: false } };

export default async function CheckInPage() {
  const account = await getCurrentAccount();
  if (!account) redirect("/login");
  if (!account.isAdmin && account.role !== "volunteer") redirect("/profile");
  return <AdminShell active="check-in" title="Meet them at the door." description="Choose the event and scan the ticket QR. A valid first scan records entry; a used ticket cannot be admitted again."><CheckInScanner /></AdminShell>;
}
