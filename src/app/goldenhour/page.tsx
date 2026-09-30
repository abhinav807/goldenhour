import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Events from "@/components/Events";
import Countdown from "@/components/Countdown";
import Rules from "@/components/Rules";
import Organizers from "@/components/Organizers";
import Sponsors from "@/components/Sponsors";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import MobileCTA from "@/components/MobileCTA";
import Dispatch from "@/components/Dispatch";
import Timeline from "@/components/Timeline";
import Prizes from "@/components/Prizes";
import BackToTop from "@/components/BackToTop";
import BackToHome from "@/components/BackToHome";
import Resources from "@/components/Resources";
import EventInfo from "@/components/EventInfo";
import EventAtAGlance from "@/components/EventAtAGlance";
import { BreadcrumbStructuredData, EventStructuredData, FAQStructuredData } from "@/components/StructuredData";
import { eventConfig } from "@/lib/event";

export default function GoldenHourPage() {
  return <>
    <EventStructuredData />
    <FAQStructuredData />
    <BreadcrumbStructuredData items={[{ name: "GoldenHour Delhi", path: "/" }, { name: "GoldenHour V1", path: "/goldenhour" }]} />
    <a href="#main-content" className="skip-link">SKIP TO MAIN CONTENT</a>
    <BackToHome />
    <ScrollReveal />
    <main id="main-content" className="event-page-root">
      <Hero />
      <EventAtAGlance />
      <section aria-labelledby="what-is-goldenhour" className="bg-offwhite px-5 md:px-10 py-16 md:py-24 border-b-4 border-black"><div className="max-w-[900px] mx-auto"><p className="gh-kicker">DEFINITION / GOLDENHOUR DELHI</p><h2 id="what-is-goldenhour" className="font-archivo text-4xl md:text-6xl leading-[.85] mt-5 mb-6">WHAT IS <span className="text-sunset">GOLDENHOUR?</span></h2><p className="font-dm text-lg leading-relaxed">GoldenHour V1 is a free, student-run 12-hour Build Day in Delhi NCR, with Web Development and Game Development tracks. Participants must be at least 13 and under 20 on 14 November 2026 (ages 13–19 on event day). The date is tentative and the venue is yet to be announced.</p></div></section>
      <Marquee />
      <About />
      <Events />
      <Timeline />
      <Countdown />
      <Dispatch />
      <Rules />
      <Organizers />
      <Prizes />
      <Marquee reverse speed={45} bg="bg-black" borderColor="border-sunset" />
      <Sponsors />
      <Resources />
      <EventInfo />
      <FinalCTA />
      <FAQ />
      <p className="sr-only">Event status: {eventConfig.dateStatus}. The event is scheduled for {eventConfig.date}, tentatively, in {eventConfig.location}. Registration is open. Participants must be at least 13 and under 20 on event day.</p>
    </main>
    <Footer />
    <MobileCTA />
    <BackToTop />
  </>;
}
