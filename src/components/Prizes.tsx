import { eventConfig, eventRewards } from "@/lib/event";
import s from "./Editorial.module.css";
import d from "./EventDetails.module.css";

export default function Prizes() {
  return (
    <section id="prizes" className={`${s.section} ${s.standard}`}>
      <div className={s.wrap}>
        <header className={s.sectionHead}>
          <div>
            <p className={`${s.eyebrow} ${s.accent}`}>
              Recognition / Not just bragging rights
            </p>
            <h2 className={s.heading}>
              GOOD WORK
              <br />
              GETS NOTICED.
            </h2>
          </div>
          <p className={s.body}>
            Team trophies. Individual rewards.
            <br />
            Clear terms for every benefit.
          </p>
        </header>
        <div className={d.rewardGrid}>
          {eventRewards.placements.map((item) => (
            <article key={item.place} className={d.ticket}>
              <span className={d.place}>{item.place}</span>
              <h3>{item.title.toUpperCase()}</h3>
              <p>One GoldenHour trophy per team.</p>
              <strong>{item.membership.toUpperCase()} VIP</strong>
              <p>
                CodeCrafters membership
                <br />
                per participant.
              </p>
              <p className={d.fine}>GOLDENHOUR V1 / RECOGNITION</p>
            </article>
          ))}
        </div>
        <div className={d.benefits}>
          <article className={d.benefit}>
            <p className={`${s.eyebrow} ${s.accent}`}>Winners / Per person</p>
            <h3>KEEP BUILDING.</h3>
            <p>{eventRewards.winner}</p>
            <a
              href="https://fueler.io/premium"
              target="_blank"
              rel="noreferrer"
              className={s.textLink}
            >
              Explore Fueler Premium ↗
            </a>
          </article>
          <article className={d.benefit}>
            <p className={`${s.eyebrow} ${s.accent}`}>
              Runners-up / Per person
            </p>
            <h3>YOUR NEXT OPPORTUNITY.</h3>
            <p>{eventRewards.runnerUp}</p>
          </article>
        </div>
        <p className={d.terms}>{eventRewards.awardConditions}</p>
        <div className={d.rewardGroup}>
          <h3>FOR THE BUILDERS.</h3>
          <div className={d.benefits}>
            <article className={d.benefit}>
              <span className={d.status}>PARTICIPANT BENEFITS</span>
              <h3>A MARK OF YOUR DAY.</h3>
              <p>{eventRewards.participants}</p>
            </article>
            <article className={d.benefit}>
              <span className={d.status}>LIMITED ALLOCATION</span>
              <h3>{eventRewards.n8nCount} N8N LICENSES.</h3>
              <p>{eventRewards.n8n}</p>
            </article>
          </div>
        </div>
        <div className={d.rewardGroup}>
          <span className={d.status}>
            PROVISIONAL / AWAITING FINAL CONFIRMATION
          </span>
          <div className={d.benefits}>
            <article className={d.benefit}>
              <h3>FUELER DIGITAL BUNDLE</h3>
              <p>{eventRewards.fuelerProvisional}</p>
            </article>
            <article className={d.benefit}>
              <h3>INTERVIEWBUDDY DISCOUNT</h3>
              <p>{eventRewards.interviewProvisional}</p>
            </article>
          </div>
        </div>
        <p className={d.terms}>
          Prize sponsor:{" "}
          <a
            className="underline"
            href={eventConfig.codeCraftersUrl}
            target="_blank"
            rel="noreferrer"
          >
            CodeCrafters
          </a>{" "}
          · Gift sponsor: {eventConfig.giftSponsor}
        </p>
      </div>
    </section>
  );
}
