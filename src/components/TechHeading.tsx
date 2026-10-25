"use client";

import { useEffect, useRef } from "react";
import TechText from "./TechText";
import s from "./TechHeading.module.css";

type HeadingLine = string | { text: string; className?: string };
type Props = {
  as?: "h1" | "h2";
  lines: HeadingLine[];
  className?: string;
  id?: string;
  inline?: boolean;
};

export default function TechHeading({ as: Heading = "h2", lines, className = "", id, inline = false }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textKey = lines.map((line) => typeof line === "string" ? line : line.text).join("\n");

  useEffect(() => {
    const heading = headingRef.current;
    const context = document.createElement("canvas").getContext("2d");
    if (!heading || !context) return;
    let alive = true;
    const measure = () => {
      if (!alive) return;
      const style = getComputedStyle(heading);
      const size = parseFloat(style.fontSize);
      context.font = `${style.fontWeight} ${size}px ${style.fontFamily}`;
      if ("letterSpacing" in context) context.letterSpacing = style.letterSpacing;
      const rows = Array.from(heading.querySelectorAll<HTMLElement>("[data-tech-line]"));
      const widths = rows.map((row) => {
        const metrics = context.measureText(row.dataset.techLine || "");
        return Math.max(metrics.width, metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight, 1);
      });
      const available = heading.clientWidth;
      const combinedWidth = widths.reduce((total, width) => total + width, 0);
      rows.forEach((row, i) => {
        const fit = Math.min(1, available / (inline ? combinedWidth : widths[i]));
        row.style.setProperty("--tech-line-size", `${size * fit}px`);
        row.style.setProperty("--tech-letter-spacing", `${(parseFloat(style.letterSpacing) || 0) / size}em`);
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(heading);
    window.addEventListener("resize", measure, { passive: true });
    document.fonts?.addEventListener("loadingdone", measure);
    document.fonts?.ready.then(measure);
    measure();
    return () => { alive = false; observer.disconnect(); window.removeEventListener("resize", measure); document.fonts?.removeEventListener("loadingdone", measure); };
  }, [textKey, inline]);

  return <Heading ref={headingRef} id={id} className={`${s.heading} ${inline ? s.inline : ""} ${className}`}>
    {lines.map((line, index) => {
      const { text, className: lineClass = "" } = typeof line === "string" ? { text: line } : line;
      return <span key={`${index}-${text}`} data-tech-line={text} className={`${s.line} ${lineClass}`}>
        <span className={s.fallback}>{text}</span>
        <TechText as="span" text={text} headingFit decorative className={s.canvas} fontWeight={400} letterSpacing={-0.045} reveal="letter" intro="none" sweep={false} draggable={false} clickKick labels={false} guides={false} specks={6} />
        {!inline && index < lines.length - 1 && <span className="sr-only"> </span>}
      </span>;
    })}
  </Heading>;
}
