import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { eventConfig } from "@/lib/event";
import s from "./Editorial.module.css";
import d from "./EventDetails.module.css";

const policy = [
  ["Eligibility", eventConfig.ageLimit + "."],
  ["Team size", `Teams of ${eventConfig.teamSize}. Solo builders are welcome.`],
  [
    "Under 18",
    "Parent/guardian consent is required. Bring a signed slip to check-in.",
  ],
  [
    "Original work",
    "Start your project at the event. Open-source libraries, templates and your own reusable boilerplate are allowed.",
  ],
  [
    "AI tools",
    "You may use AI tools. Disclose them in your project README and credit your tools.",
  ],
  [
    "Submission",
    "Submit the repository, README and working demo by 5:00 PM IST sharp. Test your demo before submitting.",
  ],
  [
    "Fair judging",
    "First, second and third place depend on eligible team numbers and the judges’ evaluation. Positions may remain unawarded. Placements and prizes are not guaranteed.",
  ],
  [
    "Conduct & safety",
    "Respect the room, the people and the work. Follow the Code of Conduct, venue rules and organizer instructions.",
  ],
];
export default function Rules() {
  return (
    <section id="rules" className={s.section}>
      <div className={`${s.wrap} ${d.rules}`}>
        <div className={d.rulesIntro}>
          <p className={s.eyebrow}>The ground rules</p>
          <h2 className={s.heading}>
            BUILD BOLDLY.
            <br />
            BUILD FAIRLY.
          </h2>
          <p className={s.body}>
            Make something. Start small. Credit your tools. Respect the room.
            And enjoy the process.
          </p>
        </div>
        <div>
          {policy.map(([title, copy]) => (
            <article key={title} className={d.rule}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
          <div className={d.ruleFoot}>
            <Link href="/code-of-conduct" className={s.textLink}>
              Read code of conduct <ArrowUpRight size={16} />
            </Link>
            <Link href={eventConfig.guardianConsentUrl} className={s.textLink}>
              Get guardian consent slip <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
