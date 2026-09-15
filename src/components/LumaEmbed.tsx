"use client";

import { useState } from "react";
import { eventConfig } from "@/lib/event";

export default function LumaEmbed() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className="luma-embed-shell" aria-live="polite">
      {!loaded && !failed && <p className="luma-embed-status">LOADING REGISTRATION FORM...</p>}
      {failed && <p className="luma-embed-status">THE EMBED COULD NOT LOAD. USE THE BUTTON BELOW.</p>}
      <iframe
        src="https://luma.com/embed/event/evt-20KKCUlL3xfHLJJ/simple"
        title="GOLDENHOUR registration on Luma"
        className={`luma-embed ${loaded ? "is-loaded" : ""}`}
        frameBorder="0"
        allow="fullscreen"
        aria-hidden={false}
        tabIndex={0}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
      <a href={eventConfig.registrationUrl} target="_blank" rel="noreferrer" className="brutal-btn-orange luma-fallback">OPEN REGISTRATION PAGE <span aria-hidden="true">↗</span></a>
    </div>
  );
}
