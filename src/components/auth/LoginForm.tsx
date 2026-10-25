"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import s from "./Auth.module.css";

function GoogleMark() {
  return <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-1.99 3.02v2.51h3.23c1.89-1.74 2.98-4.3 2.98-7.36Z" /><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.41l-3.23-2.51c-.9.6-2.04.96-3.39.96-2.6 0-4.8-1.76-5.59-4.12H3.08v2.59A10 10 0 0 0 12 22Z" /><path fill="#FBBC05" d="M6.41 13.92a6 6 0 0 1 0-3.84V7.49H3.08a10 10 0 0 0 0 9.02l3.33-2.59Z" /><path fill="#EA4335" d="M12 5.96c1.47 0 2.79.51 3.83 1.51l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.92 5.49l3.33 2.59C7.2 7.72 9.4 5.96 12 5.96Z" /></svg>;
}

function loginError(code: string | undefined, status?: number) {
  if (code === "MASTER_ADMIN_GOOGLE_REQUIRED") return "Use Continue with Google for a master admin account.";
  if (status === 429 || code === "TOO_MANY_REQUESTS") return "Too many attempts. Wait a minute, then try again.";
  if (code?.includes("ALREADY_EXISTS")) return "An account already uses this email. Try logging in or continuing with Google.";
  if (code === "INVALID_EMAIL_OR_PASSWORD") return "The email or password is incorrect. Check both and try again.";
  if (code?.includes("PASSWORD_TOO_SHORT")) return "Use a password with at least 12 characters.";
  return "We couldn’t log you in. Check your details and try again.";
}

export default function LoginForm({ googleError = false }: { googleError?: boolean }) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [busy, setBusy] = useState<"email" | "google" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(googleError ? "Google login wasn’t completed. Try again or use email." : "");
  const errorRef = useRef<HTMLParagraphElement>(null);
  function report(message: string) {
    setError(message);
    window.requestAnimationFrame(() => errorRef.current?.focus());
  }
  async function googleLogin() {
    setBusy("google");
    setError("");
    try {
      const result = await authClient.signIn.social({ provider: "google", callbackURL: "/login", errorCallbackURL: "/login?error=google" });
      if (result.error) { report("Google login is unavailable right now. Try again or use email."); setBusy(null); }
    } catch {
      report("Couldn’t connect to Google. Check your connection and try again.");
      setBusy(null);
    }
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    if (mode === "signup" && password !== form.get("confirmPassword")) { report("The passwords don’t match. Enter the same password in both fields."); return; }
    setBusy("email");
    setError("");
    try {
      const result = mode === "signup"
        ? await authClient.signUp.email({ email, password, name: "New member", callbackURL: "/login" })
        : await authClient.signIn.email({ email, password, callbackURL: "/login" });
      if (result.error) { report(loginError(result.error.code, result.error.status)); setBusy(null); return; }
      router.replace("/login");
      router.refresh();
    } catch {
      report("Couldn’t connect. Check your connection and try again.");
      setBusy(null);
    }
  }
  return <>
    <h2>{mode === "signup" ? "Create your account" : "Welcome to GoldenHour"}</h2>
    <p className={s.hint}>{mode === "signup" ? "Start with your email. Your profile comes next." : "Log in to your account, or create one to get started."}</p>
    <button className={s.google} type="button" onClick={googleLogin} disabled={busy !== null}><GoogleMark />{busy === "google" ? "Connecting to Google…" : "Continue with Google"}</button>
    <div className={s.divider}>or use your email</div>
    <form className={s.form} onSubmit={submit} aria-busy={busy === "email"}>
      <div className={s.field}>
        <label htmlFor="email" className={s.label}>Email address</label>
        <input className={s.input} id="email" name="email" type="email" autoComplete="email" required maxLength={254} disabled={busy !== null} placeholder="you@example.com" />
      </div>
      <div className={s.field}>
        <label htmlFor="password" className={s.label}>Password</label>
        <div className={s.passwordField}>
          <input className={s.input} id="password" name="password" type={showPassword ? "text" : "password"} autoComplete={mode === "signup" ? "new-password" : "current-password"} required minLength={mode === "signup" ? 12 : undefined} maxLength={128} aria-describedby={mode === "signup" ? "password-help" : undefined} disabled={busy !== null} />
          <button type="button" className={s.passwordToggle} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}</button>
        </div>
        {mode === "signup" && <p id="password-help" className={s.hint}>Use at least 12 characters.</p>}
      </div>
      {mode === "signup" && <div className={s.field}>
        <label htmlFor="confirmPassword" className={s.label}>Confirm password</label>
        <input className={s.input} id="confirmPassword" name="confirmPassword" type={showPassword ? "text" : "password"} autoComplete="new-password" required minLength={12} maxLength={128} disabled={busy !== null} />
      </div>}
      <button className={s.button} disabled={busy !== null} type="submit">{busy === "email" ? (mode === "signup" ? "Creating account…" : "Logging in…") : (mode === "signup" ? "Create account" : "Log in with email")}<ArrowRight size={17} aria-hidden="true" /></button>
    </form>
    {error && <p className={s.error} role="alert" tabIndex={-1} ref={errorRef}>{error}</p>}
    <p className={s.switch}>{mode === "login" ? "New here? " : "Already have an account? "}<button type="button" className={s.textButton} disabled={busy !== null} onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}>{mode === "login" ? "Create an account" : "Log in"}</button></p>
  </>;
}
