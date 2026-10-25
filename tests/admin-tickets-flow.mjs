// Integration check: uses a fresh temporary MongoDB database, never real accounts.
// Requires Playwright (PLAYWRIGHT_MODULE_PATH), Edge/Chrome and ADMIN_TEST_OUTPUT.
// The admin identity is a DB fixture: this does not test real Google consent.
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { spawn } from "node:child_process";
import nextEnv from "@next/env";
import { MongoClient } from "mongodb";
import sharp from "sharp";
import jsQR from "jsqr";

nextEnv.loadEnvConfig(process.cwd(), true, { info() {}, error() {} });
const originalDb = process.env.MONGODB_DB;
const dbName = `gh_admin_test_${Date.now()}_${randomBytes(3).toString("hex")}`;
const output = process.env.ADMIN_TEST_OUTPUT;
if (!output) throw new Error("Set ADMIN_TEST_OUTPUT to a directory outside the repository.");
await mkdir(output, { recursive: true });
const portProbe = createServer();
await new Promise((resolve) => portProbe.listen(0, "127.0.0.1", resolve));
const port = portProbe.address().port;
await new Promise((resolve) => portProbe.close(resolve));
const baseURL = `http://localhost:${port}`;
const { chromium, request: requestFactory } = process.env.PLAYWRIGHT_MODULE_PATH
  ? await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE_PATH).href) : await import("playwright");
