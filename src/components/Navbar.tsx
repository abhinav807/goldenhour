"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "ABOUT", href: "#about" },
    { label: "EVENTS", href: "#events" },
    { label: "RULES", href: "#rules" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
          scrolled
            ? "bg-black/95 backdrop-blur-md border-b-2 border-sunset"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
          <a href="#" className="font-archivo text-xl md:text-2xl text-offwhite tracking-tighter hover:text-sunset transition-colors">
            GOLDENHOUR
          </a>

          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-space text-[11px] text-offwhite/70 hover:text-sunset transition-colors uppercase"
              >
                {l.label}
              </a>
            ))}
            <a href="#register" className="brutal-btn-orange px-5 py-2 text-[11px]">
              REGISTER
            </a>
          </div>

          <button
            className="md:hidden text-offwhite p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/98 flex flex-col items-center justify-center gap-8 p-8 md:hidden">
          <button
            className="absolute top-5 right-5 text-offwhite hover:text-sunset"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-archivo text-3xl text-offwhite hover:text-sunset transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#register"
            className="brutal-btn-orange px-10 py-4 text-sm"
            onClick={() => setMenuOpen(false)}
          >
            REGISTER
          </a>
        </div>
      )}
    </>
  );
}
