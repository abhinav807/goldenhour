# Integrated ticket studio

TicketScan features from `abhinav807/ticket-maker-scanner` at
`da972f4f50f654872fa1ede5828110ab0f670f34` are adapted into GoldenHour.
Phone normalization and IST date helpers are retained from that source; CSV parsing,
management, delivery and public links use GoldenHour's existing infrastructure.

- `/admin/tickets`: single creation, CSV preview with row validation and duplicate-phone
  warnings, account linking by existing email, guest tickets, search, date/attendance/
  delivery filters, counters and paginated lists. Refreshes every 10 seconds while visible.
- WhatsApp queue: preview, copy bearer link, open WhatsApp, previous/next/skip and explicit
  sent/not-sent confirmation. The app never sends a WhatsApp message automatically.
- Existing `/tickets` shows account-linked tickets. Existing portrait PNG rendering,
  `GH-` serials, uploaded ticket QR data and `gh_tickets` storage remain in use.
- `/admin/check-in`: camera, image and serial input use the same atomic attendance update.
  Adds IST date validation, a session counter, optional sound, vibration and consent reminder.
- `/t/[token]`: explicitly enabled public bearer link, PNG download, no phone/email exposure,
  no analytics, noindex, no-store and 60 requests/minute/IP across page and image requests.
- Archive disables a ticket and its public link without permanently deleting its record.
  Attendance changes retain a bounded audit trail. Admins can correct attendance manually.

The original password-only login, Mongoose connection, second ticket collection and
12-character IDs are replaced by the existing verified-admin auth, MongoDB client and
GH serial format. No second account or deployment is needed.

Existing data in the separate TicketScan deployment is **not migrated** by this change.
No real tickets or messages are created/sent during verification. Importing historical
records with their old QR IDs/public URLs requires a separate compatibility migration.

Validation: `npm test`, `npm run lint`, `npm run build` and
`tests/ticket-manager-flow.mjs` (isolated temporary MongoDB database; see its environment
variables). Existing scanner regression coverage is `tests/admin-tickets-flow.mjs`.
