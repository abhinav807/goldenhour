"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import type { AdminAccount } from "@/lib/admin-schema";
import { GENDER_OPTIONS, MAX_NAME_LENGTH, MAX_PHOTO_BYTES, MIN_BIRTH_DATE } from "@/lib/profile-schema";
import s from "./Admin.module.css";

export default function AccountEditor({ account, onSaved }: { account: AdminAccount; onSaved: (account: AdminAccount) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [ticketUrl, setTicketUrl] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});

  async function generateTicket() {
    setError(""); setTicketUrl(""); setBusy(true);
    try {
      const response = await fetch(`/api/admin/accounts/${encodeURIComponent(account.id)}/ticket`, { method: "POST" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The ticket could not be generated.");
      setTicketUrl(result.ticket.imageUrl);
    } catch (err) { setError(err instanceof Error ? err.message : "The ticket could not be generated."); }
    finally { setBusy(false); }
  }
  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const data = new FormData(event.currentTarget);
    const file = data.get("photo");
    setSaved(false);
    setError("");
    setFields({});
    if (file instanceof File && file.size > MAX_PHOTO_BYTES) { setError("Choose a profile photo no larger than 2 MB."); return; }
    if (file instanceof File && !file.size) data.delete("photo");
    setBusy(true);
    try {
      const response = await fetch(`/api/admin/accounts/${encodeURIComponent(account.id)}`, { method: "PATCH", body: data });
      const result = await response.json();
      if (!response.ok) { setError(result.error || "The account could not be saved. Try again."); setFields(result.fields || {}); return; }
      onSaved(result.account);
      setSaved(true);
    } catch { setError("Could not connect. Check your connection and try again."); }
    finally { setBusy(false); }
  }

  return <section aria-labelledby="edit-account-heading">
    <h3 id="edit-account-heading" className={s.sectionHeading}>Account details</h3>
    <div className={s.profileIdentity}>
      {account.profile && <Image className={s.avatar} src={account.profile.imageUrl} width={64} height={64} alt="Member profile picture" unoptimized />}
      <div><p className={s.hint}>{account.isAdmin ? "Master admin" : "Member"} · {account.emailVerified ? "Verified email" : "Email not verified"}</p><p className={s.hint}>{account.profile ? "Profile complete" : "Profile setup pending"}</p></div>
    </div>
    <form onSubmit={submit} className={s.form} aria-busy={busy}>
      <div className={s.field}>
        <label className={s.label} htmlFor="member-name">Full name</label>
        <input className={s.input} id="member-name" name="name" required minLength={2} maxLength={MAX_NAME_LENGTH} defaultValue={account.profile?.name || account.name} disabled={busy} aria-invalid={Boolean(fields.name)} aria-describedby={fields.name ? "member-name-error" : undefined} />
        {fields.name && <p className={s.fieldError} id="member-name-error">{fields.name}</p>}
      </div>
      <div className={s.field}>
        <label className={s.label} htmlFor="member-role">Account role</label>
        <select className={s.input} id="member-role" name="role" defaultValue={account.role} disabled={busy}>
          <option value="participant">Participant</option>
          <option value="volunteer">Volunteer — scan and mark attendance only</option>
        </select>
        <p className={s.hint}>Only master admins can change roles. Volunteers cannot manage accounts or tickets.</p>
      </div>
      <div className={s.field}>
        <label className={s.label} htmlFor="member-email">Email address</label>
        <input className={s.input} id="member-email" name="email" type="email" required maxLength={254} defaultValue={account.email} readOnly={!account.canEditEmail} disabled={busy} aria-invalid={Boolean(fields.email)} aria-describedby={`member-email-help${fields.email ? " member-email-error" : ""}`} />
        <p className={s.hint} id="member-email-help">{account.canEditEmail ? "Changing the login email removes its verified status and ends existing sessions." : "Google-linked accounts and master admins must keep their current sign-in email."}</p>
        {fields.email && <p className={s.fieldError} id="member-email-error">{fields.email}</p>}
      </div>
      {!account.profile && <p className={s.hint}>Save only the name and email, or add all profile details and a photo to complete this profile.</p>}
      <div className={s.row}>
        <div className={s.field}>
          <label className={s.label} htmlFor="member-dob">Date of birth</label>
          <input className={s.input} id="member-dob" name="dateOfBirth" type="date" defaultValue={account.profile?.dateOfBirth || ""} min={MIN_BIRTH_DATE} max={yesterday.toISOString().slice(0, 10)} required={Boolean(account.profile)} disabled={busy} aria-invalid={Boolean(fields.dateOfBirth)} aria-describedby={fields.dateOfBirth ? "member-dob-error" : undefined} />
          {fields.dateOfBirth && <p className={s.fieldError} id="member-dob-error">{fields.dateOfBirth}</p>}
        </div>
        <div className={s.field}>
          <label className={s.label} htmlFor="member-gender">Gender</label>
          <select className={s.input} id="member-gender" name="gender" defaultValue={account.profile?.gender || ""} required={Boolean(account.profile)} disabled={busy} aria-invalid={Boolean(fields.gender)} aria-describedby={fields.gender ? "member-gender-error" : undefined}><option value="">Select an option</option>{GENDER_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
          {fields.gender && <p className={s.fieldError} id="member-gender-error">{fields.gender}</p>}
        </div>
      </div>
      <div className={s.field}>
        <label className={s.label} htmlFor="member-photo">{account.profile ? "Replace profile picture (optional)" : "Profile picture"}</label>
        <input className={`${s.input} ${s.file}`} id="member-photo" name="photo" type="file" accept="image/png,image/jpeg,image/webp" disabled={busy} aria-invalid={Boolean(fields.photo)} aria-describedby={`member-photo-help${fields.photo ? " member-photo-error" : ""}`} />
        <p className={s.hint} id="member-photo-help">JPG, PNG or WebP, up to 2 MB. Required when completing a new profile.</p>
        {fields.photo && <p className={s.fieldError} id="member-photo-error">{fields.photo}</p>}
      </div>
      <button className={s.button} disabled={busy} type="submit">{busy ? "Saving changes…" : "Save account changes"}</button>
    </form>
    {error && <p className={s.error} role="alert">{error}</p>}
    {saved && <p className={s.success} role="status">Account changes saved.</p>}
    <div className={s.ticketActions}>
      <h3 className={s.sectionHeading}>Event ticket</h3>
      <p className={s.hint}>Generate a unique QR ticket for this account. Scanning it marks entry for the configured event.</p>
      <button className={s.button} type="button" onClick={generateTicket} disabled={busy}>Generate participant ticket</button>
      {ticketUrl && <a className={s.link} href={ticketUrl} target="_blank" rel="noreferrer">Open generated ticket</a>}
    </div>
  </section>;
}
