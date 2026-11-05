import { team } from "./team";
import { registrationAction, registrationCopy, type RegistrationStatus } from "./registration";
export const registrationStatus: RegistrationStatus = "closed";
export const eventConfig = {
  siteName: "GoldenHour Delhi",
  entityName: "GoldenHour",
  alternateName: "GoldenHour hackathon",
  siteUrl: "https://www.goldenhourdelhi.co.in",
  description: "GoldenHour V1 is a free, student-run 12-hour build day for participants aged 13–19 (under 20 on event day) in Delhi NCR.",
  date: "14 November 2026",
  dateShort: "14 November 2026",
  isoDate: "2026-11-14T08:00:00+05:30",
  endIsoDate: "2026-11-14T20:00:00+05:30",
  dateStatus: "CONFIRMED",
  venue: "Venue to be announced",
  location: "Delhi NCR, India",
  duration: "12 hours",
  activeBuildHours: "About 6 hours",
  entry: "Free",
  ageLimit: "Ages 13–19; must be under 20 on 14 November 2026",
  minimumAge: 13,
  teamSize: "1–3 participants",
  participantLimit: "100+ students",
  registrationStatus,
  registrationOpen: ["open"].includes(registrationStatus),
  tracks: ["Web Development", "Game Development", "Graphic Designing"],
  prizes: ["$100 worth of Fueler Premium per winner", "AI Interview Vouchers worth ₹550 for winners", "90% AI Interview Discount Vouchers for runners-up", "Digital certificates", "Provisional: Fueler Digital Bundle ($800 stated value) for participants", "Provisional: InterviewBuddy 10% expert-driven session discount for participants", "CodeCrafters VIP memberships", "GoldenHour trophies", "80 sponsored one-month n8n Cloud Pro licenses ($60 value each; limited allocation)", "Certificates", "Stickers"],
  registrationUrl: "https://forms.gle/2om1zTVv5FCau56r5",
  guardianConsentUrl: "/guardian-consent",
  whatsappCommunityUrl: "https://chat.whatsapp.com/CpSkfYnkEmKAXURIWp7TQi",
  volunteerUrl: "https://forms.gle/Riv3qEv3Bf7YTCdV9",
  codeCraftersUrl: "https://www.codecrafters.io",
  osenUrl: "https://osen.live/",
  refreshmentPartner: "SEWAN FOODS",
  giftSponsor: "n8n",
  contactEmail: "hello@goldenhourdelhi.co.in",
  instagramUrl: "https://www.instagram.com/goldenhour.delhi/",
  linkedinUrl: "https://www.linkedin.com/company/goldenhourdelhi/",
  founders: team.filter((person) => person.founder).map((person) => person.name),
  leadOrganizers: team.filter((person) => person.group === "lead").map((person) => person.name),
  coOrganizers: team.filter((person) => person.group === "co").map((person) => person.name),
  lastUpdated: "2026-10-24",
} as const;

export const faqItems = [
 { q: "What if I turn 20 near the event?", a: "Eligibility is measured on 14 November 2026: you must have turned 13 and must not yet have turned 20.", detail: "Participants under 18 need guardian consent." },
 { q: "Can beginners and friends from different schools form a team?", a: "Beginners are welcome. Teams may have one, two or three eligible participants.", detail: "[CONFIRM: mixed-school team policy]. Contact the organisers before registering if your team needs clarification." },
 { q: "Can we use AI and who owns our work?", a: "Disclose AI tools in your README, credit third-party work and follow its licences. Start the event project during the event.", detail: "[CONFIRM: participant IP ownership and any licence granted to organisers for judging or promotion]." },
 { q: "Is accommodation available for visitors?", a: "No overnight accommodation is provided. Arrange your travel and journey home before attending.", detail: "The event ends at 8 PM IST. Guardians must arrange travel home for minors." },
 { q: "Are there refunds or guaranteed certificates?", a: "Registration is free, so there is no registration fee to refund.", detail: "[CONFIRM: certificate eligibility, delivery method and issue date]. Do not book non-refundable travel on the assumption that event arrangements cannot change." },
 { q: "What if the venue, date or weather changes?", a: "Check the event page and contact the team before travelling.", detail: "[CONFIRM: cancellation/postponement procedure, notification channels and timing]." },

  { q: "What is GoldenHour V1?", a: "A free, student-led 12-hour hackathon in Delhi NCR, scheduled for 14 November 2026.", detail: "The venue will be announced once confirmed." },
  { q: "Who can participate, and how big can teams be?", a: "Participants must be 13–19 years old on event day. Teams can have 1–3 members, including solo participants.", detail: "Participants under 18 need parent or guardian consent." },
  { q: "Which tracks are available?", a: "Web Development, Game Development and Graphic Designing.", detail: "Already registered? To switch to Graphic Designing, ask your team leader to message the organizers; you do not need to submit another form." },
  { q: "How do we register?", a: "The team leader fills out the official registration form once for their team.", detail: registrationCopy[registrationStatus].message },
  { q: "How are winners selected?", a: "Judges assess eligible submissions for functionality, execution, design and creativity.", detail: "First, second and third place are conditional on the number of eligible teams and judging standards. Some positions may remain unawarded." },
  { q: "What do winners receive?", a: "Each winner receives a digital certificate, $100 worth of Fueler Premium and an AI Interview Voucher worth ₹550.", detail: "Runners-up receive a 90% AI Interview Discount Voucher. Provisional participant offers: Fueler Digital Bundle (stated value $800) and InterviewBuddy 10% expert-driven session discount, subject to sponsor confirmation. There are 80 sponsored n8n Cloud Pro licenses (one month each), subject to allocation." },
  { q: "What must we submit?", a: "A project repository, README and working demonstration by the published submission deadline.", detail: "AI tools may be used if disclosed. The project must be built during the event." },
] as const;

export const eventDateLabel = eventConfig.dateShort;
export const eventStatusLine = `${eventDateLabel}. Venue to be announced. ${registrationCopy[registrationStatus].message}`;
export const canonicalEventPath = "/goldenhour";

export const primaryRegistration = registrationAction(registrationStatus, { registration: eventConfig.registrationUrl, community: eventConfig.whatsappCommunityUrl, waitlist: `mailto:${eventConfig.contactEmail}?subject=Waitlist%20request` });
