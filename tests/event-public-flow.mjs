import assert from 'node:assert/strict';
import sharp from 'sharp';
const base = process.env.SITE_TEST_URL || 'http://127.0.0.1:3111';
for (const path of ['/', '/goldenhour', '/parents', '/code-of-conduct']) {
 const r = await fetch(base + path); assert.equal(r.status, 200);
 const body = await r.text(); assert.ok(!body.includes('class="intro-loader')); assert.ok(!body.includes('{primaryRegistration.message}')); console.log(path, 'OK');
}
const calendar = await fetch(base + '/event.ics'); const text = await calendar.text();
assert.match(text, /DTSTART:20261114T023000Z/); assert.match(text, /DTEND:20261114T143000Z/); console.log('Calendar: correct IST boundaries');
const social = await fetch(base + '/social/parents'); assert.equal(social.status, 200);
const meta = await sharp(Buffer.from(await social.arrayBuffer())).metadata(); assert.equal(meta.width, 1200); assert.equal(meta.height, 630); console.log('Social image: 1200 x 630');
