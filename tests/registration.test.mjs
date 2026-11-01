import test from "node:test";
import assert from "node:assert/strict";
import { registrationAction } from "../src/lib/registration.ts";
const urls = { registration: "https://forms.example/register", community: "https://community.example/", waitlist: "mailto:organisers@example.com?subject=Waitlist" };
test("open registration has one direct registration action", () => {
 const action = registrationAction("open", urls);
 assert.equal(action.href, urls.registration); assert.equal(action.label, "REGISTER NOW"); assert.match(action.message, /Registration is open/);
});
test("closed and ended registration direct to community without an open-registration promise", () => {
 for (const status of ["closed", "ended"]) { const action = registrationAction(status, urls); assert.equal(action.href, urls.community); assert.equal(action.label, "JOIN WHATSAPP"); assert.doesNotMatch(action.message, /Registration is open/); }
});
test("waitlist is a request and does not imply a confirmed place", () => {
 const action = registrationAction("waitlist", urls); assert.equal(action.href, urls.waitlist); assert.equal(action.label, "REQUEST WAITLIST"); assert.match(action.message, /does not guarantee/);
});
