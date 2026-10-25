"use client";

import AuthShell from "./AuthShell";
import s from "./Auth.module.css";

export default function AccountError() {
  return <AuthShell eyebrow="GoldenHour / Your account" title="Let’s try that again." description="Your account couldn’t be loaded. Check your connection and try again.">
    <h2>Something interrupted this step.</h2>
    <p className={s.hint}>Reload the page to continue.</p>
    <div className={s.actions}><button className={s.button} type="button" onClick={() => window.location.reload()}>Try again</button></div>
  </AuthShell>;
}
