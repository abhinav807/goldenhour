"use client";

import AuthShell from "@/components/auth/AuthShell";
import s from "@/components/auth/Auth.module.css";

export default function TicketsError({ reset }: { reset: () => void }) {
  return <AuthShell eyebrow="GoldenHour / Your tickets" title="Let’s try that again." description="We couldn’t load your tickets. Try again to see your latest entries.">
    <h2>Your tickets couldn’t be loaded.</h2>
    <p className={s.hint} role="alert">Check your connection, then try again.</p>
    <div className={s.actions}><button className={s.button} type="button" onClick={reset}>Try again</button></div>
  </AuthShell>;
}
