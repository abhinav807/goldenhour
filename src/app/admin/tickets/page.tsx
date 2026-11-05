import { redirect } from "next/navigation";
import { getCurrentAccount } from "@/lib/account";
import AdminShell from "@/components/admin/AdminShell";
import TicketManager from "@/components/admin/TicketManager";
export const metadata={title:"Ticket studio | GoldenHour",robots:{index:false,follow:false}};
export default async function Page(){const account=await getCurrentAccount();if(!account)redirect("/login");if(!account.isAdmin)redirect("/profile");return <AdminShell active="tickets" title="One ticket. One workflow." description="Create individual or bulk tickets, manage attendance, and prepare WhatsApp delivery."><TicketManager /></AdminShell>;}
