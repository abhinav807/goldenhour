import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import { eventConfig } from "@/lib/event";
import { pageMetadata } from "../metadata";

export const metadata = pageMetadata("Parent/Guardian Consent Slip — GoldenHour V1", "Printable parent or legal guardian consent slip required at check-in for GoldenHour participants under 18.", "/guardian-consent");

export default function GuardianConsentPage() {
  return <main className="min-h-screen bg-offwhite px-5 md:px-12 py-20 md:py-28"><article className="max-w-[800px] mx-auto">
    <div className="print:hidden flex justify-between items-center gap-4"><Link href="/goldenhour" className="font-space text-xs text-sunset hover:text-black">← BACK TO GOLDENHOUR V1</Link><PrintButton /></div>
    <p className="font-space text-[10px] text-black/50 mt-10 mb-4">FOR PARTICIPANTS UNDER 18 / BRING THE SIGNED ORIGINAL TO CHECK-IN</p>
    <h1 className="font-archivo text-5xl sm:text-6xl md:text-7xl">PARENT / GUARDIAN<br /><span className="text-sunset">CONSENT SLIP.</span></h1>
    <p className="font-dm text-base md:text-lg leading-relaxed mt-8">GoldenHour V1 is planned for {eventConfig.date} in {eventConfig.location}. The date is tentative and the venue is to be announced. A parent or legal guardian must complete and sign this slip for a registered participant who will be under 18 on event day.</p>
    <section className="border-2 border-black p-6 md:p-8 mt-8 print:mt-5">
      <h2 className="font-archivo text-2xl mb-6">PARTICIPANT DETAILS</h2>
      <div className="space-y-8 font-dm text-base"><p>Participant&apos;s full name: <span className="inline-block w-2/3 border-b border-black align-bottom h-7" /></p><p>Team name (if known): <span className="inline-block w-2/3 border-b border-black align-bottom h-7" /></p><p>Participant&apos;s age on event day: <span className="inline-block w-1/3 border-b border-black align-bottom h-7" /></p></div>
    </section>
    <section className="border-2 border-black p-6 md:p-8 mt-6">
      <h2 className="font-archivo text-2xl mb-6">PARENT / LEGAL GUARDIAN</h2>
      <div className="space-y-8 font-dm text-base"><p>Full name: <span className="inline-block w-3/4 border-b border-black align-bottom h-7" /></p><p>Relationship to participant: <span className="inline-block w-2/3 border-b border-black align-bottom h-7" /></p><p>Contact number for event-day coordination: <span className="inline-block w-2/3 border-b border-black align-bottom h-7" /></p></div>
    </section>
    <section className="mt-8 space-y-4 font-dm text-base md:text-lg leading-relaxed"><h2 className="font-archivo text-2xl text-black">CONSENT &amp; ACKNOWLEDGMENT</h2><p>I am the parent or legal guardian of the participant named above. I give permission for them to register for and attend GoldenHour V1, subject to the event Code of Conduct and event rules.</p><p>I understand that the participant must be at least 13 and under 20 on 14 November 2026, and that organizers may view an accepted age-verification document at check-in. Organizers will not copy or store the document.</p><p>I understand that the participant is responsible for arranging their own travel with my oversight; overnight accommodation is not provided. As the participant is under 18, I will arrange their journey home after the event. These logistics are provisional until the venue is confirmed.</p><p>I confirm that the information above is accurate and that I may be contacted about this consent.</p></section>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12 font-dm text-base"><p>Parent / guardian signature:<br /><span className="block border-b border-black h-12 mt-3" /></p><p>Date signed:<br /><span className="block border-b border-black h-12 mt-3" /></p></div>
    <p className="font-space text-[10px] text-black/55 mt-10 border-t border-black/20 pt-4">Please bring the completed, signed slip to event check-in. Questions or data requests: <a className="underline" href={`mailto:${eventConfig.contactEmail}`}>{eventConfig.contactEmail}</a>. This slip records event participation consent; it is not a medical authorization or a liability waiver.</p>
  </article></main>;
}
