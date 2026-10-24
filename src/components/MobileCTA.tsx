import { ArrowUpRight } from "lucide-react";
import { eventConfig } from "@/lib/event";
export default function MobileCTA() {
  return (
    <aside
      aria-label="Quick registration"
      className="mobile-cta fixed bottom-0 left-0 right-0 z-40 px-4 pt-3 pb-[calc(.75rem+env(safe-area-inset-bottom))] md:hidden bg-black border-t border-sunset"
    >
      <a
        href={eventConfig.registrationUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between bg-sunset text-black px-5 py-3 min-h-12 font-space text-xs font-bold"
      >
        REGISTER FOR FREE <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </aside>
  );
}
