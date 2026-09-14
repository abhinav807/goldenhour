import { ArrowUpRight } from "lucide-react";

const volunteerUrl = "https://forms.gle/R8cuBKNLj1ftXKfJ8";

export default function MobileCTA() { return <div className="fixed bottom-0 left-0 right-0 z-40 p-3 md:hidden bg-black/95 border-t-2 border-sunset"><a href={volunteerUrl} target="_blank" rel="noreferrer" className="brutal-btn-orange w-full py-3.5 text-xs">VOLUNTEER WITH US <ArrowUpRight size={15} /></a></div>; }
