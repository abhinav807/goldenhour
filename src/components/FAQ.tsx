"use client";

import { useState } from "react";
import { faqItems, eventConfig } from "@/lib/event";
import s from "./Editorial.module.css";

export default function FAQ() {
  const [query, setQuery] = useState("");
  const visible = faqItems.filter((item) =>
    `${item.q} ${item.a} ${item.detail}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  return (
    <section id="faq" className={s.section}>
      <noscript>
        <style>{`.${s.search}, label[for="faq-search"] { display: none; }`}</style>
      </noscript>
      <div className={`${s.wrap} ${s.faqLayout}`}>
        <div>
          <p className={s.eyebrow}>The practical things</p>
          <h2 className={s.heading}>
            GOOD
            <br />
            QUESTIONS.
          </h2>
          <label htmlFor="faq-search" className={s.eyebrow}>
            Find an answer
          </label>
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try teams, prizes or registration"
            className={s.search}
          />
          <p className={s.faqContact}>
            Still wondering?
            <br />
            <a
              className={s.textLink}
              href={`mailto:${eventConfig.contactEmail}`}
            >
              Ask the organizing team ↗
            </a>
          </p>
        </div>
        <div>
          <p className="sr-only" role="status">
            {visible.length} answers found
          </p>
          {visible.length ? (
            visible.map((faq) => (
              <details className={s.faqItem} key={faq.q}>
                <summary>{faq.q}</summary>
                <p>
                  {faq.a}
                  <br />
                  <br />
                  {faq.detail}
                </p>
              </details>
            ))
          ) : (
            <p className={s.body}>
              No answers match “{query}”. Try a different word or contact the
              organizing team.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
