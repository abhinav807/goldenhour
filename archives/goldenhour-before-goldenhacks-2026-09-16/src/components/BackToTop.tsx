"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting && window.scrollY > hero.offsetHeight * 0.6);
    }, { threshold: 0.1 });

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return <a href="#hero" className="brutal-btn fixed right-4 bottom-20 md:right-6 md:bottom-6 z-50 px-3 py-2 text-[10px] shadow-[3px_3px_0_#ff5a00]" aria-label="Return to the top of the page"><ArrowUp size={13} /> TO TOP</a>;
}
