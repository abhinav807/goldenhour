import Hero from "@/components/Hero";
import Events from "@/components/Events";
import Countdown from "@/components/Countdown";
import Rules from "@/components/Rules";
import Team from "@/components/Team";
import Sponsors from "@/components/Sponsors";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import Timeline from "@/components/Timeline";
import Prizes from "@/components/Prizes";
import BackToTop from "@/components/BackToTop";
import Resources from "@/components/Resources";
import EventInfo from "@/components/EventInfo";
import {
  BreadcrumbStructuredData,
  EventStructuredData,
  FAQStructuredData,
} from "@/components/StructuredData";
import { eventConfig } from "@/lib/event";
import s from "@/components/Editorial.module.css";

export default function GoldenHourPage() {
  return (
    <>
      <EventStructuredData />
      <FAQStructuredData />
      <BreadcrumbStructuredData
        items={[
          { name: "GoldenHour Delhi", path: "/" },
          { name: "GoldenHour V1", path: "/goldenhour" },
        ]}
      />
      <main id="main-content" className={`${s.shell} event-page-root`}>
        <Hero />
        <section id="about" className={s.section}>
          <div className={s.wrap}>
            <div className={s.intro}>
              <div>
                <p className={s.eyebrow}>The idea is simple.</p>
                <h2 className={s.heading}>
                  COME CURIOUS.
                  <br />
                  LEAVE A BUILDER.
                </h2>
              </div>
              <div className={s.introCopy}>
                <p className={s.body}>
                  {eventConfig.description} Pick {eventConfig.tracks.join(", ")}
                  , and turn an idea into a real submission.
                </p>
                <p className={`${s.body} ${s.muted}`}>
                  A student-led space to experiment, collaborate and show what
                  you can do. Beginners are welcome. The theme is revealed at
                  the event; your project starts here.
                </p>
              </div>
            </div>
            <dl className={s.eventFacts}>
              {[
                ["Entry", eventConfig.entry],
                ["Eligibility", "Ages 13–19 on event day"],
                ["Team size", eventConfig.teamSize],
                ["Location", eventConfig.venue],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        <Events />
        <Timeline />
        <Countdown />
        <Rules />
        <Team event />
        <Prizes />
        <Sponsors />
        <Resources />
        <EventInfo />
        <FAQ />
        <FinalCTA />
        <p className="sr-only">
          Event date: {eventConfig.date} in {eventConfig.location}. Registration
          is open. Participants must be at least 13 and under 20 on event day.
        </p>
      </main>
      <Footer />
      <MobileCTA />
      <BackToTop />
    </>
  );
}