const client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
const db = client.db(dbName);
const report = { checks: [], screenshots: [], failures: [], database: "isolated temporary database", cleanup: false };
const check = (name, condition) => { assert.ok(condition, name); report.checks.push(name); console.log(`PASS: ${name}`); };
let browser, server, logs = "";
const password = `TestOnly-${randomBytes(16).toString("hex")}!`;
const secret = randomBytes(32).toString("hex");
const contexts = [];
const redact = (input) => {
  let value = String(input).split(password).join("[TEST_PASSWORD]").split(secret).join("[TEST_SECRET]");
  for (const key of ["MONGODB_URI", "GOOGLE_CLIENT_SECRET", "GOOGLE_CLIENT_ID", "AUTH_SECRET"]) {
    if (process.env[key]) value = value.split(process.env[key]).join(`[${key} REDACTED]`);
  }
  return value;
};
const poll = async (fn, message, timeout = 180000) => {
  const until = Date.now() + timeout;
  while (Date.now() < until) {
    if (await fn().catch(() => false)) return;
    if (server?.exitCode !== null) throw new Error("Test server stopped unexpectedly.");
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error(message);
};
const newApi = async (ip) => {
  const api = await requestFactory.newContext({ baseURL, timeout: 60000, extraHTTPHeaders: { Origin: baseURL, "x-real-ip": `127.0.0.${ip}` } });
  contexts.push(api); return api;
};
const signup = async (api, email, name = "New member") => {
  const res = await api.post("/api/auth/sign-up/email", { data: { email, password, name, emailVerified: true, role: "admin" } });
  check(`fixture signup: ${name}`, res.status() === 200);
  return db.collection("gh_auth_user").findOne({ email });
};
const qrData = "goldenhour-test-only-ticket-001";
const qrData2 = "goldenhour-test-only-ticket-002";
const slip = await sharp("tests/fixtures/ticket-1.svg").png().toBuffer();
const slip2 = await sharp("tests/fixtures/ticket-2.svg").png().toBuffer();
const largeSlip2 = await sharp({ create: { width: 4500, height: 4000, channels: 3, background: "white" } }).composite([{ input: slip2, left: 1950, top: 1600 }]).png().toBuffer();
const photo = await sharp({ create: { width: 300, height: 400, channels: 3, background: "#ff5a00" } }).png().toBuffer();
const imageFile = (buffer, name = "ticket.png") => ({ name, mimeType: "image/png", buffer });
const ticketForm = { eventName: "GoldenHour Test Event", eventDate: "2026-12-20", venue: "Test venue", ticket: imageFile(slip) };

try {
  await client.connect();
  assert.notEqual(dbName, originalDb);
  server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "--port", String(port)], {
    windowsHide: true, cwd: process.cwd(), stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, MONGODB_DB: dbName, AUTH_URL: baseURL, AUTH_SECRET: secret, NEXT_TELEMETRY_DISABLED: "1" },
  });
  server.stdout.on("data", (data) => { logs += data.toString(); });
  server.stderr.on("data", (data) => { logs += data.toString(); });
  await poll(async () => (await fetch(`${baseURL}/login`)).status === 200, "Test server did not become ready.");
  const guest = await newApi(10), member = await newApi(11), other = await newApi(12), admin = await newApi(13);
  for (const route of ["/api/admin/accounts", "/api/admin/events", "/api/tickets"]) check(`guest blocked: ${route}`, (await guest.get(route)).status() === 401);
  check("guest scanner blocked", (await guest.post("/api/admin/check-in", { data: {} })).status() === 401);
  const reserved = await guest.post("/api/auth/sign-up/email", { data: { name: "Imposter", email: "abhinavgoyal300@gmail.com", password } });
  check("master email cannot be claimed through password signup", reserved.status() === 403 && await db.collection("gh_auth_user").countDocuments({ email: "abhinavgoyal300@gmail.com" }) === 0);
  const google = await guest.post("/api/auth/sign-in/social", { data: { provider: "google", callbackURL: "/login", disableRedirect: true } });
  const googleBody = await google.json();
  check("Google OAuth initialization returns provider URL", google.status() === 200 && new URL(googleBody.url).hostname === "accounts.google.com");
  const user = await signup(member, "member@example.test", "New member");
  const otherUser = await signup(other, "other@example.test", "Other member");
  const adminUser = await signup(admin, "admin-fixture@example.test", "Admin fixture");
  check("client cannot self-verify signup or grant admin", user.emailVerified === false && (await member.get("/api/admin/accounts")).status() === 403);
  await db.collection("gh_auth_user").updateOne({ _id: adminUser._id }, { $set: { email: "abhinavgoyal300@gmail.com", emailVerified: false } });
  check("unverified allowlisted account denied", (await admin.get("/api/admin/accounts")).status() === 403);
  await db.collection("gh_auth_user").updateOne({ _id: adminUser._id }, { $set: { emailVerified: true } });
  check("verified master fixture has admin access", (await admin.get("/api/admin/accounts")).status() === 200);
  const deniedPage = await member.get("/admin", { maxRedirects: 0 });
  const deniedHtml = await deniedPage.text();
  check("member receives admin-page redirect without account list", deniedPage.status() === 307 || (deniedPage.status() === 200 && deniedHtml.includes("/profile") && !deniedHtml.includes("All accounts")));
  check("member cannot assign tickets", (await member.post(`/api/admin/accounts/${user._id}/tickets`, { multipart: ticketForm })).status() === 403);
  check("member cannot check in tickets", (await member.post("/api/admin/check-in", { data: { eventKey: "f".repeat(64), qrData } })).status() === 403);
  const profile = { name: "Actual Profile Name", dateOfBirth: "2005-06-15", gender: "prefer-not-to-say", photo: imageFile(photo, "avatar.png") };
  check("member creates own profile", (await member.post("/api/profile", { multipart: profile })).status() === 201);
  const search = await (await admin.get("/api/admin/accounts?q=Actual%20Profile%20Name")).json();
  check("account search finds displayed profile name", search.total === 1 && search.accounts[0].id === String(user._id));
  const allAccounts = await (await admin.get("/api/admin/accounts")).json();
  check("admin lists complete and incomplete accounts without credentials", allAccounts.total === 3 && allAccounts.accounts.some((a) => !a.profile) && !JSON.stringify(allAccounts).includes("password"));
  const edit = { name: "Edited Member", email: user.email, dateOfBirth: "2004-02-29", gender: "non-binary" };
  check("member cannot edit another account", (await member.patch(`/api/admin/accounts/${otherUser._id}`, { multipart: { name: "Bad edit", email: otherUser.email } })).status() === 403);
  check("cross-origin account edit blocked", (await admin.patch(`/api/admin/accounts/${user._id}`, { headers: { Origin: "https://untrusted.example" }, multipart: edit })).status() === 403);
  check("admin edits profile details", (await admin.patch(`/api/admin/accounts/${user._id}`, { multipart: edit })).status() === 200);
  const edited = await (await member.get("/api/profile")).json();
  check("edited details persist for member", edited.profile.name === edit.name && edited.profile.dateOfBirth === edit.dateOfBirth && edited.profile.gender === edit.gender);
  check("master email reassignment blocked", (await admin.patch(`/api/admin/accounts/${user._id}`, { multipart: { ...edit, email: "yadivya070909@gmail.com" } })).status() === 403);
  check("master identity email cannot change", (await admin.patch(`/api/admin/accounts/${adminUser._id}`, { multipart: { name: "Admin fixture", email: "changed@example.test" } })).status() === 403);
  await db.collection("gh_auth_account").insertOne({ userId: otherUser._id, providerId: "google", accountId: "test-only-google-subject", createdAt: new Date(), updatedAt: new Date() });
  check("Google-linked email cannot be reassigned", (await admin.patch(`/api/admin/accounts/${otherUser._id}`, { multipart: { name: "Other member", email: "new-google@example.test" } })).status() === 403);
  check("no-QR upload rejected", (await admin.post(`/api/admin/accounts/${user._id}/tickets`, { multipart: { ...ticketForm, ticket: imageFile(photo) } })).status() === 400);
  check("fake image upload rejected", (await admin.post(`/api/admin/accounts/${user._id}/tickets`, { multipart: { ...ticketForm, ticket: imageFile(Buffer.from("not an image")) } })).status() === 400);
  const upload = await admin.post(`/api/admin/accounts/${user._id}/tickets`, { multipart: ticketForm });
  check("admin uploads QR ticket for selected member", upload.status() === 201);
  const ticket = (await upload.json()).ticket;
  check("duplicate QR for same event rejected", (await admin.post(`/api/admin/accounts/${otherUser._id}/tickets`, { multipart: ticketForm })).status() === 409);
  const mine = await (await member.get("/api/tickets")).json();
  check("member sees assigned event ticket", mine.tickets.length === 1 && mine.tickets[0].eventName === ticketForm.eventName);
  check("other member list remains private", (await (await other.get(`/api/tickets?userId=${user._id}`)).json()).tickets.length === 0);
  check("guest cannot fetch slip", (await guest.get(ticket.imageUrl)).status() === 401);
  check("other member cannot fetch slip", (await other.get(ticket.imageUrl)).status() === 404);
  const ownImage = await member.get(ticket.imageUrl);
  check("owner image is private and uncached", ownImage.status() === 200 && ownImage.headers()["cache-control"].includes("no-store"));
  const raw = await sharp(await ownImage.body()).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  check("stored full slip QR stays readable", raw.info.width === 600 && raw.info.height === 800 && jsQR(new Uint8ClampedArray(raw.data), raw.info.width, raw.info.height)?.data === qrData);
  check("admin can view member slip", (await admin.get(ticket.imageUrl)).status() === 200);
  check("download returns attachment", (await member.get(`${ticket.imageUrl}?download=1`)).headers()["content-disposition"].startsWith("attachment"));
  check("wrong event does not admit", (await admin.post("/api/admin/check-in", { data: { eventKey: "f".repeat(64), qrData } })).status() === 404);
  check("cross-origin scan blocked", (await admin.post("/api/admin/check-in", { headers: { Origin: "https://untrusted.example" }, data: { eventKey: ticket.eventKey, qrData } })).status() === 403);
  const simultaneous = await Promise.all([1, 2].map(() => admin.post("/api/admin/check-in", { data: { eventKey: ticket.eventKey, qrData } })));
  check("concurrent scans admit exactly once", simultaneous.map((r) => r.status()).sort().join(",") === "200,409");
  check("ticket cannot be reused", (await admin.post("/api/admin/check-in", { data: { eventKey: ticket.eventKey, qrData } })).status() === 409);
  const used = await (await member.get("/api/tickets")).json();
  check("check-in status persists in member tickets", used.tickets[0].status === "checked-in" && Boolean(used.tickets[0].checkedInAt));

  browser = await chromium.launch({ headless: true, channel: "msedge", args: ["--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream"] });
  const browserErrors = [];
  const adminContext = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce", storageState: await admin.storageState() });
  const page = await adminContext.newPage();
  page.on("pageerror", (error) => browserErrors.push(error.message));
  const capture = async (target, label, width) => {
    await target.setViewportSize({ width, height: 900 });
    await target.evaluate(() => document.fonts.ready);
    const file = path.join(output, `${label}-${width}.png`);
    await target.screenshot({ path: file, fullPage: true });
    check(`${label} fits ${width}px viewport`, await target.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    report.screenshots.push(file);
  };
  await page.goto(`${baseURL}/login`);
  await page.waitForURL("**/admin");
  check("master login opens admin dashboard", await page.getByRole("heading", { name: "All accounts", exact: true }).isVisible());
  await page.getByRole("button", { name: /Edited Member.*member@example.test/ }).click();
  await page.getByLabel("Full name", { exact: true }).fill("Member from Admin UI");
  await page.getByRole("button", { name: "Save account changes", exact: true }).click();
  await page.getByText("Account changes saved.", { exact: true }).waitFor();
  check("admin form saves member edits", (await (await member.get("/api/profile")).json()).profile.name === "Member from Admin UI");
  await page.getByLabel("Event name", { exact: true }).fill(ticketForm.eventName);
  await page.getByLabel("Event date (optional)").fill(ticketForm.eventDate);
  await page.getByLabel("Venue (optional)").fill(ticketForm.venue);
  await page.getByLabel("Ticket slip image").setInputFiles(imageFile(largeSlip2));
  await page.getByRole("button", { name: "Upload ticket to this account" }).click();
  await page.getByText("Ticket uploaded. It is now in this member’s My tickets section.", { exact: true }).waitFor();
  check("admin UI uploads ticket", (await (await member.get("/api/tickets")).json()).tickets.length === 2);
  for (const width of [375, 768, 1280]) await capture(page, "admin-accounts", width);
  const memberContext = await browser.newContext({ viewport: { width: 375, height: 900 }, reducedMotion: "reduce", storageState: await member.storageState() });
  const memberPage = await memberContext.newPage();
  memberPage.on("pageerror", (error) => browserErrors.push(error.message));
  await memberPage.goto(`${baseURL}/admin`);
  await memberPage.waitForURL("**/profile");
  check("browser redirects ordinary members away from admin", memberPage.url() === `${baseURL}/profile`);
  await memberPage.goto(`${baseURL}/tickets`);
  await memberPage.getByRole("heading", { name: "My tickets", exact: true }).waitFor();
  for (const width of [375, 768, 1280]) await capture(memberPage, "member-tickets", width);
  check("member wordmark points to canonical website", await memberPage.getByRole("link", { name: "GoldenHour Delhi home" }).getAttribute("href") === "https://www.goldenhourdelhi.co.in");
  await page.getByRole("link", { name: "Check in", exact: true }).click();
  await page.waitForURL("**/admin/check-in");
  await page.getByRole("button", { name: "Start camera", exact: true }).waitFor();
  check("normal navigation loads scanner camera policy", await page.evaluate(() => document.featurePolicy?.allowsFeature("camera")));
  await page.getByRole("button", { name: "Start camera", exact: true }).click();
  await page.locator("video:visible").waitFor();
  check("scanner starts a simulated camera stream", await page.locator("video").evaluate((v) => v.srcObject?.getVideoTracks()[0]?.readyState === "live"));
  const cameraTrack = await page.locator("video").evaluateHandle((v) => v.srcObject.getVideoTracks()[0]);
  await page.getByRole("button", { name: "Stop camera" }).click();
  check("Stop camera releases the stream", await cameraTrack.evaluate((track) => track.readyState === "ended") && await page.locator("video").evaluate((v) => v.srcObject === null));
  await cameraTrack.dispose();
  await page.getByLabel("Or scan a ticket image").setInputFiles(imageFile(largeSlip2));
  await page.getByRole("heading", { name: "Entry confirmed.", exact: true }).waitFor();
  check("browser image scanner admits uploaded slip", await page.getByText("Member from Admin UI", { exact: true }).isVisible());
  for (const width of [375, 768, 1280]) await capture(page, "scanner-accepted", width);
  await page.getByRole("button", { name: "Scan next ticket" }).click();
  await page.getByLabel("Or scan a ticket image").setInputFiles(imageFile(slip2));
  await page.getByRole("heading", { name: "Already checked in.", exact: true }).waitFor();
  check("browser repeat scan rejects reuse", await page.getByText("This ticket has already been used. Do not admit another entry with it.").isVisible());
  await capture(page, "scanner-rejected", 375);
  await memberPage.reload();
  check("member reload shows both used tickets", await memberPage.getByText("Checked in", { exact: true }).count() === 2);
  check("no browser runtime errors", browserErrors.length === 0);
  await memberContext.close(); await adminContext.close();

  // A password user's email change must reset verification and revoke sessions.
  await db.collection("gh_auth_user").updateOne({ _id: user._id }, { $set: { emailVerified: true } });
  check("password email can be changed", (await admin.patch(`/api/admin/accounts/${user._id}`, { multipart: { ...edit, email: "changed-member@example.test" } })).status() === 200);
  check("email edit revokes existing sessions", (await member.get("/api/tickets")).status() === 401);
  check("email edit leaves new email unverified", (await db.collection("gh_auth_user").findOne({ _id: user._id })).emailVerified === false);
} catch (error) {
  report.failures.push(redact(error.stack || error));
  console.error(redact(error.message)); process.exitCode = 1;
} finally {
  await browser?.close();
  for (const api of contexts) await api.dispose();
  if (server && server.exitCode === null) {
    if (process.platform === "win32") await new Promise((resolve) => spawn("taskkill", ["/PID", String(server.pid), "/T", "/F"], { windowsHide: true, stdio: "ignore" }).on("exit", resolve));
    else server.kill("SIGTERM");
  }
  if (/^gh_admin_test_\d+_[a-f0-9]{6}$/.test(dbName) && dbName !== originalDb) {
    try { await db.dropDatabase(); report.cleanup = true; } catch { report.failures.push("Temporary test database cleanup failed."); process.exitCode = 1; }
  }
  await client.close();
  await writeFile(path.join(output, "report.json"), JSON.stringify(report, null, 2));
  await writeFile(path.join(output, "server.log"), redact(logs));
  console.log(`Checks passed: ${report.checks.length}; failures: ${report.failures.length}; temporary database removed: ${report.cleanup}`);
}
