"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Check, Copy, Eye, EyeOff } from "lucide-react";
import { resources, type ResourceCategory } from "@/lib/resources";

const filters: Array<"ALL" | ResourceCategory> = ["ALL", "WEB DEVELOPMENT", "GAME DEVELOPMENT", "TEMPLATES & DOCS"];

export default function Resources() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("ALL");
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const visible = useMemo(() => filter === "ALL" ? resources : resources.filter((resource) => resource.track === filter), [filter]);
  const displayed = showAll ? visible : visible.slice(0, 3);

  const changeFilter = (nextFilter: (typeof filters)[number]) => {
    setFilter(nextFilter);
    setShowAll(false);
  };

  const copyCommand = async (resource: (typeof resources)[number]) => {
    try {
      await navigator.clipboard.writeText(resource.command);
      setCopied(resource.id);
      window.setTimeout(() => setCopied((current) => current === resource.id ? null : current), 1600);
    } catch {
      setCopied(null);
    }
  };

  return <section id="resources" className="bg-black text-offwhite py-28 md:py-40 px-5 md:px-10 relative overflow-hidden"><div className="max-w-[1240px] mx-auto relative z-10"><header className="text-center max-w-3xl mx-auto mb-12 reveal"><div className="inline-block font-space text-[10px] font-bold bg-sunset text-black px-3 py-1 mb-6 uppercase">05 / RESOURCES</div><h2 className="font-archivo text-5xl sm:text-6xl md:text-8xl">TOOLS FOR<br /><span className="text-sunset">YOUR SPRINT.</span></h2><p className="font-space text-xs md:text-sm text-offwhite/55 max-w-lg mx-auto mt-6 leading-relaxed">Use the tools that help you build. All open-source frameworks, engines and templates are allowed unless the official rules say otherwise.</p></header><div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Filter resources">{filters.map((item) => <button key={item} role="tab" aria-selected={filter === item} onClick={() => changeFilter(item)} className={`font-space text-[10px] font-bold tracking-[.08em] uppercase border-2 px-3 py-2 transition-colors ${filter === item ? "bg-sunset text-black border-sunset" : "bg-black text-offwhite border-offwhite/40 hover:border-sunset hover:text-sunset"}`}>{item}</button>)}</div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{displayed.map((resource) => <article key={resource.id} className="brutal-card-black border-offwhite/30 p-6 flex flex-col min-h-[330px] text-center"><div className="flex items-start justify-between gap-3"><span className="font-space text-[9px] text-sunset tracking-[.14em] uppercase font-bold">{resource.category}</span><span className="font-space text-[9px] text-offwhite/45 uppercase">{resource.track.replace(" DEVELOPMENT", "")}</span></div><h3 className="font-archivo text-2xl md:text-3xl text-offwhite mt-8">{resource.title}</h3><p className="font-dm text-sm text-offwhite/60 leading-relaxed mt-4">{resource.description}</p><div className="mt-auto pt-6"><code className="block text-left bg-black border border-offwhite/20 p-3 text-[10px] leading-relaxed text-sunset break-words">{resource.command}</code><div className="flex flex-wrap justify-center gap-2 mt-4"><button onClick={() => copyCommand(resource)} className="brutal-btn-outline border-sunset text-sunset px-3 py-2 text-[10px]" aria-label={`${copied === resource.id ? "Copied" : "Copy"} ${resource.title} starter command`}>{copied === resource.id ? <><Check size={13} /> COPIED</> : <><Copy size={13} /> COPY</>}</button><a href={resource.url} target={resource.url.startsWith("#") ? undefined : "_blank"} rel={resource.url.startsWith("#") ? undefined : "noreferrer"} className="brutal-btn-orange px-3 py-2 text-[10px]">DOCS <ArrowUpRight size={13} /></a></div></div></article>)}</div>{visible.length > 3 && <div className="flex justify-center mt-8"><button onClick={() => setShowAll((current) => !current)} aria-expanded={showAll} className="brutal-btn-orange px-6 py-4 text-xs">{showAll ? <><EyeOff size={16} /> SHOW LESS</> : <><Eye size={16} /> SHOW ALL ({visible.length})</>}</button></div>}<div className="mt-10 border-2 border-sunset bg-sunset text-black p-6 text-center"><p className="font-space text-xs font-bold uppercase tracking-[.14em]">RULES OF USE</p><p className="font-dm text-sm mt-2 max-w-2xl mx-auto">AI tools and open-source libraries are allowed only if this matches the official rules. If you are unsure, check with the organizers before using them.</p></div></div></section>;
}
