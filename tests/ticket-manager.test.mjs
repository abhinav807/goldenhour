import test from 'node:test';
import assert from 'node:assert/strict';
import {ticketRecipient,parseTicketCsv} from '../src/lib/ticket-manager-schema.ts';
import {todayIST} from '../src/lib/ticket-date.ts';
test('ticket recipients normalize Indian phones and account email',()=>{
 const row=ticketRecipient({name:' Ada ',phone:'+91 98765 43210',email:'ADA@example.com',date:'2026-11-14'});
 assert.equal(row.phone,'919876543210');assert.equal(row.email,'ada@example.com');assert.equal(row.name,'Ada');
});
test('invalid dates, names and phones are rejected',()=>{
 for(const patch of [{name:'\u0000'},{date:'2026-02-30'},{phone:'hello'},{email:'bad'}])assert.throws(()=>ticketRecipient({name:'Ada',date:'2026-11-14',...patch}));
});
test('CSV handles quotes, row errors, optional date and duplicate phone warnings',()=>{
 const rows=parseTicketCsv('name,phone,date,email\n"Ada, A",9876543210,,\nBen,9876543210,2026-11-14,\nBad,nope,,','2026-11-14');
 assert.equal(rows[0].value.name,'Ada, A');assert.equal(rows[0].value.date,'2026-11-14');assert.ok(rows[1].warning);assert.ok(rows[2].error);
 assert.throws(()=>parseTicketCsv(Array(102).fill('Ada').join('\n'),'2026-11-14'));
 assert.ok(parseTicketCsv('"unfinished','2026-11-14')[0].error);
});
test('IST day changes at 18:30 UTC',()=>{
 assert.equal(todayIST(new Date('2026-11-13T18:29:59Z')),'2026-11-13');
 assert.equal(todayIST(new Date('2026-11-13T18:30:00Z')),'2026-11-14');
});

test("tentative ticket dates stay unset in individual and CSV creation", () => {
 assert.equal(ticketRecipient({ name: "Ada", date: "" }).date, "");
 const [row] = parseTicketCsv("name,phone,date,email\nAda,,,", "");
 assert.equal(row.error, "");
 assert.equal(row.value.date, "");
});
