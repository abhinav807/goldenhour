"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) { useEffect(() => { console.error(error); }, [error]); return <main className="min-h-screen bg-black text-offwhite grid place-items-center px-5"><div className="max-w-xl"><p className="font-space text-xs text-sunset tracking-[.18em] mb-6">SYSTEM ERROR / RECOVERABLE</p><h1 className="font-archivo text-6xl md:text-8xl leading-[.8]">THE HOUR<br /><span className="text-sunset">STALLED.</span></h1><p className="font-dm text-lg text-offwhite/65 mt-8">Something broke before the page could finish loading. Try again or head back to the start.</p><div className="flex gap-3 mt-8"><button onClick={reset} className="brutal-btn-orange">TRY AGAIN</button><Link href="/" className="brutal-btn-outline border-offwhite/40 text-offwhite hover:border-black">GO HOME</Link></div></div></main>; }
