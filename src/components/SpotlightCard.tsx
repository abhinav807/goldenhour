"use client";

// Adapted from React Bits SpotlightCard-TS-TW (retrieved 2026-10-24).
// https://reactbits.dev/r/SpotlightCard-TS-TW — see THIRD_PARTY_NOTICES.md.
// Retains the registry's softened radial falloff and DOM-ref paint approach.
// Removes ambient RAF, proximity listeners, grain, flares and theme machinery.
import { useRef, type ReactNode, type PointerEvent } from "react";
import styles from "./SpotlightCard.module.css";

const falloff = (color: string) => {
  const stops = [];
  for (let i = 0; i <= 14; i++) {
    const g = i / 14;
    const smooth = 1 - g * g * (3 - 2 * g);
    const glow = Math.exp(-4.6 * g * g) * (1 - g ** 6);
    stops.push(
      `color-mix(in srgb, ${color} ${((smooth + (glow - smooth) * 0.7) * 100).toFixed(2)}%, transparent) ${(g * 100).toFixed(2)}%`,
    );
  }
  return stops.join(", ");
};

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "#ff5a00",
}: {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const light = useRef<HTMLSpanElement>(null);
  const stops = falloff(spotlightColor);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (
      !light.current ||
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    light.current.style.background = `radial-gradient(circle 280px at ${event.clientX - rect.left}px ${event.clientY - rect.top}px, ${stops})`;
  };
  return (
    <div className={`${styles.card} ${className}`} onPointerMove={move}>
      <span ref={light} className={styles.light} aria-hidden="true" />
      {children}
    </div>
  );
}
