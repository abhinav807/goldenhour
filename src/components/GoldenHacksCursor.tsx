"use client";

import { useEffect } from "react";

export default function GoldenHacksCursor() {
  useEffect(() => {
    const root = document.documentElement;
    const onMove = (event: PointerEvent) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div className="goldenhacks-cursor" aria-hidden="true"><span className="goldenhacks-cursor-dot" /><span className="goldenhacks-cursor-ring" /></div>;
}
