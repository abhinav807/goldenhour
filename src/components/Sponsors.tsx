import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { eventConfig } from "@/lib/event";
import s from "./Editorial.module.css";
import d from "./EventDetails.module.css";

type Sponsor = {
  name: string;
  role: string;
  href?: string;
  logo: string;
  alt: string;
  width: number;
  height: number;
  visit?: string;
  note?: string;
  dark?: boolean;
};

const sponsors: Sponsor[] = [
  {
    name: "CODECRAFTERS",
    role: "PRIZE SPONSOR",
    href: eventConfig.codeCraftersUrl,
    logo: "/brand/codecrafters-logo.svg",
    alt: "CodeCrafters logo",
    width: 220,
    height: 155,
    visit: "VISIT CODECRAFTERS",
  },
  {
    name: "INTERVIEW BUDDY",
    role: "SPONSOR",
    href: "https://interviewbuddy.net",
    logo: "/brand/interviewbuddy-logo.png",
    alt: "Interview Buddy logo",
    width: 965,
    height: 340,
    visit: "VISIT INTERVIEW BUDDY",
  },
  {
    name: "OSEN",
    role: "ACADEMIC SPONSOR",
    href: eventConfig.osenUrl,
    logo: "/brand/osen-logo.png",
    alt: "OSEN logo",
    width: 356,
    height: 134,
    visit: "OSEN / ACADEMIC SPONSOR",
    dark: true,
  },
  {
    name: eventConfig.refreshmentPartner,
    role: "REFRESHMENT PARTNER",
    logo: "/brand/sewan-foods.png",
    alt: "SEWAN FOODS logo — Food for Impact",
    width: 1137,
    height: 660,
    note: "FOOD FOR IMPACT",
  },
  {
    name: eventConfig.giftSponsor,
    role: "GIFT SPONSOR",
    logo: "/brand/n8n-logo.png",
    alt: "n8n logo",
    width: 296,
    height: 80,
    note: "80 ONE-MONTH CLOUD PRO LICENSES",
    dark: true,
  },
];

function Content({ sponsor }: { sponsor: Sponsor }) {
  return (
    <>
      <p className={s.eyebrow}>{sponsor.role}</p>
      <div className={d.sponsorImage}>
        <Image
          src={sponsor.logo}
          alt={sponsor.alt}
          width={sponsor.width}
          height={sponsor.height}
          unoptimized
        />
      </div>
      <div>
        <h3>{sponsor.name}</h3>
        <small>{sponsor.href ? "Visit partner ↗" : sponsor.note}</small>
      </div>
    </>
  );
}
export default function Sponsors() {
  return (
    <section id="sponsors" className={s.section}>
      <div className={s.wrap}>
        <header className={s.sectionHead}>
          <div>
            <p className={s.eyebrow}>In good company</p>
            <h2 className={s.heading}>
              BACKING THE
              <br />
              NEXT BUILD.
            </h2>
          </div>
          <p className={s.body}>
            The partners supporting GoldenHour V1, and the students making it
            happen.
          </p>
        </header>
        <div className={d.sponsorGrid}>
          {sponsors.map((sponsor) =>
            sponsor.href ? (
              <a
                key={sponsor.name}
                href={sponsor.href}
                target="_blank"
                rel="noreferrer"
                className={`${d.sponsor} ${sponsor.dark ? d.darkSponsor : ""}`}
              >
                <Content sponsor={sponsor} />
              </a>
            ) : (
              <article
                key={sponsor.name}
                className={`${d.sponsor} ${sponsor.dark ? d.darkSponsor : ""}`}
              >
                <Content sponsor={sponsor} />
              </article>
            ),
          )}
          <article className={d.sponsorPitch}>
            <p className={s.eyebrow}>Partner with GoldenHour</p>
            <h3>
              MAKE ROOM
              <br />
              FOR NEW IDEAS.
            </h3>
            <p>
              Support student builders or sponsor a future edition. Start a
              conversation with the organizing team.
            </p>
            <a
              href={`mailto:${eventConfig.contactEmail}?subject=GOLDENHOUR%20sponsorship`}
              className={s.textLink}
            >
              Become a partner <ArrowUpRight size={16} />
            </a>
            <a
              href={eventConfig.volunteerUrl}
              target="_blank"
              rel="noreferrer"
              className={s.textLink}
            >
              Volunteer with us ↗
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
