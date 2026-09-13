"use client";

export default function Footer() {
  return (
    <footer className="bg-black text-offwhite px-5 md:px-12 py-12 md:py-16 border-t-2 border-sunset">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <h3 className="font-archivo text-3xl md:text-4xl text-offwhite mb-4">
              GOLDENHOUR
            </h3>
            <p className="font-space text-xs text-offwhite/50 max-w-sm leading-relaxed mb-4">
              A student-built experience. For students. By students.
            </p>
            <p className="font-space text-[10px] text-sunset font-bold uppercase">
              DELHI / INDIA / 2026
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <p className="font-space text-[10px] font-bold text-sunset uppercase mb-4">
              EXPLORE
            </p>
            <ul className="font-space text-xs space-y-2.5 text-offwhite/50">
              <li><a href="#about" className="hover:text-offwhite transition-colors">About</a></li>
              <li><a href="#events" className="hover:text-offwhite transition-colors">Events</a></li>
              <li><a href="#rules" className="hover:text-offwhite transition-colors">Rules</a></li>
              <li><a href="#faq" className="hover:text-offwhite transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-space text-[10px] font-bold text-sunset uppercase mb-4">
              CONNECT
            </p>
            <ul className="font-space text-xs space-y-2.5 text-offwhite/50">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-sunset transition-colors">Instagram</a></li>
              <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-sunset transition-colors">Discord</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-sunset transition-colors">LinkedIn</a></li>
              <li><a href="mailto:hello@goldenhour.dev" className="hover:text-sunset transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-space text-[10px] font-bold text-sunset uppercase mb-4">
              EVENT
            </p>
            <ul className="font-space text-xs space-y-2.5 text-offwhite/50">
              <li><a href="#register" className="hover:text-offwhite transition-colors">Register</a></li>
              <li><span className="text-offwhite/30">Nov 2026</span></li>
              <li><span className="text-offwhite/30">Delhi, India</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-offwhite/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-space text-[10px] text-offwhite/30">
            MADE BY STUDENTS. FOR STUDENTS.
          </p>
          <a href="#hero" className="font-space text-[10px] text-offwhite/30 hover:text-offwhite transition-colors">
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
