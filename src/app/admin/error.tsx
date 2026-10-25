"use client";
import Link from "next/link";
import s from "@/components/admin/Admin.module.css";
export default function Error() { return <main className={s.shell}><div className={s.content}><h1 className={s.title}>Admin workspace unavailable.</h1><p className={s.lead}>The account information could not be loaded. Reload the page, or log in again if your session has ended.</p><div className={s.actions}><button type="button" className={s.button} onClick={() => window.location.reload()}>Reload page</button><Link href="/login" className={s.secondary}>Log in again</Link></div></div></main>; }
