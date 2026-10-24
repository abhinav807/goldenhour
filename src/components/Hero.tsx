import { ArrowDown, ArrowUpRight } from "lucide-react";
import { eventConfig } from "@/lib/event";
import Sunrise from "./Sunrise";
import s from "./Editorial.module.css";

export default function Hero() {
  return (
    <section id="hero" className={s.cover}>
      <div className={s.wrap}>
        <div className={`${s.coverTop} ${s.eyebrow}`}>
          <span>The first edition / Delhi NCR</span>
          <span>
            Registration {eventConfig.registrationOpen ? "open" : "closed"}
          </span>
        </div>
        <div className={s.coverGrid}>
          <div className={s.coverCopy}>
            <p className={s.eyebrow}>
              Free entry / {eventConfig.duration} of making
            </p>
            <h1 className={`${s.coverTitle} ${s.eventTitle}`}>
              <span>GOLDEN</span>
              <span>
                HOUR <small>V1.</small>
              </span>
            </h1>
            <p>
              Pick your track. Find your people. Build something worth showing.
              A day for students who would rather make the next thing than wait
              for it.
            </p>
            <p className={s.eyebrow}>
              <time dateTime={eventConfig.isoDate}>
                {eventConfig.date} / 08:00–20:00 IST
              </time>
            </p>
            <div className={s.coverActions}>
              <a
                href={eventConfig.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={s.button}
              >
                Register for free <ArrowUpRight size={18} />
              </a>
              <a href="#events" className={s.textLink}>
                Explore the tracks <ArrowDown size={16} />
              </a>
            </div>
            <p className={s.eyebrow} style={{ marginTop: 20, marginBottom: 0 }}>
              Ages 13–19 on event day /{" "}
              <span style={{ whiteSpace: "nowrap" }}>Teams of 1–3</span>
            </p>
          </div>
          <Sunrise />
        </div>
        <div className={`${s.coverFoot} ${s.eyebrow}`}>
          <span>Three tracks / One build day</span>
          <span>Delhi NCR / Venue to be announced</span>
        </div>
      </div>
    </section>
  );
}
