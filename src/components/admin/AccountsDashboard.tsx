"use client";

import { useRef, useState, type FormEvent } from "react";
import type { AdminAccount } from "@/lib/admin-schema";
import type { Ticket } from "@/lib/ticket-schema";
import AccountEditor from "./AccountEditor";
import TicketUpload from "./TicketUpload";
import s from "./Admin.module.css";

type AccountList = { accounts: AdminAccount[]; total: number; page: number; pageSize: number };
type Detail = { account: AdminAccount; tickets: Ticket[] };

export default function AccountsDashboard({ initial }: { initial: AccountList }) {
  const [list, setList] = useState(initial);
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState("");
  const [selected, setSelected] = useState("");
  const [detail, setDetail] = useState<Detail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const listRequest = useRef(0);
  const detailRequest = useRef(0);
  const detailHeading = useRef<HTMLHeadingElement>(null);

  async function loadList(q: string, page: number) {
    const request = ++listRequest.current;
    setLoading(true); setListError("");
    try {
      const response = await fetch(`/api/admin/accounts?${new URLSearchParams({ q, page: String(page) })}`);
      const data = await response.json();
      if (request !== listRequest.current) return;
      if (!response.ok) { setListError(data.error || "Accounts could not be loaded. Try again."); return; }
      setList(data); setAppliedSearch(q);
    } catch { if (request === listRequest.current) setListError("Could not load accounts. Check your connection and try again."); }
    finally { if (request === listRequest.current) setLoading(false); }
  }

  async function openAccount(id: string) {
    const request = ++detailRequest.current;
    setSelected(id); setDetail(null); setDetailLoading(true); setDetailError("");
    try {
      const response = await fetch(`/api/admin/accounts/${encodeURIComponent(id)}`);
      const data = await response.json();
      if (request !== detailRequest.current) return;
      if (!response.ok) { setDetailError(data.error || "This account could not be loaded. Try again."); return; }
      setDetail(data);
      window.requestAnimationFrame(() => detailHeading.current?.focus());
    } catch { if (request === detailRequest.current) setDetailError("Could not load this account. Check your connection and try again."); }
    finally { if (request === detailRequest.current) setDetailLoading(false); }
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) { event.preventDefault(); void loadList(search.trim(), 1); }
  function updateAccount(account: AdminAccount) {
    setDetail((current) => current?.account.id === account.id ? { ...current, account } : current);
    setList((current) => ({ ...current, accounts: current.accounts.map((item) => item.id === account.id ? account : item) }));
  }
  const pages = Math.max(1, Math.ceil(list.total / list.pageSize));

  return <div className={s.workspace}>
    <section className={`${s.panel} perforated-panel`} aria-labelledby="accounts-heading" aria-busy={loading}>
      <div className={s.toolbar}><h2 id="accounts-heading">All accounts</h2><span className={s.hint}>{list.total} {list.total === 1 ? "account" : "accounts"}</span></div>
      <form onSubmit={submitSearch}>
        <label className={s.label} htmlFor="account-search">Search by name or email</label>
        <div className={s.search}><input className={s.input} id="account-search" value={search} onChange={(event) => setSearch(event.target.value)} maxLength={120} type="search" /><button type="submit" className={s.secondary} disabled={loading}>{loading ? "Searching…" : "Search"}</button></div>
      </form>
      {listError && <p className={s.error} role="alert">{listError}</p>}
      <ul className={s.accountList}>
        {list.accounts.map((account) => <li key={account.id}><button type="button" className={s.accountButton} aria-pressed={selected === account.id} onClick={() => void openAccount(account.id)}><span className={s.accountName}>{account.profile?.name || account.name}</span><span className={s.hint}>{account.email}</span><span className={s.accountMeta}><span>{account.profile ? "Profile complete" : "Profile pending"}</span>{account.isAdmin && <span>Master admin</span>}</span></button></li>)}
      </ul>
      {!list.accounts.length && !loading && <p className={s.empty}>{appliedSearch ? "No accounts match this search. Try another name or email." : "No accounts have been created yet."}</p>}
      <nav className={s.pagination} aria-label="Account list pages"><button type="button" className={s.secondary} disabled={loading || list.page <= 1} onClick={() => void loadList(appliedSearch, list.page - 1)}>Previous</button><span className={s.hint} aria-live="polite">Page {list.page} of {pages}</span><button type="button" className={s.secondary} disabled={loading || list.page >= pages} onClick={() => void loadList(appliedSearch, list.page + 1)}>Next</button></nav>
    </section>
    <section className={`${s.panel} perforated-panel`} aria-label="Selected account" aria-busy={detailLoading}>
      {!selected && <><h2>Select an account</h2><p className={s.empty}>Choose a member to edit their details or add an event ticket.</p></>}
      {detailLoading && <p role="status" className={s.empty}>Loading account…</p>}
      {detailError && <><p className={s.error} role="alert">{detailError}</p><button type="button" className={s.textButton} onClick={() => void openAccount(selected)}>Try again</button></>}
      {detail && <>
        <div className={s.toolbar}><h2 tabIndex={-1} ref={detailHeading}>{detail.account.profile?.name || detail.account.name}</h2><button type="button" className={s.textButton} onClick={() => { detailRequest.current++; setSelected(""); setDetail(null); }}>Close account</button></div>
        <AccountEditor key={detail.account.id} account={detail.account} onSaved={updateAccount} />
        <TicketUpload key={`tickets-${detail.account.id}`} userId={detail.account.id} onUploaded={(ticket) => setDetail((current) => current?.account.id === ticket.userId ? { ...current, tickets: [ticket, ...current.tickets] } : current)} />
        <section className={s.section} aria-labelledby="member-tickets-heading"><h3 id="member-tickets-heading" className={s.sectionHeading}>Assigned tickets</h3>
          {!detail.tickets.length ? <p className={s.hint}>No tickets have been added to this account.</p> : <ul className={s.ticketList}>{detail.tickets.map((ticket) => <li className={`${s.ticket} perforated-panel`} key={ticket.id}><h4>{ticket.eventName}</h4>{ticket.eventDate && <p className={s.hint}>{new Date(`${ticket.eventDate}T00:00:00Z`).toLocaleDateString("en-IN", { dateStyle: "long", timeZone: "UTC" })}</p>}{ticket.venue && <p className={s.hint}>{ticket.venue}</p>}<span className={`${s.status} ${ticket.status === "checked-in" ? s.checkedIn : ""}`}>{ticket.status === "checked-in" ? "Checked in" : "Ready for entry"}</span><div><a href={ticket.imageUrl} target="_blank" rel="noreferrer">Open ticket image ↗</a></div></li>)}</ul>}
        </section>
      </>}
    </section>
  </div>;
}
