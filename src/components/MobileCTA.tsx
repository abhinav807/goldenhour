import { ArrowUpRight } from "lucide-react";
import { eventConfig } from "@/lib/event";

export default function MobileCTA() {
  return <div className="mobile-cta fixed bottom-0 left-0 right-0 z-40 px-3 pt-2.5 pb-[calc(.625rem+env(safe-area-inset-bottom))] md:hidden bg-black/95 border-t-2 border-sunset">
    <div className="max-w-[720px] mx-auto grid grid-cols-2 gap-2">
      <a href={eventConfig.registrationUrl} target="_blank" rel="noreferrer" className="brutal-btn-orange w-full py-3 px-2 text-[10px] text-center" aria-label="Open the GoldenHour participant registration form in a new tab">REGISTER NOW <ArrowUpRight size={13} aria-hidden="true" /></a>
      <a href={eventConfig.whatsappCommunityUrl} target="_blank" rel="noreferrer" className="brutal-btn-outline border-sunset text-sunset w-full py-3 px-2 text-[10px]">JOIN COMMUNITY <ArrowUpRight size={13} aria-hidden="true" /></a>
    </div>
  </div>;
}
