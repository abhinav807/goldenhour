"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function MobileMenu({ links }: { links: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const resize = () => { if (media.matches) setOpen(false); };
    media.addEventListener("change", resize);
    return () => media.removeEventListener("change", resize);
  }, []);
  return <Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Trigger className="lg:hidden p-3" aria-label="Open navigation menu"><Menu size={24} /></Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="gh-menu-overlay" />
      <Dialog.Content className="gh-menu-sheet" aria-describedby={undefined}>
        <Dialog.Title className="font-archivo text-2xl text-sunset">GOLDEN.HOUR</Dialog.Title>
        <Dialog.Close className="absolute top-5 right-4 p-3" aria-label="Close navigation menu"><X size={24} /></Dialog.Close>
        <p className="font-space text-xs mt-4 text-offwhite/60">BUILD. IMPROVE. REPEAT.</p>
        <nav aria-label="Mobile navigation" className="flex flex-col mt-10">
          {links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="font-archivo text-xl py-5 border-b border-white/20 flex items-center justify-between gap-3 hover:text-sunset">{link.label}<ArrowUpRight size={20} aria-hidden="true" /></a>)}
        </nav>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
