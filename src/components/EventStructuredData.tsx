import { eventConfig } from "@/lib/event";

export default function EventStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "GOLDENHOUR",
    description: "A student-led 12-hour technology event from 8:00 AM to 8:00 PM for builders, designers, and makers.",
    startDate: eventConfig.isoDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: eventConfig.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Delhi",
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "GOLDENHOUR organizing team",
      email: "goldenhourdelhi@gmail.com",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/PreOrder",
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
