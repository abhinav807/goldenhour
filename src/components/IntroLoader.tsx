"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function IntroLoader() {
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setLeaving(true), 1200);
    const removeTimer = window.setTimeout(() => setVisible(false), 1750);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`intro-loader ${leaving ? "is-leaving" : ""}`} aria-hidden="true">
      <div className="text-center intro-loader-mark">
        <Image src="/brand/goldenhour-symbol.png" alt="" width={500} height={500} priority className="mx-auto w-28 h-28 md:w-36 md:h-36 object-contain" />
        <div className="font-archivo text-6xl md:text-8xl tracking-tighter mt-5">GH<span className="text-sunset">.</span></div>
        <p className="font-space text-[10px] text-offwhite/55 tracking-[.2em] mt-6">LOADING THE HOUR...</p>
      </div>
    </div>
  );
}
