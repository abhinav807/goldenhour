"use client";

import { useEffect, useState } from "react";
import { eventConfig } from "@/lib/event";
import s from "./Editorial.module.css";

const target = new Date(eventConfig.isoDate).getTime();
export default function Countdown() {
  const [seconds, setSeconds] = useState<number | null>(null);
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    const update = () => {
      const left = Math.max(0, Math.floor((target - Date.now()) / 1000));
      setSeconds(left);
      if (!left && interval) clearInterval(interval);
    };
    const resume = () => {
      if (interval) clearInterval(interval);
      if (!document.hidden) {
        update();
        interval = setInterval(update, 1000);
      }
    };
    const first = setTimeout(resume, 0);
    document.addEventListener("visibilitychange", resume);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
      document.removeEventListener("visibilitychange", resume);
    };
  }, []);
  const values =
    seconds === null
      ? [null, null, null, null]
      : [
          Math.floor(seconds / 86400),
          Math.floor(seconds / 3600) % 24,
          Math.floor(seconds / 60) % 60,
          seconds % 60,
        ];
  return (
    <section id="countdown" className={`${s.section} ${s.clock}`}>
      <div className={s.wrap}>
        <div className={s.clockHead}>
          <div>
            <p className={s.eyebrow}>The countdown / Indian Standard Time</p>
            <h2 className={s.heading}>
              {seconds === 0 ? "THE NEXT CHAPTER." : "YOUR TIME IS COMING."}
            </h2>
          </div>
          <p className={s.body}>
            <time dateTime={eventConfig.isoDate}>
              {eventConfig.date}
              <br />
              08:00 IST
            </time>
          </p>
        </div>
        {seconds === 0 ? (
          <p className={s.body} style={{ marginTop: 32 }}>
            The scheduled start time has passed. Check with the organizers for
            event updates.
          </p>
        ) : (
          <div
            role="timer"
            aria-live="off"
            aria-label="Time until the scheduled event start"
            className={s.clockDigits}
          >
            {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => (
              <div key={label}>
                <strong>
                  {values[i] === null
                    ? "—"
                    : String(values[i]).padStart(2, "0")}
                </strong>
                <span>{label.toUpperCase()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
