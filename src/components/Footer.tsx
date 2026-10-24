import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { eventConfig } from "@/lib/event";
import s from "./Editorial.module.css";

export default function Footer() {
  return (
    <footer id="contact" className={s.footer}>
      <div className={s.wrap}>
        <div className={s.footerTop}>
          <div>
            <p className={s.eyebrow}>Good things start with a conversation.</p>
            <h2 className={s.heading}>
              LET’S BUILD
              <br />
              TOGETHER.
            </h2>
          </div>
          <div>
            <a
              href={`mailto:${eventConfig.contactEmail}`}
              className={s.textLink}
            >
              {eventConfig.contactEmail} <ArrowUpRight size={18} />
            </a>
            <p className={`${s.eyebrow} ${s.muted}`}>
              Ideas / Partnerships / A simple hello
            </p>
          </div>
        </div>
        <div className={s.footerLinks}>
          <p className={s.body}>
            An independent student collective. Building the next thing,
            together.
            <br />
            <span className={s.eyebrow}>Delhi NCR, India</span>
          </p>
          <nav aria-label="Explore GoldenHour">
            <span className={s.eyebrow}>Explore</span>
            <Link href="/">GoldenHour Delhi</Link>
            <Link href="/goldenhour">GoldenHour V1</Link>
            <Link href="/goldenhour#events">Tracks</Link>
            <Link href="/goldenhour#timeline">Schedule</Link>
            <Link href="/goldenhour#rules">Rules</Link>
            <Link href="/goldenhour#prizes">Prizes</Link>
            <Link href="/goldenhour#faq">FAQ</Link>
            <Link href="/about">Press &amp; media kit</Link>
          </nav>
          <nav aria-label="Community links">
            <span className={s.eyebrow}>Get involved</span>
            <a
              href={eventConfig.registrationUrl}
              target="_blank"
              rel="noreferrer"
            >
              Registration ↗
            </a>
            <a href={eventConfig.volunteerUrl} target="_blank" rel="noreferrer">
              Volunteer ↗
            </a>
            <a
              href={eventConfig.whatsappCommunityUrl}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp ↗
            </a>
            <a href={eventConfig.instagramUrl} target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
            <a href={eventConfig.linkedinUrl} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </nav>
          <nav aria-label="Policies">
            <span className={s.eyebrow}>The essentials</span>
            <Link href="/code-of-conduct">Code of conduct</Link>
            <Link href="/guardian-consent">Guardian consent</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>
        <p className={s.footerWord} aria-hidden="true">
          GOLDENHOUR<span className={s.accent}>.</span>
        </p>
        <div className={`${s.footerBottom} ${s.eyebrow}`}>
          <span>© 2026 GoldenHour Delhi</span>
          <a href="#main-content" className={s.textLink}>
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
