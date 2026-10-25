import Link from "next/link";
import SignOutButton from "@/components/auth/SignOutButton";
import SessionRefresh from "@/components/auth/SessionRefresh";
import s from "./Admin.module.css";

export default function AdminShell({ active, title, description, children }: {
  active: "accounts" | "check-in";
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return <main className={s.shell} id="main-content">
    <SessionRefresh />
    <header className={s.header}>
      <Link href="https://www.goldenhourdelhi.co.in" className={s.brand} aria-label="GoldenHour Delhi home">GOLDEN<span>HOUR</span></Link>
      <nav className={s.nav} aria-label="Admin navigation">
        <Link href="/admin" aria-current={active === "accounts" ? "page" : undefined}>Accounts</Link>
        {/* Load a new document so the scanner's camera Permissions-Policy applies. */}
        <a href="/admin/check-in" aria-current={active === "check-in" ? "page" : undefined}>Check in</a>
        <Link href="/tickets">My tickets</Link><Link href="/profile">My profile</Link>
        <SignOutButton />
      </nav>
    </header>
    <div className={s.content}>
      <p className={s.eyebrow}>GoldenHour / Master admin</p>
      <h1 className={s.title}>{title}</h1>
      <p className={s.lead}>{description}</p>
      {children}
    </div>
    <footer className={s.footer}>GoldenHour Delhi / Build. Improve. Repeat.</footer>
  </main>;
}
