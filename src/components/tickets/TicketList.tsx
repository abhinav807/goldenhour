import Link from "next/link";
import { ArrowUpRight, Check, Download, Ticket as TicketIcon } from "lucide-react";
import type { Ticket } from "@/lib/ticket-schema";
import s from "./Tickets.module.css";

function eventDate(value: string | null) {
  if (!value) return "Date to be confirmed";
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

function checkInDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata", timeZoneName: "short" }).format(new Date(value));
}

export default function TicketList({ tickets }: { tickets: Ticket[] }) {
  if (!tickets.length) return <div className={s.empty}>
    <div className={s.emptyIcon}><TicketIcon size={30} aria-hidden="true" /></div>
    <h2>No tickets yet.</h2>
    <p>When the GoldenHour team adds a ticket to your account, it will appear here with its event details and entry QR.</p>
    <Link href="/" className={s.link}>Explore GoldenHour <ArrowUpRight size={17} aria-hidden="true" /></Link>
  </div>;

  return <div className={s.list}>
    {tickets.map((ticket) => <article key={ticket.id} className={s.ticket} aria-labelledby={`ticket-${ticket.id}`}>
      <div className={s.info}>
        <p className={`${s.status}${ticket.status === "checked-in" ? ` ${s.used}` : ""}`}>
          {ticket.status === "checked-in" && <Check size={15} aria-hidden="true" />}
          {ticket.status === "checked-in" ? "Checked in" : "Ready for entry"}
        </p>
        <h2 id={`ticket-${ticket.id}`}>{ticket.eventName}</h2>
        <dl className={s.details}>
          <div><dt>Date</dt><dd>{eventDate(ticket.eventDate)}</dd></div>
          <div><dt>Venue</dt><dd>{ticket.venue || "Venue to be confirmed"}</dd></div>
        </dl>
      </div>
      <div className={s.slip}>
        {/* Keep the private, lossless ticket image at its natural aspect ratio. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ticket.imageUrl} alt={`Entry ticket and QR code for ${ticket.eventName}`} loading="lazy" className={s.image} />
      </div>
      <div className={s.ticketFooter}>
        <p className={s.note}>{ticket.status === "checked-in" ? (ticket.checkedInAt ? `Checked in on ${checkInDate(ticket.checkedInAt)}. This ticket has been used.` : "This ticket has been used for entry.") : "Show this QR to the GoldenHour team at the venue. Each ticket allows one check-in."}</p>
        <div className={s.actions}>
          <a href={ticket.imageUrl} target="_blank" rel="noopener noreferrer" className={s.link} aria-label={`Open ${ticket.eventName} ticket in a new tab`}>Open ticket <ArrowUpRight size={16} aria-hidden="true" /></a>
          <a href={`${ticket.imageUrl}?download=1`} download className={s.link} aria-label={`Download ${ticket.eventName} ticket`}>Download <Download size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </article>)}
  </div>;
}
