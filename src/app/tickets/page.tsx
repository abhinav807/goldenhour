import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import SignOutButton from "@/components/auth/SignOutButton";
import TicketList from "@/components/tickets/TicketList";
import { getCurrentAccount } from "@/lib/account";
import { listUserTickets } from "@/lib/tickets";
import s from "@/components/tickets/Tickets.module.css";

export const metadata: Metadata = { title: "My tickets | GoldenHour Delhi", description: "View and download your personal GoldenHour entry tickets.", robots: { index: false, follow: false } };

export default async function TicketsPage() {
  const account = await getCurrentAccount();
  if (!account) redirect("/login");
  const tickets = await listUserTickets(account.user.id);

  return <AuthShell eyebrow="GoldenHour / Your tickets" title="My tickets" description="Your event tickets, together in one place. Show the ticket QR at the venue for entry." accountNav={{ isAdmin: account.isAdmin, active: "tickets" }} wide>
    <TicketList tickets={tickets} />
    <div className={s.account}><span>Signed in as {account.user.email}</span><SignOutButton /></div>
  </AuthShell>;
}
