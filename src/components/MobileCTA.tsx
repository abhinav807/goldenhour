import { ArrowUpRight } from "lucide-react";
import { eventConfig } from "@/lib/event";

export default function MobileCTA() { return <div className="fixed bottom-0 left-0 right-0 z-40 p-2.5 md:hidden bg-black/95 border-t-2 border-sunset"><div className="grid grid-cols-2 gap-2"><a href={eventConfig.registrationUrl} target="_blank" rel="noreferrer" className="brutal-btn-orange w-full py-3 text-[10px]">REGISTER NOW <ArrowUpRight size={14} /></a><a href={eventConfig.whatsappCommunityUrl} target="_blank" rel="noreferrer" className="brutal-btn-outline border-sunset text-sunset w-full py-3 text-[10px]">JOIN COMMUNITY <ArrowUpRight size={14} /></a></div></div>; }
