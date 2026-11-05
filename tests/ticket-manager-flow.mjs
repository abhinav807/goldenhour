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
  await signup(other, "other@example.test", "Other member");
  const adminUser = await signup(admin, "admin-fixture@example.test", "Admin fixture");
  check("client cannot self-verify signup or grant admin", user.emailVerified === false && (await member.get("/api/admin/accounts")).status() === 403);
  await db.collection("gh_auth_user").updateOne({ _id: adminUser._id }, { $set: { email: "abhinavgoyal300@gmail.com", emailVerified: false } });
  check("unverified allowlisted account denied", (await admin.get("/api/admin/accounts")).status() === 403);
  await db.collection("gh_auth_user").updateOne({ _id: adminUser._id }, { $set: { emailVerified: true } });
  const today = new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Kolkata",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
  check("guest manager blocked",(await guest.get("/api/admin/ticket-manager")).status()===401);
  check("member manager blocked",(await member.get("/api/admin/ticket-manager")).status()===403);
  const batchId=crypto.randomUUID();
  const payload={batchId,rows:[{name:"Guest builder",phone:"9876543210",date:today},{name:"Account builder",email:"member@example.test",date:today},{name:"Invalid",date:"nope"}]};
  const created=await admin.post("/api/admin/ticket-manager",{data:payload});
  const result=await created.json();check("bulk per-row result",created.status()===200&&result.results[0].id&&result.results[1].id&&result.results[2].error);
  await admin.post("/api/admin/ticket-manager",{data:payload});check("retry does not duplicate tickets",await db.collection("gh_tickets").countDocuments({})===2);
  check("account-linked ticket in My tickets",(await (await member.get("/api/tickets")).json()).tickets.length===1);
  const list=await (await admin.get("/api/admin/ticket-manager")).json();check("dashboard totals",list.counts.total===2&&list.counts.present===0);
  const id=result.results[0].id; const row=list.rows.find(r=>r.id===id);
  check("GH serial retained",/^GH-[A-F0-9]{24}$/.test(row.serial));
  const shareResponse=await (await admin.post("/api/admin/ticket-manager",{data:{id,action:"share"}})).json();const token=shareResponse.url.split("/").pop();
  const publicPage=await guest.get(`/t/${token}`);check("bearer page works without login",publicPage.status()===200);check("public page excludes phone",!(await publicPage.text()).includes("919876543210"));
  const publicImage=await guest.get(`/t/${token}/image`);check("PNG download",publicImage.status()===200&&publicImage.headers()["content-type"]==="image/png");
  const img=await sharp(await publicImage.body()).ensureAlpha().raw().toBuffer({resolveWithObject:true});const qr=jsQR(new Uint8ClampedArray(img.data),img.info.width,img.info.height,{inversionAttempts:"attemptBoth"});check("generated ticket QR decodes",!!qr?.data);
  const doc=await db.collection("gh_tickets").findOne({_id:new (await import("mongodb")).ObjectId(id)});
  const scans=await Promise.all([admin.post("/api/admin/check-in",{data:{eventKey:doc.eventKey,qrData:qr.data}}),admin.post("/api/admin/check-in",{data:{eventKey:doc.eventKey,serialNumber:row.serial}})]);
  check("QR and serial share atomic attendance",scans.map(r=>r.status()).sort().join(",")==="200,409");
  await admin.post("/api/admin/ticket-manager",{data:{id,action:"sent"}});check("delivery confirmation saved",(await db.collection("gh_tickets").findOne({_id:doc._id})).sendStatus==="sent");
  await admin.post("/api/admin/ticket-manager",{data:{id,action:"absent"}});check("attendance reset",(await db.collection("gh_tickets").findOne({_id:doc._id})).status==="issued");
  await db.collection("gh_tickets").updateOne({_id:doc._id},{$set:{eventDate:"2000-01-01"}});check("wrong date rejected",(await admin.post("/api/admin/check-in",{data:{eventKey:doc.eventKey,serialNumber:row.serial}})).status()===422);
  browser=await chromium.launch({headless:true,executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe"});
  const ctx=await browser.newContext({storageState:await admin.storageState(),viewport:{width:390,height:844}});const page=await ctx.newPage();
  await page.goto(baseURL+"/admin/tickets");await page.getByRole("heading",{name:"All tickets",exact:true}).waitFor();await page.getByText("Guest builder",{exact:true}).waitFor();
  check("mobile ticket dashboard fits",await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.getByRole("button",{name:"ESSENTIAL ONLY",exact:true}).click();
  await page.screenshot({path:path.join(output,"ticket-studio-mobile.png"),fullPage:true});
  await page.getByRole("button",{name:"Bulk CSV",exact:true}).click();await page.getByLabel("Or paste CSV").fill("name,phone,date,email\nCSV builder,9876543210,,");await page.getByRole("button",{name:"Preview rows",exact:true}).click();await page.getByRole("button",{name:"Create 1 tickets",exact:true}).waitFor();check("CSV preview UI",true);
  await ctx.close();
  await admin.post("/api/admin/ticket-manager",{data:{id,action:"archive"}});check("archived share disabled",(await guest.get(`/t/${token}/image`)).status()===404);
  check("archived scan disabled",(await admin.post("/api/admin/check-in",{data:{eventKey:doc.eventKey,serialNumber:row.serial}})).status()===404);
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
