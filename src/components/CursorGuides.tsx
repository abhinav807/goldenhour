"use client";
import { useEffect, useRef } from "react";

/** Lightweight crosshair guide lines confined to the hero, inspired by technical drawing interfaces. */
export default function CursorGuides() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const hero = document.getElementById("hero");
    const guide = ref.current;
    if (!hero || !guide) return;
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = hero.getBoundingClientRect();
      guide.style.setProperty("--guide-x", `${event.clientX - rect.left}px`);
      guide.style.setProperty("--guide-y", `${event.clientY - rect.top}px`);
      guide.dataset.active = "true";
    };
    const leave = () => { guide.dataset.active = "false"; };
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", leave);
    return () => {
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
    };
  }, []);
  return <div ref={ref} className="gh-cursor-guides" data-active="false" aria-hidden="true"><span className="gh-guide-v"/><span className="gh-guide-h"/><span className="gh-guide-target"/></div>;
}
