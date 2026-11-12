import { eventConfig } from "@/lib/event";
const escape = (s: string) => s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/[,;]/g, "\\$&");
const fold = (line: string) => {
 let result = "", width = 0;
 for (const char of line) {
  const size = Buffer.byteLength(char);
  if (width + size > 73) { result += "\r\n "; width = 1; }
  result += char; width += size;
 }
 return result;
};
export function GET() {
 if (!eventConfig.isoDate || !eventConfig.endIsoDate) return new Response(`Event date: ${eventConfig.date}. Calendar download will be available once the date is confirmed.`, { status: 409, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
 const utc = (s: string) => new Date(s).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
 const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//GoldenHour Delhi//Event//EN", "BEGIN:VEVENT", "UID:goldenhour-v1-2026@goldenhourdelhi.co.in", "DTSTAMP:20261101T000000Z", `DTSTART:${utc(eventConfig.isoDate)}`, `DTEND:${utc(eventConfig.endIsoDate)}`, "SUMMARY:GoldenHour V1", `LOCATION:${escape(eventConfig.venue)}`, `DESCRIPTION:${escape(eventConfig.description)}`, `URL:${eventConfig.siteUrl}/goldenhour`, "END:VEVENT", "END:VCALENDAR"];
 return new Response(lines.map(fold).join("\r\n") + "\r\n", { headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": 'attachment; filename="goldenhour-v1.ics"' } });
}
