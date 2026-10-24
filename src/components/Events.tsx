import { ArrowUpRight, Code2, Gamepad2, Palette } from "lucide-react";
import { eventConfig } from "@/lib/event";
import SpotlightCard from "./SpotlightCard";
import s from "./Editorial.module.css";

const tracks = [
  {
    num: "01",
    label: "TRACK ONE",
    title: eventConfig.tracks[0].toUpperCase(),
    description:
      "Design and ship a web experience from the first wireframe to the first real user. Frontend, backend, product, systems — choose your surface and make it work.",
    builds: [
      "Interactive web apps",
      "Creative web experiences",
      "Responsive tools",
      "Community platforms",
    ],
    stack: ["React / Next.js", "Canvas / WebGL", "Modern CSS", "Realtime DBs"],
    icon: <Code2 size={42} />,
    meta: "BUILD / SHIP / ITERATE",
    tone: "bg-offwhite",
  },
  {
    num: "02",
    label: "TRACK TWO",
    title: eventConfig.tracks[1].toUpperCase(),
    description:
      "Build a playable world with a mechanic worth remembering. Make the loop feel good, make the rules interesting, and get someone else to play it.",
    builds: [
      "Playable 2D / 3D games",
      "Physics sandboxes",
      "Narrative experiences",
      "Arcade mini-games",
    ],
    stack: [
      "Godot / Unity",
      "Phaser / Kaboom.js",
      "Three.js",
      "Custom engines",
    ],
    icon: <Gamepad2 size={42} />,
    meta: "PLAY / TEST / REPEAT",
    tone: "bg-black text-offwhite",
  },
  {
    num: "03",
    label: "TRACK THREE",
    title: eventConfig.tracks[2].toUpperCase(),
    description:
      "Turn a creative brief into a memorable visual concept through typography, layout, identity and visual storytelling.",
    builds: [
      "Brand identities",
      "Posters and campaigns",
      "Digital illustrations",
      "Visual design systems",
    ],
    stack: ["Figma", "Canva", "Illustrator / Inkscape", "Other design tools"],
    icon: <Palette size={42} />,
    meta: "DESIGN / REFINE / PRESENT",
    tone: "bg-yellow",
  },
];

export default function Events() {
  return (
    <section id="events" className={s.section}>
      <div className={s.wrap}>
        <header className={s.sectionHead}>
          <div>
            <p className={s.eyebrow}>Three ways in / One shared finish line</p>
            <h2 className={s.heading}>
              PICK YOUR
              <br />
              PLAYGROUND.
            </h2>
          </div>
          <p className={s.body}>
            Code it. Play it. Design it.
            <br />
            Choose the way you want to make your mark.
          </p>
        </header>
        <div className={s.tracks}>
          {tracks.map((track, index) => (
            <SpotlightCard key={track.num}>
              <article
                className={`${s.track} ${index === 1 ? s.trackDark : index === 2 ? s.trackYellow : ""}`}
              >
                <div className={s.trackGraphic}>
                  <span>{track.num}</span>
                  {track.icon}
                </div>
                <h3>{track.title}</h3>
                <p>{track.description}</p>
                <span className={s.eyebrow}>What you can build</span>
                <ul>
                  {track.builds.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className={s.trackTools}>{track.stack.join(" / ")}</div>
                <a href="#register" className={s.textLink}>
                  Choose {eventConfig.tracks[index]} <ArrowUpRight size={18} />
                </a>
              </article>
            </SpotlightCard>
          ))}
        </div>
        <div className={s.themeNote}>
          <strong className={s.eyebrow}>The brief stays a surprise.</strong>
          <p>The theme will be revealed at the event.</p>
        </div>
      </div>
    </section>
  );
}
