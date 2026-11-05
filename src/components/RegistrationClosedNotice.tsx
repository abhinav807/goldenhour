"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { eventConfig } from "@/lib/event";

export default function RegistrationClosedNotice() {
  const [dismissed, setDismissed] = useState(false);
  if (eventConfig.registrationStatus !== "closed" || dismissed) return null;

  return (
    <aside
      role="status"
      aria-label="Registration update"
      className="fixed top-32 md:top-28 right-4 left-4 sm:left-auto sm:w-[360px] z-[60] border-2 border-sunset bg-black text-offwhite p-5 pr-16 shadow-[5px_5px_0_#ff5a00]"
    >
      <p className="font-space text-[10px] font-bold uppercase tracking-[.12em] text-sunset mb-2">Registration update</p>
      <p className="font-dm text-base leading-relaxed">Registrations closed for GoldenHour V1.</p>
      <button
        type="button"
        aria-label="Dismiss registration update"
        onClick={() => setDismissed(true)}
        className="absolute top-2 right-2 flex h-11 w-11 items-center justify-center text-offwhite hover:text-sunset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunset"
      >
        <X size={20} aria-hidden="true" />
      </button>
    </aside>
  );
}
