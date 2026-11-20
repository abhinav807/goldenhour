import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { eventConfig } from "@/lib/event";

export default function GoldenHourPage() {
  return (
    <main id="main-content" className="min-h-screen bg-black text-offwhite gh-grain-night px-5 py-20 md:px-10 grid place-items-center">
      <section className="w-full max-w-3xl border-2 border-sunset p-7 sm:p-12 md:p-16 text-center shadow-[8px_8px_0_#ff5a00]" aria-labelledby="postponement-title">
        <p className="font-space text-xs font-bold uppercase tracking-[.18em] text-sunset mb-8">GoldenHour V1 / Event update</p>
        <h1 id="postponement-title" className="font-archivo text-[clamp(2rem,7vw,4.5rem)] leading-tight uppercase">Postponed<br /><span className="text-sunset">to 2027.</span></h1>
        <p className="font-dm text-lg text-offwhite/75 leading-relaxed mt-8">{eventConfig.postponementNotice}</p>
        <p className="font-dm text-base text-offwhite/55 leading-relaxed mt-4">The full event page is currently unavailable. Join the WhatsApp community for updates.</p>
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <a href={eventConfig.whatsappCommunityUrl} target="_blank" rel="noopener noreferrer" className="brutal-btn-orange px-6 py-4">GET UPDATES <ArrowUpRight size={18} aria-hidden="true" /></a>
          <Link href="/" className="brutal-btn-outline border-offwhite text-offwhite bg-black px-6 py-4"><ArrowLeft size={18} aria-hidden="true" /> BACK TO HOME</Link>
        </div>
      </section>
    </main>
  );
}
