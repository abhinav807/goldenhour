import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { eventConfig } from "@/lib/event";
import SessionRefresh from "./SessionRefresh";
import s from "./Auth.module.css";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  step?: 1 | 2;
  accountNav?: { isAdmin: boolean; active?: "profile" | "tickets" };
  wide?: boolean;
  children: React.ReactNode;
};

export default function AuthShell({ eyebrow, title, description, step, accountNav, wide = false, children }: Props) {
  return (
    <main className={s.page} id="main-content">
      <SessionRefresh />
      <header className={s.header}>
        <Link href={eventConfig.siteUrl} className={s.brand} aria-label="GoldenHour Delhi home">GOLDEN<span>HOUR</span></Link>
        <Link href="/" className={s.back}><ArrowLeft size={16} aria-hidden="true" /> Back home</Link>
      </header>
      {accountNav && <nav className={s.accountNav} aria-label="Your account">
        <Link href="/profile" aria-current={accountNav.active === "profile" ? "page" : undefined}>My profile</Link>
        <Link href="/tickets" aria-current={accountNav.active === "tickets" ? "page" : undefined}>My tickets</Link>
        {accountNav.isAdmin && <Link href="/admin">Admin</Link>}
      </nav>}
      <div className={`${s.layout}${wide ? ` ${s.wideLayout}` : ""}`}>
        <section className={s.intro} aria-labelledby="auth-heading">
          <p className={s.eyebrow}>{eyebrow}</p>
          <h1 id="auth-heading" className={s.title}>{title}</h1>
          <p className={s.description}>{description}</p>
          {step && <div className={s.steps} aria-label={`Step ${step} of 2`}>
            <span className={step === 1 ? s.currentStep : undefined} aria-current={step === 1 ? "step" : undefined}>01 / Your account</span>
            <span className={step === 2 ? s.currentStep : undefined} aria-current={step === 2 ? "step" : undefined}>02 / Your profile</span>
          </div>}
        </section>
        <section className={`${s.panel}${wide ? "" : " perforated-panel"}`} aria-label="Your GoldenHour account">{children}</section>
      </div>
      <footer className={s.footer}>
        <span>GoldenHour Delhi / Build. Improve. Repeat.</span>
        <nav className={s.legal} aria-label="Account legal information"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav>
      </footer>
    </main>
  );
}
