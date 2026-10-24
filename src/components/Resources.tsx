"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { resources, type ResourceCategory } from "@/lib/resources";

import s from "./Editorial.module.css";
import d from "./EventDetails.module.css";

const filters: Array<"ALL" | ResourceCategory> = [
  "ALL",
  "WEB DEVELOPMENT",
  "GAME DEVELOPMENT",
  "TEMPLATES & DOCS",
];

export default function Resources() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("ALL");
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [copyError, setCopyError] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const visible = useMemo(
    () =>
      filter === "ALL"
        ? resources
        : resources.filter((resource) => resource.track === filter),
    [filter],
  );
  const displayed = showAll ? visible : visible.slice(0, 3);

  const changeFilter = (nextFilter: (typeof filters)[number]) => {
    setFilter(nextFilter);
    setShowAll(false);
  };

  const copyCommand = async (resource: (typeof resources)[number]) => {
    setCopyError(false);
    try {
      await navigator.clipboard.writeText(resource.command);
      setCopied(resource.id);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(
        () =>
          setCopied((current) => (current === resource.id ? null : current)),
        1600,
      );
    } catch {
      setCopied(null);
      setCopyError(true);
    }
  };

  return (
    <section id="resources" className={`${s.section} ${s.standard}`}>
      <div className={s.wrap}>
        <header className={s.sectionHead}>
          <div>
            <p className={`${s.eyebrow} ${s.accent}`}>The builder’s toolkit</p>
            <h2 className={s.heading}>
              A HEAD START.
              <br />
              NOT A SHORTCUT.
            </h2>
          </div>
          <p className={s.body}>
            Frameworks, engines and useful starting points. Pick what helps you
            make your idea real.
          </p>
        </header>
        <div className={d.filters} role="group" aria-label="Filter resources">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => changeFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p role="status" className={d.resourceStatus}>
          {copyError
            ? "Could not copy. Select the command and copy it manually."
            : copied
              ? "Command copied to clipboard."
              : `${visible.length} resources / ${filter.toLowerCase()}`}
        </p>
        <div className={d.resourceGrid} data-enhanced>
          {displayed.map((resource) => (
            <article key={resource.id} className={d.resource}>
              <span className={`${s.eyebrow} ${s.accent}`}>
                {resource.category}
              </span>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <code>{resource.command}</code>
              <div className={d.resourceActions}>
                <button
                  type="button"
                  onClick={() => copyCommand(resource)}
                  aria-label={`${copied === resource.id ? "Copied" : "Copy command for"} ${resource.title}`}
                >
                  {copied === resource.id ? (
                    <>
                      <Check size={16} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} /> Copy command
                    </>
                  )}
                </button>
                <a
                  href={resource.url}
                  target={resource.url.startsWith("#") ? undefined : "_blank"}
                  rel="noreferrer"
                  aria-label={`Docs for ${resource.title}`}
                >
                  Docs <ArrowUpRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
        {visible.length > 3 && (
          <div className={d.showMore}>
            <button
              type="button"
              aria-expanded={showAll}
              onClick={() => setShowAll((v) => !v)}
              className={s.button}
            >
              {showAll
                ? "Show fewer resources"
                : `Show all ${visible.length} resources`}
            </button>
          </div>
        )}
        <noscript>
          <style>{`.${d.filters}, .${d.resourceStatus}, .${d.showMore}, .${d.resourceGrid}[data-enhanced] { display: none; }`}</style>
          <div className={d.resourceGrid}>
            {resources.map((resource) => (
              <article key={resource.id} className={d.resource}>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <code>{resource.command}</code>
                <a href={resource.url} className={s.textLink}>
                  Documentation ↗
                </a>
              </article>
            ))}
          </div>
        </noscript>
        <p className={d.terms}>
          Open-source frameworks, engines and templates are allowed under the
          event rules. Disclose AI tools in your README. If you are unsure about
          a tool, ask the organizers.
        </p>
      </div>
    </section>
  );
}
