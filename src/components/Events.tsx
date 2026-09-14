"use client";
import { Gamepad2, Code2, Compass } from "lucide-react";

const events = [
  {
    num: "01",
    label: "THE MAIN EVENT",
    title: "WEB DEVELOPMENT",
    description:
      "Build web apps, tools, and experiences. From frontend to full-stack — ship something real in 8 hours.",
    icon: <Code2 size={32} />,
    cardBg: "bg-offwhite",
    labelBg: "bg-sunset",
    iconColor: "text-sunset/30",
    rotation: "-rotate-1",
  },
  {
    num: "02",
    label: "CREATIVE CODE",
    title: "GAME DEVELOPMENT",
    description:
      "Design and prototype games. Pixel art, 3D, puzzle, narrative — any engine, any genre. Build a playable build.",
    icon: <Gamepad2 size={32} />,
    cardBg: "bg-black",
    labelBg: "bg-offwhite",
    labelColor: "text-black",
    titleColor: "text-offwhite",
    descColor: "text-offwhite/70",
    iconColor: "text-offwhite/20",
    rotation: "rotate-[0.5deg]",
  },
  {
    num: "03",
    label: "EXPERIMENTAL",
    title: "SIDE QUEST",
    description:
      "Small challenges. Weird ideas. Unexpected builds. No rules. Just make something cool and show up.",
    icon: <Compass size={32} />,
    cardBg: "bg-offwhite",
    labelBg: "bg-yellow",
    iconColor: "text-yellow/30",
    rotation: "-rotate-[0.5deg]",
  },
];

export default function Events() {
  return (
    <section id="events" className="bg-offwhite py-24 md:py-36 px-5 md:px-12 relative overflow-hidden grid-pattern">
      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Header — centered */}
        <div className="text-center mb-14 border-b-2 border-black pb-8 reveal">
          <div className="inline-block font-space text-[10px] font-bold bg-black text-offwhite px-3 py-1 mb-4 uppercase">
            02 / TRACKS
          </div>
          <h2 className="font-archivo text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-black">
            WHAT&apos;S
            <br />
            HAPPENING<span className="text-sunset">?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {events.map((ev, i) => (
            <div
              key={ev.num}
              className={`reveal ${i === 0 ? "delay-1" : i === 1 ? "delay-2" : "delay-3"}`}
            >
              <div
                className={`brutal-card p-7 md:p-8 min-h-[400px] flex flex-col justify-between relative overflow-hidden ${ev.rotation} ${ev.cardBg}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 md:w-14 md:h-14 border-2 border-black bg-black text-offwhite flex items-center justify-center text-xl md:text-2xl font-archivo shrink-0">
                      {ev.num}
                    </div>
                    <div className={ev.iconColor}>
                      {ev.icon}
                    </div>
                  </div>

                  <div className={`font-space text-[10px] font-bold ${ev.labelBg} ${ev.labelColor || "text-black"} px-2 py-0.5 uppercase inline-block mb-3 border border-black`}>
                    {ev.label}
                  </div>

                  <h3 className={`font-archivo text-3xl md:text-4xl mb-4 ${ev.titleColor || "text-black"}`}>
                    {ev.title}
                  </h3>

                  <p className={`font-space text-xs leading-relaxed ${ev.descColor || "text-black/70"} font-medium`}>
                    {ev.description}
                  </p>
                </div>

                <div className={`absolute bottom-4 right-4 w-14 h-14 rounded-full border opacity-10 rotate-12 ${ev.titleColor ? "border-offwhite" : "border-black"}`} />

                <a href="#register" className="brutal-btn w-full py-3.5 text-xs mt-6 justify-center">
                  ENTER →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
