import { eventConfig, faqItems } from "@/lib/event";

const organization = {
  "@type": "Organization",
  "@id": `${eventConfig.siteUrl}/#organization`,
  name: eventConfig.siteName,
  alternateName: [eventConfig.entityName, eventConfig.alternateName],
  url: eventConfig.siteUrl,
  logo: `${eventConfig.siteUrl}/brand/goldenhour-symbol.png`,
  sameAs: [eventConfig.instagramUrl, eventConfig.linkedinUrl],
  contactPoint: { "@type": "ContactPoint", contactType: "general inquiries", email: eventConfig.contactEmail },
  founder: eventConfig.founders.map((name) => ({ "@type": "Person", name })),
};

export function SiteStructuredData() {
  const graph = [organization, { "@type": "WebSite", "@id": `${eventConfig.siteUrl}/#website`, url: eventConfig.siteUrl, name: eventConfig.siteName, alternateName: eventConfig.alternateName, publisher: { "@id": `${eventConfig.siteUrl}/#organization` } }];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }} />;
}

export function EventStructuredData() {
  const event = {
    "@type": "Event",
    "@id": `${eventConfig.siteUrl}/goldenhour#event`,
    name: "GoldenHour V1 — Free 12-Hour Student Build Day",
    alternateName: eventConfig.alternateName,
    description: `${eventConfig.description} Date is tentative; venue is to be announced. Registration is open.`,
    startDate: eventConfig.isoDate,
    endDate: eventConfig.endIsoDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: eventConfig.venue, address: { "@type": "PostalAddress", addressLocality: "Delhi", addressRegion: "Delhi NCR", addressCountry: "IN" } },
    organizer: { "@id": `${eventConfig.siteUrl}/#organization` },
    sponsor: [
      { "@type": "Organization", name: "CodeCrafters", url: eventConfig.codeCraftersUrl },
      { "@type": "Organization", name: "OSEN", url: eventConfig.osenUrl },
      { "@type": "Organization", name: eventConfig.refreshmentPartner },
      { "@type": "Organization", name: eventConfig.giftSponsor },
    ],
    isAccessibleForFree: true,
    offers: { "@type": "Offer", url: eventConfig.registrationUrl, price: 0, priceCurrency: "INR", availability: "https://schema.org/InStock", description: "Free registration is open." },
    audience: { "@type": "Audience", audienceType: "Participants aged 13–19 on the event date (under 20)" },
    image: `${eventConfig.siteUrl}/og/goldenhour.png`,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...event }) }} />;
}

export function FAQStructuredData() {
  const data = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map(({ q, a, detail }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: `${a} ${detail}` } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; path: string }> }) {
  const data = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${eventConfig.siteUrl}${item.path}` })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
