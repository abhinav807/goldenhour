"use client";

import { useId, type PointerEvent } from "react";
import s from "./Editorial.module.css";

/** One CSS/SVG signature. No canvas, animation loop, or React pointer state. */
export default function Sunrise() {
  const id = useId();
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--sun-x",
      `${((event.clientX - rect.left) / rect.width - 0.5) * 16}px`,
    );
    event.currentTarget.style.setProperty(
      "--sun-y",
      `${((event.clientY - rect.top) / rect.height - 0.5) * 16}px`,
    );
  };
  const reset = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.removeProperty("--sun-x");
    event.currentTarget.style.removeProperty("--sun-y");
  };
  return (
    <div
      className={s.sunArt}
      aria-hidden="true"
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <svg viewBox="0 0 560 560" fill="none">
        <defs>
          <clipPath id={id}>
            <circle cx="280" cy="270" r="176" />
          </clipPath>
        </defs>
        <circle
          cx="280"
          cy="270"
          r="228"
          stroke="#615b37"
          strokeDasharray="2 8"
        />
        <path d="M280 12v48M280 492v48M24 270h48M488 270h48" stroke="#ffd400" />
        <g clipPath={`url(#${id})`}>
          <circle cx="280" cy="270" r="176" fill="#ff5a00" />
          {[244, 264, 287, 314, 345, 380, 419].map((y, i) => (
            <rect
              key={y}
              x="90"
              y={y}
              width="380"
              height={3 + i * 3}
              fill="#050505"
            />
          ))}
        </g>
        <path
          d="M68 460h424M100 480h360M144 500h272"
          stroke="#ff5a00"
          strokeOpacity=".45"
        />
        <path d="m444 106 8 0m-4-4v8M104 416h8m-4-4v8" stroke="#f7f7f2" />
      </svg>
      <span className={s.sunLabel}>
        NEW DELHI / 28.61° N<br />
        IDEAS INTO DAYLIGHT.
      </span>
    </div>
  );
}
