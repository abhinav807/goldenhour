import { eventConfig } from "@/lib/event";
import s from "./Editorial.module.css";

type Phase = {
  start: string;
  end: string;
  title: string;
  description: string;
  objectives?: string[];
  tip?: string;
  review?: boolean;
  submission?: boolean;
};

const phases: Phase[] = [
  {
    start: "08:00",
    end: "09:00",
    title: "REGISTRATION & CHECK-IN",
    description:
      "Participant check-in, age verification, badge collection, venue orientation and workstation setup.",
    objectives: [
      "Complete check-in and verification",
      "Confirm team details",
      "Settle in and prepare your workstation",
    ],
    tip: "Bring an acceptable age-verification document. Organizers view it only; they do not copy or store it.",
  },
  {
    start: "09:00",
    end: "09:20",
    title: "WELCOME & EVENT BRIEFING",
    description:
      "Welcome address, GoldenHour V1 overview, event rules, judging criteria and submission requirements.",
    review: true,
  },
  {
    start: "09:20",
    end: "09:40",
    title: "GUEST SPEAKER SESSION",
    description: "A focused guest speaker session before the build begins.",
    review: true,
  },
  {
    start: "09:40",
    end: "10:00",
    title: "TEAM SETUP & HACKATHON BRIEFING",
    description:
      "Teams finalize their ideas and receive the complete project and event briefing before building begins.",
    review: true,
  },
  {
    start: "10:00",
    end: "13:30",
    title: "BUILD SPRINT 1",
    description:
      "The first major build session. Teams design, build and test their projects with the organizing team available for logistical support.",
    objectives: [
      "Define a small, shippable first version",
      "Set up the core project structure",
      "Build the most important user flow",
    ],
    tip: "Ship the smallest useful version before adding extra features.",
  },
  {
    start: "13:30",
    end: "14:00",
    title: "LUNCH BREAK",
    description:
      "A scheduled break to recharge before the afternoon build sprint.",
    objectives: [
      "Save your work before stepping away",
      "Take a proper break",
      "Return ready for the second sprint",
    ],
  },
  {
    start: "14:00",
    end: "16:30",
    title: "BUILD SPRINT 2",
    description:
      "Teams continue building, integrate features, test their projects and prepare the final submission.",
    objectives: [
      "Finish the core experience",
      "Test the demo path from start to finish",
      "Ask for help before the final window",
    ],
    tip: "Protect time for testing; a reliable demo beats an unfinished wishlist.",
  },
  {
    start: "16:30",
    end: "17:00",
    title: "FINAL TESTING & SUBMISSION — HARD CUTOFF AT 5 PM",
    description:
      "Complete final testing and submit all required project materials. The submission deadline is 5:00 PM IST sharp; late submissions cannot be accepted.",
    objectives: [
      "Submit the public project repository",
      "Include a README with any AI-tool disclosures",
      "Provide a working demo link",
      "Check all links before 5:00 PM IST",
    ],
    tip: "Submit as early as possible. The submission form closes at 5:00 PM IST.",
    submission: true,
  },
  {
    start: "17:00",
    end: "18:30",
    title: "JUDGING & PROJECT EVALUATION",
    description:
      "The judging panel evaluates eligible submissions against the published event criteria.",
    review: true,
  },
  {
    start: "18:30",
    end: "19:00",
    title: "RESULTS & PRIZE DISTRIBUTION",
    description:
      "Results are announced and winning teams receive their team trophy and participant prizes.",
    objectives: [
      "Be present for the announcement",
      "Celebrate all teams",
      "Listen for organizer updates",
    ],
  },
  {
    start: "19:00",
    end: "20:00",
    title: "CLOSING & COMMUNITY",
    description:
      "Closing remarks, photographs and final networking before the 12-hour Build Day concludes.",
    review: true,
  },
];

const overview = [
  ["08:00", "ARRIVE"],
  ["09:00", "BRIEFING"],
  ["10:00", "BUILD"],
  ["17:00", "SUBMIT"],
  ["17:00", "JUDGING"],
  ["18:30", "RESULTS"],
];

export default function Timeline() {
  return (
    <section id="timeline" className={`${s.section} ${s.timeline}`}>
      <div className={s.wrap}>
        <header className={s.sectionHead}>
          <div>
            <p className={`${s.eyebrow} ${s.accent}`}>
              The plan / {eventConfig.date}
            </p>
            <h2 className={s.heading}>
              FROM HELLO
              <br />
              TO “I MADE THIS.”
            </h2>
          </div>
          <p className={s.body}>
            08:00–20:00 IST. {eventConfig.duration} together, including{" "}
            {eventConfig.activeBuildHours.toLowerCase()} of building. Submit by
            17:00 sharp.
          </p>
        </header>
        <ol className={s.stages}>
          {overview.map(([time, title], i) => (
            <li key={title} className={s.stage}>
              <span className={s.eyebrow}>0{i + 1} /</span>
              <strong>{title}</strong>
              <time>{time} IST</time>
            </li>
          ))}
        </ol>
        <details className={s.schedule}>
          <summary>
            Explore the complete schedule / {phases.length} stages
          </summary>
          <div>
            {phases.map((phase) => (
              <article key={phase.start} className={s.phase}>
                <time>
                  {phase.start}–{phase.end} IST
                </time>
                <div>
                  <h3>{phase.title}</h3>
                  <p>{phase.description}</p>
                  {phase.objectives && (
                    <ul>
                      {phase.objectives.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {phase.tip && (
                    <p className={phase.submission ? s.deadline : ""}>
                      <strong>Note: </strong>
                      {phase.tip}
                    </p>
                  )}
                  {phase.review && (
                    <p>Detailed arrangements to be confirmed by organizers.</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </details>
        <p className={s.eyebrow} style={{ marginTop: 24 }}>
          Scheduled times / Indian Standard Time / Venue to be announced
        </p>
      </div>
    </section>
  );
}
