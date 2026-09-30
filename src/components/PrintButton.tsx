"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return <button type="button" onClick={() => window.print()} className="brutal-btn-orange px-4 py-3 text-[10px]"><Printer size={15} aria-hidden="true" /> PRINT SLIP</button>;
}
