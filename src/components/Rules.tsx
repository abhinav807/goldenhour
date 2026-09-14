"use client";

const rules = [
  { num: "01", text: "MAKE SOMETHING." },
  { num: "02", text: "DON'T WAIT FOR PERMISSION." },
  { num: "03", text: "BREAK IT." },
  { num: "04", text: "FIX IT." },
  { num: "05", text: "SHOW YOUR WORK." },
  { num: "06", text: "HAVE FUN." },
];

export default function Rules() {
  return (
    <section id="rules" className="bg-offwhite py-24 md:py-36 px-5 md:px-12 relative overflow-hidden">
      <div className="max-w-[900px] mx-auto relative z-10">
        {/* Header — centered */}
        <div className="text-center mb-14 reveal">
          <div className="inline-block font-space text-[10px] font-bold bg-sunset text-black px-3 py-1 mb-4 uppercase shadow-[2px_2px_0_#050505]">
            THE CODE
          </div>
          <h2 className="font-archivo text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-black">
            THE RULES<span className="text-sunset">.</span>
          </h2>
        </div>

        <div>
          {rules.map((rule, i) => (
            <div
              key={rule.num}
              className={`reveal ${i < 3 ? "delay-1" : "delay-2"}`}
            >
              <div className="group border-b-2 border-black py-5 md:py-7 flex items-center gap-5 md:gap-8 transition-all duration-150 hover:pl-4 hover:bg-sunset/5">
                <span className="font-space text-xs text-sunset font-bold shrink-0 w-6">
                  {rule.num}
                </span>
                <span className="font-archivo text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black group-hover:text-sunset transition-colors">
                  {rule.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
