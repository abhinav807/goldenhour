"use client";

import { usePathname } from "next/navigation";
import CursorFollower from "@/components/CursorFollower";
import Navbar from "@/components/Navbar";

export default function SiteChrome() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <><CursorFollower /><Navbar /></>;
}
