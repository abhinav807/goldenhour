import { test } from "node:test";
import assert from "node:assert/strict";
import { isMasterAdmin, isMasterAdminEmail } from "../src/lib/admin-policy.ts";
import { canViewTicket, validateTicketDetails } from "../src/lib/ticket-schema.ts";

const masterEmails = ["abhinavgoyal300@gmail.com", "yadivya070909@gmail.com"];
const validTicket = { eventName: "GoldenHour V1", eventDate: "2026-11-28", venue: "Delhi NCR" };

test("both master email addresses are recognized after case and whitespace normalization", () => {
  for (const email of masterEmails) {
    assert.equal(isMasterAdminEmail(email), true);
    assert.equal(isMasterAdminEmail(`  ${email.toUpperCase()}  `), true);
    assert.equal(isMasterAdmin({ email: ` ${email.toUpperCase()} `, emailVerified: true }), true);
  }
});

test("master access requires a verified identity, and verified members do not become admins", () => {
  for (const email of masterEmails) {
    assert.equal(isMasterAdmin({ email, emailVerified: false }), false);
    assert.equal(isMasterAdmin({ email }), false);
  }
  for (const email of ["member@gmail.com", "abhinavgoyal300+alias@gmail.com", "abhinavgoyal300@gmail.com.example.org", ""]) {
    assert.equal(isMasterAdminEmail(email), false);
    assert.equal(isMasterAdmin({ email, emailVerified: true }), false);
  }
  assert.equal(isMasterAdmin(null), false);
  assert.equal(isMasterAdmin(undefined), false);
});

test("ticket details normalize whitespace and permit an omitted date and venue", () => {
  const normalized = validateTicketDetails({ eventName: "  GoldenHour   V1  ", eventDate: " 2026-11-28 ", venue: " Delhi NCR " });
  assert.deepEqual(normalized.fields, {});
  assert.deepEqual(normalized.value, validTicket);
  const minimal = validateTicketDetails({ eventName: "GoldenHour V1" });
  assert.deepEqual(minimal.fields, {});
  assert.deepEqual(minimal.value, { eventName: "GoldenHour V1", eventDate: null, venue: "" });
  assert.deepEqual(validateTicketDetails({ eventName: "GoldenHour V1", eventDate: "  ", venue: "  " }), minimal);
});

test("ticket names and venue enforce size limits and reject unsafe control characters", () => {
  for (const eventName of ["AB", "x".repeat(120)]) {
    assert.deepEqual(validateTicketDetails({ ...validTicket, eventName, venue: "v".repeat(200) }).fields, {});
  }
  for (const eventName of ["", "A", "x".repeat(121), "Ticket\u0000Name", "Ticket\u200bName", 42, null, { $ne: null }]) {
    assert.ok(validateTicketDetails({ ...validTicket, eventName }).fields.eventName, String(eventName));
  }
  for (const venue of ["v".repeat(201), "Delhi\u0000NCR", "Delhi\u200bNCR"]) {
    assert.ok(validateTicketDetails({ ...validTicket, venue }).fields.venue);
  }
  assert.deepEqual(Object.keys(validateTicketDetails({}).fields), ["eventName"]);
});

test("event dates accept real leap days and reject malformed or impossible calendar values", () => {
  for (const eventDate of ["1900-01-01", "2028-02-29", "2099-12-31"]) {
    assert.deepEqual(validateTicketDetails({ ...validTicket, eventDate }).fields, {});
  }
  for (const eventDate of ["1899-12-31", "2026-02-29", "2026-04-31", "2026-13-01", "2026-00-10", "2026-11-00", "28/11/2026", "2026-1-01", "2026-11-28T00:00:00Z", "not-a-date"]) {
    assert.ok(validateTicketDetails({ ...validTicket, eventDate }).fields.eventDate, eventDate);
  }
});

test("a member can view only their own ticket while an admin can view assigned tickets", () => {
  const ticket = { userId: "member-a" };
  assert.equal(canViewTicket(ticket, "member-a", false), true);
  assert.equal(canViewTicket(ticket, "member-b", false), false);
  assert.equal(canViewTicket(ticket, "", false), false);
  assert.equal(canViewTicket(ticket, "admin", true), true);
  assert.equal(canViewTicket(ticket, "member-a", true), true);
});
