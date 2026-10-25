import AuthShell from "@/components/auth/AuthShell";

export default function TicketsLoading() {
  return <AuthShell eyebrow="GoldenHour / Your tickets" title="One moment." description="Getting your tickets ready." wide>
    <p role="status">Loading your tickets…</p>
  </AuthShell>;
}
