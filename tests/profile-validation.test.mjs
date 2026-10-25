import { test } from "node:test";
import assert from "node:assert/strict";
import { validateProfileFields } from "../src/lib/profile-schema.ts";
import { BodyTooLargeError, readBoundedBody } from "../src/lib/request-body.ts";

const now = new Date("2026-10-25T12:00:00Z");
const valid = { name: "Test Member", dateOfBirth: "2005-02-28", gender: "prefer-not-to-say" };

test("accepts and normalizes profile values, including a privacy-preserving gender option", () => {
  const result = validateProfileFields({ ...valid, name: "  Test   Member  " }, now);
  assert.deepEqual(result.fields, {});
  assert.equal(result.value.name, "Test Member");
  assert.equal(result.value.gender, "prefer-not-to-say");
});

test("rejects absent fields, invalid values and control characters", () => {
  for (const name of ["", "A", "x".repeat(81), "Test\u200bMember", { $ne: null }]) {
    assert.ok(validateProfileFields({ ...valid, name }, now).fields.name);
  }
  assert.ok(validateProfileFields({ ...valid, gender: "invalid" }, now).fields.gender);
  assert.deepEqual(Object.keys(validateProfileFields({}, now).fields), ["name", "dateOfBirth", "gender"]);
});

test("rejects invalid calendar dates, future dates, today and dates before 1900", () => {
  for (const dateOfBirth of ["2005-02-29", "2026-04-31", "2026-13-01", "2026-10-25", "2030-01-01", "1899-12-31", "1/2/2005", "", {}]) {
    assert.ok(validateProfileFields({ ...valid, dateOfBirth }, now).fields.dateOfBirth, String(dateOfBirth));
  }
  assert.deepEqual(validateProfileFields({ ...valid, dateOfBirth: "2004-02-29" }, now).fields, {});
});

test("bounded reader accepts exact limit and rejects oversized declared length", async () => {
  const request = new Request("http://localhost", { method: "POST", body: "1234" });
  assert.equal(new TextDecoder().decode(await readBoundedBody(request, 4)), "1234");
  const over = new Request("http://localhost", { method: "POST", body: "12345", headers: { "Content-Length": "5" } });
  await assert.rejects(readBoundedBody(over, 4), BodyTooLargeError);
});

test("bounded reader rejects streamed oversized data without Content-Length", async () => {
  const body = new ReadableStream({ start(controller) { controller.enqueue(new TextEncoder().encode("12345")); controller.close(); } });
  const request = new Request("http://localhost", { method: "POST", body, duplex: "half" });
  await assert.rejects(readBoundedBody(request, 4), BodyTooLargeError);
});
