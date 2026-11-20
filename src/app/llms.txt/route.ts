import { eventConfig } from "@/lib/event";

export function GET() {
  const body = `# ${eventConfig.siteName}\n\n${eventConfig.postponementNotice} The full event page is currently unavailable. The next update will be shared on WhatsApp.\n\n- Home: ${eventConfig.siteUrl}/\n- Event update: ${eventConfig.siteUrl}/goldenhour\n- WhatsApp community: ${eventConfig.whatsappCommunityUrl}\n- Contact: mailto:${eventConfig.contactEmail}\n\nLast updated: ${eventConfig.lastUpdated}.`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
