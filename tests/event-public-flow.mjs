import assert from 'node:assert/strict';
import sharp from 'sharp';
const base = process.env.SITE_TEST_URL || 'http://127.0.0.1:3111';
for (const path of ['/', '/goldenhour', '/parents', '/about', '/terms', '/guardian-consent', '/thank-you', '/llms.txt']) {
 const r = await fetch(base + path); assert.equal(r.status, 200);
 const body = await r.text(); assert.ok(!body.includes('class="intro-loader')); assert.ok(!body.includes('{primaryRegistration.message}')); assert.doesNotMatch(body, /14 November 2026|14 NOVEMBER 2026|2026-11-14/); assert.match(body, /polls announced on WhatsApp/i); if (path === '/goldenhour') { assert.ok(!body.includes('Time until GoldenHour starts')); assert.ok(!body.includes('href="/event.ics"')); assert.ok(!body.includes('"startDate"')); } console.log(path, 'OK');
}
const calendar = await fetch(base + '/event.ics'); const text = await calendar.text();
assert.equal(calendar.status, 409); assert.match(text, /Tentative.*to be announced/); assert.ok(!text.includes("DTSTART")); console.log("Calendar: unavailable until date is confirmed");
const social = await fetch(base + '/social/goldenhour'); assert.equal(social.status, 200);
const meta = await sharp(Buffer.from(await social.arrayBuffer())).metadata(); assert.equal(meta.width, 1200); assert.equal(meta.height, 630); console.log('Social image: 1200 x 630');
