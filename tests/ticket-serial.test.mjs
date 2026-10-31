import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeTicketSerial } from '../src/lib/ticket-schema.ts';
test('serial entry normalizes case and whitespace and rejects invalid identifiers', () => {
 assert.equal(normalizeTicketSerial(' gh-507f1f77bcf86cd799439011 '), 'GH-507F1F77BCF86CD799439011');
 assert.throws(() => normalizeTicketSerial('507f1f77bcf86cd799439011'));
 assert.throws(() => normalizeTicketSerial('GH-foo'));
});
