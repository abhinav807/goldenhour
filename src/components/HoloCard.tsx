"use client";

import { type PointerEvent, type ReactNode } from "react";
import styles from "./HoloCard.module.css";

// Retains the semantic-HTML API of our React Bits-inspired HoloCard.
// CSS foil replaces the shader: no GPU contexts or idle animation loops.
export default function HoloCard({
  children,
  className = "",
  preset = "gold",
}: {
  children: ReactNode;
  className?: string;
  preset?: "bursts" | "shards" | "gold";
}) {
  const reset = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.removeProperty("--tilt-x");
    event.currentTarget.style.removeProperty("--tilt-y");
    event.currentTarget.style.removeProperty("--foil-x");
    event.currentTarget.style.removeProperty("--foil-y");
  };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    event.currentTarget.style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(x - 0.5) * 5}deg`);
    event.currentTarget.style.setProperty("--foil-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--foil-y", `${y * 100}%`);
  };
  return (
    <div
      className={`${styles.card} ${className}`}
      data-foil={preset}
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <div className={styles.rotor}>
        <div className={styles.content}>{children}</div>
        <span className={styles.foil} aria-hidden="true" />
      </div>
    </div>
  );
}
