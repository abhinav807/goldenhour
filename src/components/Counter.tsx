"use client";

import { useId, useLayoutEffect, useRef, type CSSProperties } from "react";
import "./Counter.css";

// Countdown-focused adaptation of the supplied React Bits Counter: wrapped
// numeral strips, spring motion, stagger, and vertical motion blur.
const mod = (value: number, base: number) => ((value % base) + base) % base;
const wrap = (offset: number) => mod(offset + 5, 10) - 5;
const numerals = Array.from({ length: 10 }, (_, digit) => digit);
type Direction = "auto" | "up" | "down" | "shortest";
type CounterProps = {
  value: number;
  minDigits?: number;
  direction?: Direction;
  duration?: number;
  bounce?: number;
  stagger?: number;
  motionBlur?: boolean;
  fade?: number;
  fontSize?: number | string;
  fontWeight?: CSSProperties["fontWeight"];
  className?: string;
};

function Digit({ value, direction, duration, bounce, delay, motionBlur }: {
  value: number; direction: Direction; duration: number;
  bounce: number; delay: number; motionBlur: boolean;
}) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const position = useRef({ value, target: value, velocity: 0 });
  const filterId = `counter-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const state = position.current;
    const from = mod(Math.round(state.target), 10);
    const up = mod(value - from, 10);
    const trend = direction === "auto" ? (value >= from ? "up" : "down") : direction;
    const step = trend === "up" ? up : trend === "down" ? (up === 0 ? 0 : up - 10) : (up > 5 ? up - 10 : up);
    state.target += step;
    const elements = root.querySelectorAll<HTMLElement>("[data-numeral]");
    const strip = root.querySelector<HTMLElement>("[data-strip]");
    const blur = root.querySelector("feGaussianBlur");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let previous = performance.now();
    let wait = delay;

    const paint = () => {
      elements.forEach((element, numeral) => {
        element.style.transform = `translateY(${wrap(numeral - state.value) * 100}%)`;
      });
      if (strip && blur) {
        const radius = motionBlur ? Math.min(0.09, Math.max(0, (Math.abs(state.velocity) - 3) * 0.006)) * parseFloat(getComputedStyle(root).fontSize) : 0;
        blur.setAttribute("stdDeviation", `0 ${radius.toFixed(2)}`);
        strip.style.filter = radius > 0.25 ? `url(#${filterId})` : "";
      }
    };
    const settle = () => {
      state.target = mod(Math.round(state.target), 10);
      state.value = state.target;
      state.velocity = 0;
      paint();
    };
    const frame = (now: number) => {
      const elapsed = Math.min(1 / 20, Math.max(0, (now - previous) / 1000));
      previous = now;
      if (reduced.matches) { settle(); return; }
      const used = Math.min(wait, elapsed);
      wait -= used;
      const left = elapsed - used;
      const steps = Math.ceil(left * 240);
      const dt = steps ? left / steps : 0;
      const omega = Math.PI * 2 / Math.max(0.05, duration);
      const damping = 1 - Math.min(0.9, Math.max(0, bounce));
      for (let i = 0; i < steps; i++) {
        state.velocity += (-omega * omega * (state.value - state.target) - 2 * damping * omega * state.velocity) * dt;
        state.value += state.velocity * dt;
      }
      if (wait <= 0 && Math.abs(state.value - state.target) < 0.002 && Math.abs(state.velocity) < 0.02) {
        settle();
        return;
      }
      paint();
      raf = requestAnimationFrame(frame);
    };
    const preference = () => {
      if (reduced.matches) { cancelAnimationFrame(raf); settle(); }
    };
    if (reduced.matches || state.value === state.target) settle();
    else { paint(); raf = requestAnimationFrame(frame); }
    reduced.addEventListener("change", preference);
    return () => { cancelAnimationFrame(raf); reduced.removeEventListener("change", preference); };
  }, [value, direction, duration, bounce, delay, motionBlur, filterId]);

  return <span ref={rootRef} className="counter__digit">
    <span className="counter__sizer">{value}</span>
    <span className="counter__window"><span className="counter__strip" data-strip="">
      {numerals.map(numeral => <span key={numeral} className="counter__numeral" data-numeral="" style={{ transform: `translateY(${wrap(numeral - value) * 100}%)` }}>{numeral}</span>)}
    </span></span>
    {motionBlur && <svg className="counter__blur" aria-hidden="true"><filter id={filterId} x="-10%" y="-50%" width="120%" height="200%" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="0 0" /></filter></svg>}
  </span>;
}

export default function Counter({ value, minDigits = 1, direction = "auto", duration = 0.7, bounce = 0.2, stagger = 0.04, motionBlur = true, fade = 0.3, fontSize = 100, fontWeight = "inherit", className = "" }: CounterProps) {
  const label = String(Math.max(0, Math.floor(Number.isFinite(value) ? value : 0))).padStart(Math.min(21, Math.max(1, minDigits)), "0");
  return <span className={`counter ${className}`} style={{ fontSize, fontWeight, "--counter-fade": `${Math.max(0, fade)}em` } as CSSProperties}>
    <span className="counter__sr">{label}</span>
    <span className="counter__row" aria-hidden="true">
      {[...label].map((digit, index) => <Digit key={label.length - index} value={Number(digit)} direction={direction} duration={duration} bounce={bounce} delay={(label.length - index - 1) * Math.max(0, stagger)} motionBlur={motionBlur} />)}
    </span>
  </span>;
}
