import { ArrowUpRight } from "lucide-react";
import { eventConfig } from "@/lib/event";
import s from "./Editorial.module.css";

export default function FinalCTA() {
  return (
    <section id="register" className={`${s.section} ${s.final}`}>
      <div className={s.wrap}>
        <p className={s.eyebrow}>GoldenHour V1 / Your next first step</p>
        <div className={s.finalGrid}>
          <div>
            <h2>
              LESS “ONE DAY.”
              <br />
              MORE DAY ONE.
            </h2>
            <p className={s.body}>
              Bring your curiosity. Leave with something you made.
            </p>
            <a
              href={eventConfig.registrationUrl}
              target="_blank"
              rel="noreferrer"
              className={s.button}
            >
              Register for free <ArrowUpRight size={20} />
            </a>
          </div>
          <div>
            <p className={s.body}>
              {eventConfig.date}
              <br />
              08:00–20:00 IST · Delhi NCR
              <br />
              {eventConfig.venue}
            </p>
            <div className={s.note}>
              <p>
                One team leader submits one form for 1–3 participants. Ages
                13–19 on event day.
              </p>
              <p>
                Under 18? Bring a signed{" "}
                <a
                  href={eventConfig.guardianConsentUrl}
                  className="underline underline-offset-4"
                >
                  parent/guardian consent slip
                </a>{" "}
                to check-in.
              </p>
            </div>
            <a
              href={eventConfig.volunteerUrl}
              target="_blank"
              rel="noreferrer"
              className={s.textLink}
              style={{ marginTop: 24 }}
            >
              Prefer to volunteer? Join the crew <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
