// Run with a locally available Playwright module and an isolated Atlas test DB.
// Node 22.18+; no real emails or Google account consent are sent by this check.
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { spawn } from "node:child_process";
import nextEnv from "@next/env";
import { MongoClient } from "mongodb";
import sharp from "sharp";

nextEnv.loadEnvConfig(process.cwd(), true, { info() {}, error() {} });
const originalDb = process.env.MONGODB_DB;
const dbName = `gh_auth_test_${Date.now()}_${randomBytes(3).toString("hex")}`;
const baseURL = "http://localhost:3100";
const output = process.env.AUTH_TEST_OUTPUT;
if (!output) throw new Error("Set AUTH_TEST_OUTPUT to an evidence directory outside the repository.");
await mkdir(output, { recursive: true });
const playwright = process.env.PLAYWRIGHT_MODULE_PATH
  ? await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE_PATH).href)
  : await import("playwright");
const { chromium, request: requestFactory } = playwright;
const client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
const db = client.db(dbName);
const report = { checks: [], screenshots: [], failures: [], database: "isolated temporary database", cleanup: false };
const check = (name, condition) => { assert.ok(condition, name); report.checks.push(name); console.log(`PASS: ${name}`); };
let browser;
let server;
let logs = "";
const password = `TestOnly-${randomBytes(16).toString("hex")}!`;
const redact = (value) => {
  for (const key of ["MONGODB_URI", "GOOGLE_CLIENT_SECRET", "AUTH_SECRET", "GOOGLE_CLIENT_ID"]) {
    if (process.env[key]) value = value.split(process.env[key]).join(`[${key} REDACTED]`);
  }
  return value.split(password).join("[TEST_PASSWORD REDACTED]");
};
const poll = async (fn, message, timeout = 60000) => {
  const until = Date.now() + timeout;
  while (Date.now() < until) {
    if (await fn().catch(() => false)) return;
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error(message);
};
try {
  await client.connect();
  assert.notEqual(dbName, originalDb);
  server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "--port", "3100"], {
    cwd: process.cwd(), windowsHide: true,
    env: { ...process.env, MONGODB_DB: dbName, AUTH_URL: baseURL, AUTH_SECRET: randomBytes(32).toString("hex"), NEXT_TELEMETRY_DISABLED: "1" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.stdout.on("data", (data) => { logs += data.toString(); });
  server.stderr.on("data", (data) => { logs += data.toString(); });
  await poll(async () => { const res = await fetch(`${baseURL}/login`); return res.status === 200; }, "Local server did not become ready", 180000);
  const api = await requestFactory.newContext({ baseURL, extraHTTPHeaders: { Origin: baseURL, "x-real-ip": "127.0.0.2" } });
  check("unauthenticated profile blocked", (await api.get("/api/profile")).status() === 401);
  check("unauthenticated photo blocked", (await api.get("/api/profile/photo")).status() === 401);
  check("unauthenticated profile page redirects to login", (await api.get("/profile", { maxRedirects: 0 })).status() === 307);
  const google = await api.post("/api/auth/sign-in/social", { data: { provider: "google", callbackURL: "/onboarding", errorCallbackURL: "/login?error=google", disableRedirect: true } });
  const googleBody = await google.json();
  check("Google OAuth initialization succeeds", google.status() === 200 && Boolean(googleBody.url));
  const googleUrl = new URL(googleBody.url);
  check("Google provider and callback URL correct", googleUrl.hostname === "accounts.google.com" && googleUrl.searchParams.get("redirect_uri") === `${baseURL}/api/auth/callback/google`);
  check("Google OAuth includes state and PKCE", Boolean(googleUrl.searchParams.get("state")) && Boolean(googleUrl.searchParams.get("code_challenge")));
  const badCallback = await api.get("/api/auth/callback/google?code=invalid&state=invalid", { maxRedirects: 0 });
  check("invalid Google callback does not authenticate", badCallback.status() >= 300 && !(await (await api.get("/api/auth/get-session")).json())?.user);

  browser = await chromium.launch({ headless: true, ...(process.env.AUTH_TEST_BROWSER ? { executablePath: process.env.AUTH_TEST_BROWSER } : { channel: "msedge" }) });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  await context.addInitScript(() => localStorage.setItem("gh-cookie-consent", "declined"));
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  const capture = async (label, width) => {
    await page.setViewportSize({ width, height: 900 });
    await page.locator(".intro-loader").waitFor({ state: "detached", timeout: 15000 });
    await page.evaluate(() => document.fonts.ready);
    const file = path.join(output, `${label}-${width}.png`);
    await page.screenshot({ path: file, fullPage: true });
    check(`${label} fits ${width}px viewport`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    report.screenshots.push({ file, width, height: 900 });
  };
  await page.goto(baseURL);
  await page.getByRole("link", { name: "Log in", exact: true }).waitFor();
  for (const width of [375, 768, 1280]) await capture("home", width);
  await page.getByRole("link", { name: "Log in", exact: true }).click();
  await page.waitForURL("**/login");
  for (const width of [375, 768, 1280]) await capture("login", width);
  check("Google login button rendered", await page.getByRole("button", { name: "Continue with Google" }).isVisible());
  await page.getByRole("button", { name: "Create an account", exact: true }).click();
  const email = `member-${Date.now()}@example.test`;
  await page.getByLabel("Email address").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByLabel("Confirm password").fill(`${password}wrong`);
  await page.getByRole("button", { name: "Create account", exact: true }).click();
  await page.getByRole("alert").filter({ hasText: "passwords don’t match" }).waitFor();
  check("signup rejects password mismatch", await page.getByRole("alert").isVisible());
  await page.getByLabel("Confirm password").fill(password);
  await page.getByRole("button", { name: "Create account", exact: true }).click();
  await page.waitForURL("**/onboarding", { timeout: 60000 });
  check("signup opens required profile setup", await page.getByLabel("Full name").isVisible());
  for (const width of [375, 768, 1280]) await capture("onboarding", width);
  const user = await db.collection("gh_auth_user").findOne({ email });
  assert.ok(user);
  const credential = await db.collection("gh_auth_account").findOne({ providerId: "credential", userId: user._id });
  check("password persisted only as a hash", Boolean(credential?.password) && credential.password !== password && !credential.password.includes(password));
  check("email signup remains unverified", user.emailVerified === false);
  const sessionCookies = (await context.cookies()).filter((cookie) => cookie.name.includes("session_token"));
  check("session cookie HttpOnly and SameSite", sessionCookies.length === 1 && sessionCookies[0].httpOnly && sessionCookies[0].sameSite === "Lax");
  const photo = await sharp({ create: { width: 600, height: 700, channels: 3, background: "#ff5a00" } }).png().toBuffer();
  const multipart = { name: "Test Builder", dateOfBirth: "2005-06-15", gender: "prefer-not-to-say", photo: { name: "avatar.png", mimeType: "image/png", buffer: photo } };
  const privateApi = context.request;
  const csrf = await privateApi.post(`${baseURL}/api/profile`, { headers: { Origin: "https://untrusted.example" }, multipart });
  check("cross-origin profile save blocked", csrf.status() === 403);
  const invalidDate = await privateApi.post(`${baseURL}/api/profile`, { headers: { Origin: baseURL }, multipart: { ...multipart, dateOfBirth: "2005-02-29" } });
  check("invalid calendar date rejected by server", invalidDate.status() === 400 && Boolean((await invalidDate.json()).fields?.dateOfBirth));
  const invalidPhoto = await privateApi.post(`${baseURL}/api/profile`, { headers: { Origin: baseURL }, multipart: { ...multipart, photo: { name: "fake.png", mimeType: "image/png", buffer: Buffer.from("not an image") } } });
  check("disguised non-image rejected by server", invalidPhoto.status() === 400);
  check("validation failures create no profile", await db.collection("gh_profiles").countDocuments({ _id: String(user._id) }) === 0);
  await page.getByLabel("Full name").fill("Test Builder");
  await page.getByLabel("Date of birth").fill("2005-06-15");
  await page.getByLabel("Gender", { exact: true }).selectOption("prefer-not-to-say");
  await page.getByLabel("Profile picture", { exact: true }).setInputFiles({ name: "avatar.png", mimeType: "image/png", buffer: photo });
  await page.getByRole("button", { name: "Create my profile", exact: true }).click();
  await page.getByRole("heading", { name: "Congrats! Your profile is created." }).waitFor({ timeout: 30000 });
  check("genuine save shows congratulations", await page.getByRole("heading", { name: "Congrats! Your profile is created." }).isVisible());
  for (const width of [375, 1280]) await capture("success", width);
  const stored = await db.collection("gh_profiles").findOne({ _id: String(user._id) });
  check("profile persisted under authenticated account", stored?.name === "Test Builder" && stored.dateOfBirth === "2005-06-15");
  const storedMeta = await sharp(Buffer.from(stored.photo.buffer)).metadata();
  check("photo normalized and metadata stripped", storedMeta.format === "webp" && storedMeta.width <= 512 && storedMeta.height <= 512 && !storedMeta.exif);
  const privatePhoto = await privateApi.get(`${baseURL}/api/profile/photo`);
  check("own photo served privately", privatePhoto.status() === 200 && privatePhoto.headers()["content-type"] === "image/webp" && privatePhoto.headers()["cache-control"].includes("no-store"));
  check("duplicate profile save rejected", (await privateApi.post(`${baseURL}/api/profile`, { headers: { Origin: baseURL }, multipart })).status() === 409);
  await page.getByRole("link", { name: "View my profile" }).click();
  await page.waitForURL("**/profile");
  await page.reload();
  await page.getByRole("heading", { name: "Test Builder", exact: true }).waitFor();
  check("profile persists after reload", await page.getByText("15 June 2005", { exact: true }).isVisible());
  await capture("profile", 375);
  await page.getByRole("button", { name: "Log out", exact: true }).click();
  await page.waitForURL(baseURL + "/");
  check("logout invalidates protected access", (await privateApi.get(`${baseURL}/api/profile`)).status() === 401);
  await page.getByRole("link", { name: "Log in", exact: true }).click();
  await page.getByLabel("Email address").fill(email);
  await page.getByLabel("Password", { exact: true }).fill("wrong-password-12345");
  await page.getByRole("button", { name: "Log in with email" }).click();
  await page.getByRole("alert").waitFor();
  check("incorrect password gives recoverable error", (await page.getByRole("alert").textContent()).includes("incorrect"));
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Log in with email" }).click();
  await page.waitForURL("**/profile", { timeout: 30000 });
  check("returning login opens saved profile", await page.getByRole("heading", { name: "Test Builder", exact: true }).isVisible());
  const second = await requestFactory.newContext({ baseURL, extraHTTPHeaders: { Origin: baseURL, "x-real-ip": "127.0.0.3" } });
  const secondSignup = await second.post("/api/auth/sign-up/email", { data: { name: "Another member", email: `second-${Date.now()}@example.test`, password } });
  check("second independent account signs up", secondSignup.status() === 200);
  check("second account cannot read first profile", (await (await second.get(`/api/profile?userId=${user._id}`)).json()).profile === null);
  check("second account cannot read first photo", (await second.get(`/api/profile/photo?userId=${user._id}`)).status() === 404);
  const duplicate = await second.post("/api/auth/sign-up/email", { data: { name: "Duplicate", email, password } });
  check("duplicate signup cannot overwrite first account", duplicate.status() >= 400 && await db.collection("gh_auth_user").countDocuments({ email }) === 1);
  const attacker = await second.post("/api/auth/sign-in/email", { headers: { Origin: "https://untrusted.example" }, data: { email, password } });
  check("cross-origin login blocked", attacker.status() === 403);
  check("no browser runtime errors", consoleErrors.length === 0);
  await second.dispose();
  await api.dispose();
  await context.close();
} catch (error) {
  report.failures.push(redact(error.stack || String(error)));
  console.error(redact(error.message));
  process.exitCode = 1;
} finally {
  await browser?.close();
  if (server && server.exitCode === null) {
    // Stop only the process tree started by this check, never other dev servers.
    if (process.platform === "win32") {
      await new Promise((resolve) => spawn("taskkill", ["/PID", String(server.pid), "/T", "/F"], { windowsHide: true, stdio: "ignore" }).on("exit", resolve));
    } else server.kill("SIGTERM");
  }
  if (/^gh_auth_test_\d+_[a-f0-9]{6}$/.test(dbName) && dbName !== originalDb) {
    try { await db.dropDatabase(); report.cleanup = true; } catch { report.failures.push("Temporary test database cleanup failed."); process.exitCode = 1; }
  }
  await client.close();
  await writeFile(path.join(output, "report.json"), JSON.stringify(report, null, 2));
  await writeFile(path.join(output, "server.log"), redact(logs));
  console.log(`Checks passed: ${report.checks.length}; failures: ${report.failures.length}; temporary database removed: ${report.cleanup}`);
}
