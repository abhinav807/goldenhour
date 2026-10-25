import AuthShell from "./AuthShell";
import s from "./Auth.module.css";

export default function AccountLoading() {
  return <AuthShell eyebrow="GoldenHour / Your account" title="One moment." description="Getting your account ready."><p className={s.hint} role="status">Loading your account…</p></AuthShell>;
}
