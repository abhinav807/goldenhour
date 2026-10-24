import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { eventConfig } from "@/lib/event";
import Sunrise from "@/components/Sunrise";
import Team from "@/components/Team";
import Footer from "@/components/Footer";
import SpotlightCard from "@/components/SpotlightCard";
import s from "@/components/Editorial.module.css";

const principles = [
  {
    word: "BUILD.\nIMPROVE.\nREPEAT.",
    label: "Continuous innovation",
    text: "An unfinished idea is a starting point. Try it, test it, and make the next version better.",
  },
  {
    word: "LESS THEORY.\nMORE MAKING.",
    label: "Hands-on engineering",
    text: "Learn by turning a blank canvas into something that works.",
  },
  {
    word: "YOUR FIRST\nBUILD COUNTS.",
    label: "Radical inclusion",
    text: "Beginners and experienced builders share the same starting line.",
  },
  {
    word: "GOOD THINGS ARE BUILT TOGETHER.",
    label: "Community first",
    text: "Find your people. Share what you know. Make room for someone else's idea.",
  },
];

export default function Home() {
  return (
    <>
      <main id="main-content" className={s.shell}>
        <section id="top" className={s.cover}>
          <div className={s.wrap}>
            <div className={`${s.coverTop} ${s.eyebrow}`}>
              <span>Independent build culture / Delhi NCR</span>
              <span>Made by students. For students.</span>
            </div>
            <div className={s.coverGrid}>
              <div className={s.coverCopy}>
                <h1 className={s.coverTitle}>
                  <span>BUILD</span>
                  <span>BEFORE</span>
                  <span className={s.accent}>SUNRISE.</span>
                </h1>
                <p>
                  We are GoldenHour Delhi. A student-led community for big
                  ideas, first attempts, and things you can actually build.
                </p>
                <div className={s.coverActions}>
                  <Link href="/goldenhour" className={s.button}>
                    Explore GoldenHour V1 <ArrowUpRight size={18} />
                  </Link>
                  <a href="#about" className={s.textLink}>
                    Meet the movement <ArrowDown size={16} />
                  </a>
                </div>
              </div>
              <Sunrise />
            </div>
            <div className={`${s.coverFoot} ${s.eyebrow}`}>
              <span>From a blank page to something real.</span>
              <span>Build. Improve. Repeat. ↘</span>
            </div>
          </div>
        </section>
        <div className={s.factStrip}>
          <div className={s.wrap}>
            <strong>NEXT UP: GOLDENHOUR V1</strong>
            <span className={s.eyebrow}>
              {eventConfig.date} / {eventConfig.duration} / {eventConfig.entry}{" "}
              entry
            </span>
            <Link href="/goldenhour" className={s.textLink}>
              Find your track <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <section id="about" className={s.section}>
          <div className={`${s.wrap} ${s.intro}`}>
            <div>
              <p className={s.eyebrow}>01 / A movement in the making</p>
              <h2 className={s.heading}>
                BIG IDEAS.
                <br />
                SMALL STARTS.
                <br />
                REAL THINGS.
              </h2>
            </div>
            <div className={s.introCopy}>
              <p className={s.body}>
                GoldenHour Delhi creates platforms for students to learn, build,
                collaborate, and showcase their ideas.
              </p>
              <p className={`${s.body} ${s.muted}`}>
                Our ambition goes beyond one event: hackathons, technical
                masterclasses, innovation sprints, ideathons, acceleration
                opportunities and project showcases. GoldenHour V1 is the next
                place to start.
              </p>
              <div className={s.note}>
                <strong className={s.eyebrow}>
                  Your curiosity is enough to begin.
                </strong>
                <p>
                  GoldenHour V1 is free for ages 13–19 on event day. Solo
                  builders and teams of up to three are welcome.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="events" className={`${s.section} ${s.posterSection}`}>
          <div className={s.wrap}>
            <header className={s.sectionHead}>
              <div>
                <p className={s.eyebrow}>02 / The next gathering</p>
                <h2 className={s.heading}>
                  ONE DAY.
                  <br />
                  MAKE IT COUNT.
                </h2>
              </div>
              <p className={s.body}>
                A blank canvas. Three tracks.
                <br />
                Something real by the end of the day.
              </p>
            </header>
            <article className={s.poster}>
              <div className={s.posterMain}>
                <p className={s.eyebrow}>
                  The first edition / Student build day
                </p>
                <h3>
                  GOLDENHOUR
                  <br />
                  V1<span className={s.accent}>.</span>
                </h3>
                <p className={s.body}>{eventConfig.description}</p>
                <div className={s.posterTracks}>
                  {eventConfig.tracks.map((track) => (
                    <span key={track}>{track}</span>
                  ))}
                </div>
              </div>
              <div className={s.posterAside}>
                <dl>
                  <div>
                    <dt>Date / confirmed</dt>
                    <dd>{eventConfig.date}</dd>
                  </div>
                  <div>
                    <dt>Time</dt>
                    <dd>08:00–20:00 IST</dd>
                  </div>
                  <div>
                    <dt>Location</dt>
                    <dd>
                      Delhi NCR
                      <br />
                      <span className={s.muted}>{eventConfig.venue}</span>
                    </dd>
                  </div>
                  <div>
                    <dt>Entry / registration</dt>
                    <dd>
                      {eventConfig.entry} /{" "}
                      {eventConfig.registrationOpen ? "Open" : "Closed"}
                    </dd>
                  </div>
                </dl>
                <Link href="/goldenhour" className={s.button}>
                  Explore the event <ArrowUpRight size={18} />
                </Link>
              </div>
            </article>
          </div>
        </section>
        <Team />
        <section id="standard" className={`${s.section} ${s.standard}`}>
          <div className={s.wrap}>
            <header className={s.sectionHead}>
              <div>
                <p className={`${s.eyebrow} ${s.accent}`}>
                  04 / The GoldenHour standard
                </p>
                <h2 className={s.heading}>
                  HOW WE
                  <br />
                  SHOW UP.
                </h2>
              </div>
              <p className={s.body}>
                Four principles. Every project.
                <br />
                Every person in the room.
              </p>
            </header>
            <div className={s.principles}>
              {principles.map((item, index) => (
                <SpotlightCard
                  key={item.label}
                  className={s.principle}
                  spotlightColor={index === 0 ? "#ffd400" : "#ff5a00"}
                >
                  <span className={s.eyebrow}>{item.label}</span>
                  {index === 0 && (
                    <span className={s.principleMark} aria-hidden="true">
                      ↗
                    </span>
                  )}
                  <div>
                    <h3>
                      {item.word.split("\n").map((line, i) => (
                        <span key={line}>
                          {i > 0 && <br />}
                          {line}
                        </span>
                      ))}
                    </h3>
                    <p>{item.text}</p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
