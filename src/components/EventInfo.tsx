import { eventConfig } from "@/lib/event";
import s from "./Editorial.module.css";
import d from "./EventDetails.module.css";
const criteria = [
  "Functionality",
  "Technical implementation",
  "UX / Design",
  "Innovation / Creativity",
];
const requirements = [
  "Public GitHub repository",
  "README explaining the project and disclosing AI tools used",
  "Working deployed or demo link",
  "Clear project name and team details",
];
export default function EventInfo() {
  return (
    <>
      <section id="judging" className={s.section}>
        <div className={`${s.wrap} ${d.infoGrid}`}>
          <div>
            <p className={s.eyebrow}>What the judges look for</p>
            <h2 className={s.heading} style={{ marginTop: 24 }}>
              MAKE IT WORK.
              <br />
              MAKE IT YOURS.
            </h2>
            <p className={s.body} style={{ marginTop: 24 }}>
              Projects are reviewed across four areas. Exact judging weights
              will be announced.
            </p>
          </div>
          <div className={d.criteria}>
            {criteria.map((name, i) => (
              <article key={name} className={d.criterion}>
                <span className={s.eyebrow}>0{i + 1} /</span>
                <h3>{name}</h3>
                <p className={s.eyebrow}>Weight / To be announced</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="submission" className={s.section}>
        <div className={s.wrap}>
          <div className={d.infoGrid}>
            <article className={d.infoCard}>
              <p className={s.eyebrow}>Ready for review</p>
              <h2>
                THE SUBMISSION
                <br />
                CHECKLIST.
              </h2>
              <ul>
                {requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                <strong>17:00 IST is the hard cutoff.</strong>
                <br />
                Check every link before submitting. Late submissions cannot be
                accepted.
              </p>
            </article>
            <article id="venue" className={d.infoCard}>
              <p className={s.eyebrow}>Delhi NCR / Details to follow</p>
              <h2>
                A PLACE TO
                <br />
                MAKE THINGS.
              </h2>
              <p>
                The venue is not yet confirmed. We’ll publish the exact address,
                nearest metro, Wi-Fi, power and accessibility details when
                available.
              </p>
              <div className={d.venueFacts}>
                {[
                  "Address",
                  "Nearest metro",
                  "Wi-Fi & power",
                  "Accessibility",
                ].map((item) => (
                  <div key={item}>
                    {item}
                    <br />
                    <strong>To be announced</strong>
                  </div>
                ))}
              </div>
            </article>
          </div>
          <div id="help" className={d.help}>
            <strong className={s.eyebrow}>Need a hand? Ask the team.</strong>
            <div>
              <a
                className={s.textLink}
                href={eventConfig.whatsappCommunityUrl}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp ↗
              </a>
              <a
                className={s.textLink}
                href={`mailto:${eventConfig.contactEmail}`}
              >
                Email ↗
              </a>
              <a
                className={s.textLink}
                href={eventConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                Instagram ↗
              </a>
              <a
                className={s.textLink}
                href={eventConfig.linkedinUrl}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
