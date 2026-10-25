"use client";

import { useState, type FormEvent } from "react";
import { eventConfig } from "@/lib/event";
import { MAX_TICKET_BYTES, type Ticket } from "@/lib/ticket-schema";
import s from "./Admin.module.css";

export default function TicketUpload({ userId, onUploaded }: { userId: string; onUploaded: (ticket: Ticket) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = data.get("ticket");
    setError(""); setSaved(false);
    if (!(file instanceof File) || !file.size || file.size > MAX_TICKET_BYTES) { setError("Choose a ticket image no larger than 4 MB."); return; }
    setBusy(true);
    try {
      const response = await fetch(`/api/admin/accounts/${encodeURIComponent(userId)}/tickets`, { method: "POST", body: data });
      const result = await response.json();
      if (!response.ok) { setError(result.error || "The ticket could not be uploaded. Try again."); return; }
      onUploaded(result.ticket);
      setSaved(true);
      const input = form.elements.namedItem("ticket");
      if (input instanceof HTMLInputElement) input.value = "";
    } catch { setError("Could not connect. Check your connection and try again."); }
    finally { setBusy(false); }
  }

  return <section className={s.section} aria-labelledby="upload-ticket-heading">
    <h3 id="upload-ticket-heading" className={s.sectionHeading}>Add an event ticket</h3>
    <p className={s.hint}>Upload the full ticket slip with one readable QR code. Use the same event name and date for every ticket to that event.</p>
    <form className={s.form} onSubmit={submit} aria-busy={busy}>
      <div className={s.field}><label htmlFor="ticket-event" className={s.label}>Event name</label><input className={s.input} id="ticket-event" name="eventName" required minLength={2} maxLength={120} defaultValue="GoldenHour V1" disabled={busy} /></div>
      <div className={s.field}><label htmlFor="ticket-date" className={s.label}>Event date (optional)</label><input className={s.input} id="ticket-date" name="eventDate" type="date" defaultValue={eventConfig.isoDate.slice(0, 10)} disabled={busy} /></div>
      <div className={s.field}><label htmlFor="ticket-venue" className={s.label}>Venue (optional)</label><input className={s.input} id="ticket-venue" name="venue" maxLength={200} disabled={busy} /></div>
      <div className={s.field}><label htmlFor="ticket-image" className={s.label}>Ticket slip image</label><input className={`${s.input} ${s.file}`} id="ticket-image" name="ticket" type="file" accept="image/png,image/jpeg,image/webp" required disabled={busy} aria-describedby="ticket-image-help" /><p className={s.hint} id="ticket-image-help">JPG, PNG or WebP, up to 4 MB. The QR must be unique for this event.</p></div>
      <button type="submit" className={s.button} disabled={busy}>{busy ? "Uploading ticket…" : "Upload ticket to this account"}</button>
    </form>
    {error && <p className={s.error} role="alert">{error}</p>}
    {saved && <p className={s.success} role="status">Ticket uploaded. It is now in this member’s My tickets section.</p>}
  </section>;
}
