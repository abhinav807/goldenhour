"use client";

export default function About() {
  return (
    <section id="about" className="bg-offwhite py-28 md:py-40 px-5 md:px-12 relative overflow-hidden dot-pattern">
      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b-2 border-black pb-8 reveal active">
          <div>
            <div className="inline-block font-space text-[10px] font-bold bg-sunset text-black px-3 py-1 mb-3 uppercase shadow-[2px_2px_0_#050505]">
              01 / ABOUT
            </div>
            <h2 className="font-archivo text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-black">
              THIS IS YOUR
              <br />
              GOLDEN HOUR<span className="text-sunset">.</span>
            </h2>
          </div>
          <p className="font-space text-xs md:text-sm max-w-sm font-bold text-black/60">
            A student-led space for people who build, experiment, compete and make things that probably shouldn&apos;t exist yet.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left: Manifesto */}
          <div className="lg:col-span-7 space-y-6 reveal-left delay-1 active">
            <blockquote className="font-archivo text-2xl sm:text-3xl md:text-4xl text-black leading-snug">
              &ldquo;We don&apos;t wait for perfect conditions. We build in the dark, break things in the light, and ship before sunrise.&rdquo;
            </blockquote>

            <p className="font-dm text-base md:text-lg text-black/70 leading-relaxed">
              GOLDENHOUR is not a company. It&apos;s not an organization. It&apos;s a gathering point — for students who
              want to build, compete, and create things that push boundaries. Every event is a dare: show up, ship something, surprise yourself.
            </p>

            <div className="flex items-center gap-4 py-2">
              <div className="w-16 h-1.5 bg-sunset" />
              <span className="font-space text-[10px] font-bold uppercase tracking-widest text-black/50">
                DELHI / INDIA / 2026
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="brutal-card p-5 text-center">
                <p className="font-archivo text-3xl md:text-4xl text-sunset">500+</p>
                <p className="font-space text-[10px] font-bold uppercase mt-1">students</p>
              </div>
              <div className="brutal-card p-5 text-center">
                <p className="font-archivo text-3xl md:text-4xl text-black">48h</p>
                <p className="font-space text-[10px] font-bold uppercase mt-1">build sprint</p>
              </div>
              <div className="brutal-card-orange p-5 text-center">
                <p className="font-archivo text-3xl md:text-4xl text-black">100%</p>
                <p className="font-space text-[10px] font-bold uppercase mt-1">student-run</p>
              </div>
            </div>
          </div>

          {/* Right: Info card */}
          <div className="lg:col-span-5 reveal-right delay-2 active">
            <div className="brutal-card p-8 md:p-10 bg-offwhite relative">
              {/* Stamp */}
              <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full border-2 border-black bg-sunset flex flex-col items-center justify-center shadow-[4px_4px_0_#050505]" style={{ transform: "rotate(12deg)" }}>
                <span className="font-space text-[9px] font-bold text-black uppercase">STUDENT</span>
                <span className="font-archivo text-xs text-black">POWERED</span>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="font-space text-[10px] text-black/40 uppercase font-bold mb-1">WHO</p>
                  <p className="font-space text-xs font-bold text-black uppercase">STUDENTS / BUILDERS / DESIGNERS / MAKERS</p>
                </div>
                <div className="border-t border-black/10 pt-4">
                  <p className="font-space text-[10px] text-black/40 uppercase font-bold mb-1">WHERE</p>
                  <p className="font-space text-xs font-bold text-sunset uppercase">DELHI / INDIA</p>
                </div>
                <div className="border-t border-black/10 pt-4">
                  <p className="font-space text-[10px] text-black/40 uppercase font-bold mb-1">WHEN</p>
                  <p className="font-space text-xs font-bold text-black uppercase">2026</p>
                </div>
                <div className="border-t border-black/10 pt-4">
                  <p className="font-space text-[10px] text-black/40 uppercase font-bold mb-1">WHY</p>
                  <p className="font-space text-xs font-bold text-sunset uppercase">BECAUSE WAITING IS BORING.</p>
                </div>
              </div>
            </div>

            {/* Accent box */}
            <div className="brutal-card-black p-6 mt-6">
              <h4 className="font-archivo text-lg text-offwhite mb-2">NEVER MISS A BUILD.</h4>
              <p className="font-space text-xs text-offwhite/60 leading-relaxed mb-4">
                Get plugged into every event, sprint, and opportunity.
              </p>
              <a href="#register" className="brutal-btn-orange w-full py-3 text-xs justify-center">
                JOIN GOLDENHOUR →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
