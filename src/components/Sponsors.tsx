"use client";

const partners = [
  "YOUR LOGO HERE",
  "PARTNER 01",
  "PARTNER 02",
  "PARTNER 03",
  "PARTNER 04",
  "PARTNER 05",
];

export default function Sponsors() {
  return (
    <section className="bg-black py-24 md:py-36 px-5 md:px-12 relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Header — centered */}
        <div className="text-center mb-14 border-b-2 border-offwhite/10 pb-8 reveal">
          <div className="inline-block font-space text-[10px] font-bold bg-yellow text-black px-3 py-1 mb-4 uppercase shadow-[2px_2px_0_#FFD400]">
            03 / PARTNERS
          </div>
          <h2 className="font-archivo text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-offwhite">
            BACKED BY PEOPLE
            <br />
            WHO BUILD<span className="text-sunset">.</span>
          </h2>
          <div className="mt-6">
            <a href="#register" className="brutal-btn-orange px-6 py-3 text-[11px]">
              BECOME A PARTNER →
            </a>
          </div>
        </div>

        {/* Raw sponsor grid — centered */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-[800px] mx-auto">
          {partners.map((p, i) => (
            <div
              key={i}
              className={`border-2 ${i === 0 ? "border-sunset bg-sunset/10" : "border-offwhite/15 bg-offwhite/5"} p-6 md:p-10 flex items-center justify-center min-h-[120px] md:min-h-[160px] transition-all duration-200 hover:border-sunset/50 hover:bg-sunset/5`}
            >
              <span className={`font-space text-[10px] md:text-xs ${i === 0 ? "text-sunset" : "text-offwhite/40"} uppercase font-bold tracking-wider text-center`}>
                {p}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center reveal">
          <p className="font-space text-[10px] text-offwhite/30 uppercase tracking-widest">
            INTERESTED IN PARTNERING? REACH OUT AT HELLO@GOLDENHOUR.DEV
          </p>
        </div>
      </div>
    </section>
  );
}
