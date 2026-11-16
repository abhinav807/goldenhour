import { eventConfig } from "@/lib/event";

export function GET() {
  const body = `# ${eventConfig.siteName}\n\nGoldenHour V1 is postponed for 2027. The event page is currently unavailable. The new date and further updates will be announced on WhatsApp.\n\n- Home: ${eventConfig.siteUrl}/\n- Event update: ${eventConfig.siteUrl}/goldenhour\n- WhatsApp community: ${eventConfig.whatsappCommunityUrl}\n- Contact: mailto:${eventConfig.contactEmail}\n\nLast updated: ${eventConfig.lastUpdated}.`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
