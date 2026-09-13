"use client";
import { useEffect, useRef, useCallback } from "react";

export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  const update = useCallback(() => {
    if (dotRef.current) {
      dotRef.current.style.left = `${pos.current.x - 14}px`;
      dotRef.current.style.top = `${pos.current.y - 14}px`;
      dotRef.current.style.opacity = "1";
    }
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(update);
    };
    const leave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };
    const enter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      cancelAnimationFrame(raf.current);
    };
  }, [update]);

  return (
    <div
      ref={dotRef}
      className="crosshair-cursor"
      style={{ opacity: 0 }}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <line x1="14" y1="0" x2="14" y2="10" stroke="#FF5A00" strokeWidth="2" />
        <line x1="14" y1="18" x2="14" y2="28" stroke="#FF5A00" strokeWidth="2" />
        <line x1="0" y1="14" x2="10" y2="14" stroke="#FF5A00" strokeWidth="2" />
        <line x1="18" y1="14" x2="28" y2="14" stroke="#FF5A00" strokeWidth="2" />
        <circle cx="14" cy="14" r="2" fill="#FF5A00" />
      </svg>
    </div>
  );
}
