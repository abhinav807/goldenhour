import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function MobileCTA() { return <div className="fixed bottom-0 left-0 right-0 z-40 p-3 md:hidden bg-black/95 border-t-2 border-sunset"><Link href="#register" className="brutal-btn-orange w-full py-3.5 text-xs">ENTER GOLDENHOUR <ArrowUpRight size={15} /></Link></div>; }
