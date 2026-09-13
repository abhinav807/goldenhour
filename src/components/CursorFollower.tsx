"use client";
import { useEffect, useState } from "react";

export default function CursorFollower() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [visible]);

  return (
    <div
      className="crosshair-cursor hidden md:block"
      style={{
        left: pos.x - 12,
        top: pos.y - 12,
        opacity: visible ? 1 : 0,
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <line x1="12" y1="0" x2="12" y2="8" stroke="#FF5A00" strokeWidth="2" />
        <line x1="12" y1="16" x2="12" y2="24" stroke="#FF5A00" strokeWidth="2" />
        <line x1="0" y1="12" x2="8" y2="12" stroke="#FF5A00" strokeWidth="2" />
        <line x1="16" y1="12" x2="24" y2="12" stroke="#FF5A00" strokeWidth="2" />
      </svg>
    </div>
  );
}
