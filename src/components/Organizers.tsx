"use client";

const organizers = [
  {
    name: "Abhinav Goyal",
    role: "ORGANIZER",
    num: "01",
    initials: "AG",
  },
  {
    name: "Divya",
    role: "ORGANIZER",
    num: "02",
    initials: "DV",
  },
];

export default function Organizers() {
  return (
    <section className="bg-offwhite py-24 md:py-36 px-5 md:px-12 relative overflow-hidden dot-pattern">
      <div className="max-w-[900px] mx-auto relative z-10">
        {/* Header — centered */}
        <div className="text-center mb-14 reveal">
          <div className="inline-block font-space text-[10px] font-bold bg-black text-offwhite px-3 py-1 mb-4 uppercase">
            THE TEAM
          </div>
          <h2 className="font-archivo text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-black">
            ORGANIZERS<span className="text-sunset">.</span>
          </h2>
        </div>

        {/* Cards — centered grid */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-[600px] mx-auto">
          {organizers.map((org, i) => (
            <div
              key={org.num}
              className={`reveal ${i === 0 ? "delay-1" : "delay-2"}`}
            >
              <div className="brutal-card p-8 text-center bg-offwhite">
                {/* Avatar */}
                <div className="w-20 h-20 mx-auto mb-5 border-2 border-black bg-sunset flex items-center justify-center shadow-[3px_3px_0_#050505]">
                  <span className="font-archivo text-2xl text-black">{org.initials}</span>
                </div>

                {/* Number */}
                <div className="font-space text-[10px] text-sunset font-bold mb-2 uppercase">
                  {org.role} — {org.num}
                </div>

                {/* Name */}
                <h3 className="font-archivo text-xl md:text-2xl text-black">
                  {org.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
